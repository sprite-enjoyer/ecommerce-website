import { Component, ReactNode } from "react";
import styles from "./CartList.module.scss";
import CartStore from "../../stores/CartStore";
import OverlayCard from "../OverlayCard/OverlayCard";
import { v4 } from "uuid";

export default class CartList extends Component {
  cartStore = CartStore;
  render(): ReactNode {
    return (
      <div className={styles["main"]} >
        {
          this.cartStore.products.map(product =>
            <OverlayCard
              key={v4()}
              prices={product.prices}
              attributes={product.attributes}
              name={product.name}
              id={product.id}
              picture={product.gallery[0]}
              brand={product.brand}
            />

          )
        }
      </div>
    );
  }
}