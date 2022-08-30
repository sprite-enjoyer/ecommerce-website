import { Component, ReactNode } from "react";
import styles from "./CartOverlay.module.scss";
import HeaderStore from "../../stores/HeaderStore";
import CartStore from "../../stores/CartStore";
import { observer } from "mobx-react";
import CartList from "../CartList/CartList";

class CartOverlay extends Component {
  headerStore = HeaderStore;
  cartStore = CartStore;
  render(): ReactNode {
    return (
      <div className={styles["main"]} >
        <button
          onClick={() => this.headerStore.setCartShown(!this.headerStore.cartShown)}
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
            <span className={styles["conditional__countText"]} >
              <b>My Bag</b>, {CartStore.ProductCount} items
            </span>
            <CartList />
          </div>
        }
      </div>
    );
  }
}

export default observer(CartOverlay);