import { PureComponent, ReactNode } from "react";
import styles from "./CartOverlay.module.scss";
import HeaderStore from "../../stores/HeaderStore";
import CartStore from "../../stores/CartStore";
import { observer } from "mobx-react";
import CartList from "../CartList/CartList";
import { Navigate } from "react-router-dom";


class CartOverlay extends PureComponent{
  headerStore = HeaderStore;
  cartStore = CartStore;
  state = {
    redirect: false
  };

  render(): ReactNode {
    return (
      this.state.redirect ? 
      <Navigate to="/CartPage" />
      :
      <div className={styles["main"]} >
        <button
          onClick={() => {
            this.headerStore.setCartShown(!this.headerStore.cartShown);
            this.headerStore.setCurrencyCollapsed(false);
          }}
          className={styles["main__cartBtn"]} >
          <div className={styles["main__cartBtn__itemNumber"]} >
            <span className={styles["main__cartBtn__itemNumber__number"]} >
              {this.cartStore.ProductCount}
            </span>
          </div>
          <img src={require("../../assets/blackCart.svg").default} alt="Cart" />
        </button>
        {
          this.headerStore.cartShown &&
          <div className={styles["conditional"]}>
            <div className={styles["conditional__stickyTop"]} >
              <span className={styles["conditional__stickyTop__countText"]} >
                <b>My Bag</b>, {CartStore.ProductCount} items
              </span>
            </div>
            <div className={styles["conditional__cartList"]} >
              <CartList />
            </div>
            <div className={styles["conditional__stickyBottom"]}>
              <div className={styles["conditional__stickyBottom__total"]} >
                <span className={styles["conditional__stickyBottom__total__txt"]} >
                  Total
                </span>
                <span className={styles["conditional__stickyBottom__total__amount"]} >
                  {this.cartStore.totalPrice} {this.headerStore.currency.symbol} 
                </span>
              </div>
              <div className={styles["conditional__stickyBottom__buttons"]} >
                <button 
                onClick={() => {
                  this.setState({redirect: true});
                  this.headerStore.setCartShown(false);
                  setTimeout(() => this.setState({redirect: false}), 0);
                }}
                className={styles["conditional__stickyBottom__buttons__viewBagBtn"]} >
                  View Bag
                </button>
                <button 
                className={styles["conditional__stickyBottom__buttons__checkOutBtn"]} >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default observer(CartOverlay);