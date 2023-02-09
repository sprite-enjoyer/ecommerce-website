import { gql } from "@apollo/client";
import { action, makeObservable, observable } from "mobx";
import { apolloClient } from "..";
import { Category, Currency } from "../global/types";

class HeaderStoreImpl {
  category: string = "all";
  currency: Currency = {
    label: "USD",
    symbol: "$"
  };
  cartShown: boolean = false;
  currencySwitcherShown: boolean = false;
  currencies: Array<Currency> = [];
  filteredProducts: Array<any> = [];

  constructor() {
    makeObservable(this, {
      category: observable,
      currency: observable,
      cartShown: observable,
      currencySwitcherShown: observable,
      currencies: observable,
      filteredProducts: observable,
      setCategory: action,
      setCurrencies: action,
      setCurrencyCollapsed: action,
      setCartShown: action,
      setProducts: action,
      setCurrency: action,
      fetchCurrencies: action,
      fetchProducts: action
    });
  }

  setCategory(category: string) {
    this.category = category;
    this.fetchProducts();
  }
  
  setCartShown(shown: boolean) {
    this.cartShown = shown;
  }

  setCurrencyCollapsed(shown: boolean) {
    this.currencySwitcherShown = shown;
  }

  setCurrencies(currencies: Array<Currency>) {
    this.currencies = currencies;
  }

  setProducts(filteredProducts: Array<any>) {
    this.filteredProducts = filteredProducts;
  }

  setCurrency(currency: Currency) {
    this.currency = currency;
    this.fetchProducts();
  }

  fetchCurrencies() {
    apolloClient.query({
      query: gql`
        {
          currencies{
            label
            symbol
          }
        }
        `
    })
      .then(response => this.setCurrencies(response.data.currencies))
      .catch(error => console.error(error));
  }

  fetchProducts() {
    const quote = "\"";
    const category = this.category.toString();
    apolloClient.query({
      query: gql`
        {category(input: {title: ${quote + category + quote}}){
            products{
              name
              id
              brand
              inStock
              gallery
              prices{
                amount
                currency{
                  symbol
                  label
                }
              }
            }
          }
        }
        `
    })
      .then(response => this.setProducts(response.data.category.products))
      .catch(error => console.error(error));
  }

};

const HeaderStore = new HeaderStoreImpl();
export default HeaderStore; 