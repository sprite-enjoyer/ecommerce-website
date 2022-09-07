import { gql } from "@apollo/client";
import { action, computed, makeObservable, observable } from "mobx";
import { apolloClient } from "..";
import { Attribute, Price, cartStoreProduct, AttributeSet } from "../global/types";
import HeaderStore from "./HeaderStore";

class CartStoreImpl {

  products: Array<cartStoreProduct> = [];
  count: number = 0;

  constructor() {
    makeObservable(this, {
      products: observable,
      count: observable,
      ProductCount: computed,
      totalPrice: computed,
      totalPriceWithTax: computed,
      setProducts: action,
      addProduct: action,
      incrementCount: action,
      removeProduct: action,
      removeZeroQuantityProducts:action,
      incrementQuantity:action,
      decrementQuantity: action,
      getProductById: action,
      setActiveAttributeWithId: action,
    });

  }

  setProducts(products: Array<cartStoreProduct>) {
    this.products = products;
  }

  getProductById(id: string){
    return this.products.filter(
      (product: cartStoreProduct) => product.id === id)[0];
  }

  productExists(productId: string){
    const exists = this.products.filter((product: cartStoreProduct) =>  product.id === productId)[0];
    return exists? true: false;
  }

  incrementCount(){
    this.count++
  }

  addProduct(id: string, chosenAttrs?: Array<AttributeSet>) {
    if (this.productExists(id)) {
       this.products.filter((product: cartStoreProduct) => product.id === id)[0].quantity++;
       return;
    }
    const quote = "\"";
    apolloClient.query({
      query: gql`
      {
        product(id: ${quote + id + quote}){
          name
          brand
          prices{
            amount
            currency{
              symbol
              label
            }
          }
          gallery
          attributes{
            id
            type
            name
            items{
              displayValue
              value
              id
            }
          }
        }
      }
      `
    })
      .then(response => {
        const product = response.data.product;
        const temp = [...this.products];
        
        for(let attributeSet of product.attributes){
          for(let item of attributeSet.items){
           item= {
            ...item,
            active: false
           };
          }
        }        
        const newProduct: cartStoreProduct = {
          name: product.name,
          id: id,
          prices: product.prices,
          gallery: product.gallery,
          attributes: chosenAttrs === undefined ? product.attributes : chosenAttrs,
          brand: product.brand,
          quantity: 1,
          cartStoreID: this.count
        };
        temp.push(newProduct);
        this.setProducts(temp);
        this.incrementCount();
      })
      .catch(error => console.error(error));
  }

  removeProduct(cartStoreID: number) {
    this.setProducts(this.products.filter(product => product.cartStoreID !== cartStoreID));
  }

  setActiveAttributeWithId(productId: string, attrSetId: string, attr: Attribute){
    this.products.filter(product => product.id === productId)[0]
    .attributes.filter((attributeSet: AttributeSet) => attributeSet.id === attrSetId)[0]
    .items.forEach(item => item.active = false);

    this.products.filter(product => product.id === productId)[0]
    .attributes.filter((attributeSet: AttributeSet) => attributeSet.id === attrSetId)[0]
    .items.filter((item: Attribute) => item === attr)[0]
    .active = true;
  }

  removeZeroQuantityProducts(){
    this.setProducts(this.products.filter(product => product.quantity !== 0 ));
  }

  incrementQuantity(cartStoreID: number){
    this.products.filter((product: cartStoreProduct) => product.cartStoreID === cartStoreID)[0].quantity++;
  }

  decrementQuantity(cartStoreID: number){
    this.products.filter((product: cartStoreProduct) => product.cartStoreID === cartStoreID)[0].quantity--;

  }

  get ProductCount() {
      const temp = this.products.map((product) => product.quantity);
      const res = temp.reduce((prev, curr) => prev + curr, 0);
      return res;
  }

  get totalPrice(){
    let result : number = 0;
    for(let i = 0; i < this.products.length; i++){
      let product = this.products[i];
        let prices = product.prices;
        let currentPrice = prices.filter(
          (price: Price) => price.currency.symbol === HeaderStore.currency.symbol)[0];
        result += currentPrice.amount * product.quantity;
    }
    return parseFloat(result.toString()).toFixed( 2 );;
  }

  get totalPriceWithTax(){
    let result : number = 0;
    for(let i = 0; i < this.products.length; i++){
      let product = this.products[i];
        let prices = product.prices;
        let currentPrice = prices.filter(
          (price: Price) => price.currency.symbol === HeaderStore.currency.symbol)[0];
        result += currentPrice.amount * product.quantity;
    }
    result = result * 21 / 100;
    return result;
  }


}

const CartStore = new CartStoreImpl();
export default CartStore;