import { Component, ReactNode } from "react"
import styles from "./CurrencySwitcher.module.scss";
import HeaderStore from "../../stores/HeaderStore";
import { observer } from "mobx-react";
import { v4 } from "uuid";

class CurrencySwitcher extends Component {

  headerStore = HeaderStore;
  state = {
    currencies: this.headerStore.currencies
  };

  componentDidMount() {
    this.headerStore.fetchCurrencies();
  }

  render(): ReactNode {
    return (
      <>
        <div className={styles["main"]} >
          <button
            onClick={() => {
              this.headerStore.setCurrencyCollapsed(!this.headerStore.currencySwitcherShown);
              this.headerStore.setCartShown(false);
            }}
            className={styles["main__currencyBtn"]} >
            {this.headerStore.currency.symbol}
            <img src={require("../../assets/arrowDown.svg").default} alt="arrowDown" />
          </button>
        </div>
        {this.headerStore.currencySwitcherShown &&
          <div className={styles["conditional"]} >
            {this.headerStore.currencies.map(currency =>
              <button
                onClick={() => {
                  this.headerStore.setCurrencyCollapsed(false);
                  this.headerStore.setCurrency({ label: currency.label, symbol: currency.symbol })
                }}
                className={styles["conditional__btn"]}
                key={v4()} >
                <span
                  className={styles["conditional__btn__txt"]}>
                  {currency.symbol}{currency.label}
                </span>
              </button>
            )}
          </div>
        }
      </>
    );
  }
}

export default observer(CurrencySwitcher);