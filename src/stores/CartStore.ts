import { gql } from "@apollo/client";
import { action, computed, makeObservable, observable } from "mobx";
import { apolloClient } from "..";
import { CartProduct } from "../global/types";

class CartStoreImpl {
  products: Array<CartProduct> = [];

  constructor() {
    makeObservable(this, {
      products: observable,
      ProductCount: computed,
      setProducts: action,
      addProduct: action,
      removeProduct: action
    })
  }

  setProducts(products: Array<CartProduct>) {
    this.products = products;
  }

  addProduct(id: string) {
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

        const newProduct: CartProduct = {
          name: product.name,
          id: id,
          prices: product.prices,
          gallery: product.gallery,
          attributes: product.attributes,
          brand: product.brand
        };
        temp.push(newProduct);
        this.setProducts(temp);
      })
      .catch(error => console.log(error));
  }

  removeProduct(id: string) {
    this.products = this.products.filter(product => product.id !== id);
  }

  get ProductCount() {
    return this.products.length;
  }

}

const CartStore = new CartStoreImpl();
export default CartStore;