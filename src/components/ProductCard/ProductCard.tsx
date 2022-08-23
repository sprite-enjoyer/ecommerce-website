import { Component, ReactNode } from "react";
import { Price, Category, AttributeSet, AttributeType } from "../../global/types";
import styles from "./ProductCard.module.scss";

export type ProductCardProps = {
  price: Price;
  picture: string;
  inStock: boolean;
  name: string;
};

export type tempProps = {
  product: ProductCardProps;
};

export default class ProductCard extends Component<tempProps>{
  state = {
    showButton: false,
  };
  onMouseOver = () => this.setState({ showButton: true });
  onMouseOut = () => this.setState({ showButton: false });

  render(): ReactNode {
    return (
      <div
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        className={styles["main"]} >
        <div className={styles["main__imageContainer"]}>
          <img
            style={!this.props.product.inStock ? { opacity: "0.5" } : {}}
            className={styles["main__imageContainer__image"]}
            src={this.props.product.picture}
            alt="product image" />
          {
            (this.state.showButton && this.props.product.inStock) &&
            <button className={styles["main__imageContainer__btn"]}>
              <img
                className={styles["main__imageContainer__btn__btnimage"]}
                src={require("../../assets/whiteCart.svg").default}
                alt="cart button" />
            </button>
          }
          {
            !this.props.product.inStock &&
            <div className={styles["main__imageContainer__outOfStock"]} >
              <span className={styles["main__imageContainer__outOfStock__txt"]} >
                OUT OF STOCK
              </span>
            </div>
          }
        </div>
        <div className={styles["main__nameContainer"]} >
          <span className={styles["main__infoContainer__name"]}>
            {this.props.product.name}
          </span>
        </div>
        <div className={styles["main__priceContainer"]}>
          <span className={styles["main__priceContainer__price"]}>
            {this.props.product.price.currency.symbol + this.props.product.price.amount}
          </span>
        </div>
      </div>
    );
  }
}