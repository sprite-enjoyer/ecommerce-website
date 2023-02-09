import { Component, ReactNode } from "react";
import { AttributeSet, Price } from "../../global/types";
import styles from "./OverlayCard.module.scss";
import HeaderStore from "../../stores/HeaderStore";
import AttributeSetList from "../AttributeList/AttributeSetList";
import CartStore from "../../stores/CartStore";

export type OverlayCardProps = {
  id: string;
  name: string;
  brand: string;
  prices: Array<Price>;
  picture: string;
  attributeArray: Array<AttributeSet>
  quantitiy: number;
  cartStoreID: number;
}

class OverlayCard extends Component<OverlayCardProps> {
  headerStore = HeaderStore;
  cartStore = CartStore;
  render(): ReactNode {
    return (
      <div className={styles["main"]} >
        <div className={styles["main__left"]} >
          <div className={styles["main__left__txt"]} >
            <span className={styles["main__left__txt__brand"]} >
              {this.props.brand}
            </span>
            <span className={styles["main__left__text__name"]} >
              {this.props.name}
            </span>
            <span className={styles["main__left__txt__price"]} >
              {this.headerStore.currency.symbol +
                this.props.prices.filter(
                  price => price.currency.symbol === this.headerStore.currency.symbol)[0].amount}
            </span>
          </div>
          <div className={styles["main__left__attributes"]} >
            <AttributeSetList 
            cartStoreID={this.props.cartStoreID}
            productID = {this.props.id}
            attributeArray={this.props.attributeArray}/>
          </div>

        </div>
        <div className={styles["main__right"]} >
          <div className={styles["main__right__counter"]} >
            <button
              onClick={() => this.cartStore.incrementQuantity(this.props.cartStoreID)}
              className={styles["main__right__counter__btn"]}
            >
              +
            </button>
            <span className={styles["main__right__counter__num"]}>
              {
              this.props.quantitiy
              }
            </span>
            <button
              onClick={() => {
                this.cartStore.decrementQuantity(this.props.cartStoreID)
                this.props.quantitiy !== 0
                && 
                this.cartStore.removeZeroQuantityProducts() 
              }
              }
              className={styles["main__right__counter__btn"]}
            >
              -
            </button>
          </div>
          <div className={styles["main__right__imgContainer"]} >
            <img
              className={styles["main__right__imgContainer__pic"]}
              src={this.props.picture}
              alt="product" />
          </div>
        </div>
      </div >
    );
  }
}

export default OverlayCard;