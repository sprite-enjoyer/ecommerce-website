import { gql } from "@apollo/client";
import { action, makeObservable, observable } from "mobx";
import { apolloClient } from "..";
import { CartProduct } from "../global/types";

class CartStoreImpl {
  products: Array<CartProduct> = [];

  constructor() {
    makeObservable(this, {
      products: observable,
      addProduct: action,
      removeProduct: action
    })
  }

  addProduct(id: string) {
    apolloClient.query({
      query: gql`
      {
        product(id: ${id}){
          name
          prices{
            amount
            currency{
              symbol
              label
            }
          }
          gallery
          attributes{
            type
            name
          }
        }
      }
      `
    })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  }
  removeProduct(id: string) {
    this.products.filter(product => product.id !== id);
  }
}

const CartStore = new CartStoreImpl();
export default CartStore;