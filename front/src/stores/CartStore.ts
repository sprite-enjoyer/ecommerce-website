import { gql } from "@apollo/client";
import { action, computed, makeObservable, observable } from "mobx";
import { apolloClient } from "..";
import { Attribute, Price, cartStoreProduct, AttributeSet } from "../global/types";
import HeaderStore from "./HeaderStore";
import { cloneDeep } from "@apollo/client/utilities";
class CartStoreImpl {

  products: Array<cartStoreProduct> = [];
  count: number = 0;
  attrID: number = 0;
  
  constructor() {
    makeObservable(this, {
      products: observable,
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
        let product = response.data.product;
        product = cloneDeep(product);
        const temp = [...this.products];

        for(let attributeSet of product.attributes){
          if (chosenAttrs === undefined){
            attributeSet = {
              ...attributeSet,
              cartStoreID: this.attrID
            };
          }
          for (let i = 0; i < attributeSet.items.length; i++){
            if (chosenAttrs === undefined){
              if (i === 0) attributeSet.items[i] = {
                ...attributeSet.items[i],
                active: true
              }
              if (i !== 0) attributeSet.items[i] = {
                ...attributeSet.items[i],
                active: false
              }
            }
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

  setActiveAttributeWithId(productId: number, attrSetId: string, attr: Attribute){

    this.products.filter(product => product.cartStoreID === productId)[0]
    .attributes.filter((attributeSet: AttributeSet) => attributeSet.id === attrSetId)[0]
    .items.forEach((item: Attribute) => {
     if (item.active === true) item.active = false;
     if (item === attr) item.active = true;
    } );
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
      return this.products
      .map((product) => product.quantity)
      .reduce((prev, curr) => prev + curr, 0);
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
    return (Number(this.totalPrice) * 21 / 100).toFixed(2);
  }

}

const CartStore = new CartStoreImpl();
export default CartStore;