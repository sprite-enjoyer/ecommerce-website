import { Component, ReactNode } from "react";
import { Price } from "../../global/types";
import styles from "./ProductCard.module.scss";
import HeaderStore from "../../stores/HeaderStore";
import CartStore from "../../stores/CartStore";
import { Navigate } from "react-router-dom";

export type ProductCardProps = {
  name: string;
  id: string;
  inStock: boolean;
  prices: Array<Price>;
  picture: string;
  brand: string;
};

class ProductCard extends Component<ProductCardProps>{
  cartStore = CartStore;
  headerStore = HeaderStore;
  state = {
    showButton: false,
    redirect: false,
  };

  onMouseOver = () => this.setState({ showButton: true });
  onMouseOut = () => this.setState({ showButton: false });

  render(): ReactNode {
    return (
      this.state.redirect ? <Navigate to={"products/" + this.props.id}/>
      :
      <div
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        className={styles["main"]} >
        <div className={styles["main__imageContainer"]}>
          <img
            onClick={() => this.setState({redirect: true})}
            style={!this.props.inStock ? { opacity: "0.5" } : {}}
            className={styles["main__imageContainer__image"]}
            src={this.props.picture}
            alt="product" />
          {
            (this.state.showButton && this.props.inStock) &&
            <button
              onClick={() => this.cartStore.addProduct(this.props.id)}
              className={styles["main__imageContainer__btn"]}>
              <img
                className={styles["main__imageContainer__btn__btnimage"]}
                src={require("../../assets/whiteCart.svg").default}
                alt="cart button" />
            </button>
          }
          {
            !this.props.inStock &&
            <div className={styles["main__imageContainer__outOfStock"]} >
              <span className={styles["main__imageContainer__outOfStock__txt"]} >
                OUT OF STOCK
              </span>
            </div>
          }
        </div>
        <div 
          onClick={() => this.setState({redirect: true})}
          className={styles["main__nameContainer"]} >
          <span className={styles["main__infoContainer__name"]}>
            {this.props.brand} {this.props.name}
          </span>
        </div>
        <div 
          onClick={() => this.setState({redirect: true})}
          className={styles["main__priceContainer"]}>
          <span className={styles["main__priceContainer__price"]}>
            {
              this.headerStore.currency.symbol +
                this.props.prices.filter
                (((price: Price) => price.currency.symbol === this.headerStore.currency.symbol))
                [0].amount
            }
          </span>
        </div>
      </div>
    );
  }
}


export default ProductCard;