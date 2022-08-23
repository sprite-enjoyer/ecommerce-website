import { gql } from "@apollo/client";
import { action, makeObservable, observable } from "mobx";
import { apolloClient } from "..";
import { Category, Currency } from "../global/types";

class HeaderStoreImpl {
  category: Category = Category.all;
  currency: string = "$";
  cartShown: boolean = false;
  currencySwitcherShown: boolean = false;
  currencies: Array<Currency> = [];

  constructor() {
    makeObservable(this, {
      category: observable,
      currency: observable,
      cartShown: observable,
      currencySwitcherShown: observable,
      currencies: observable,
      setCategory: action,
      setCurrencyCollapsed: action,
      setSelectedCurrency: action,
      seCartCollapsed: action,
      fetchCurrencies: action
    });
  }

  setCategory(category: Category) {
    this.category = category;
  }
  setSelectedCurrency(currency: string) {
    this.currency = currency;
  }
  seCartCollapsed(shown: boolean) {
    this.cartShown = shown;
  }
  setCurrencyCollapsed(shown: boolean) {
    this.currencySwitcherShown = shown;
  }
  setCurrencies(currencies: Array<Currency>) {
    this.currencies = currencies;
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

};
const HeaderStore = new HeaderStoreImpl();
export default HeaderStore; 