import { Component, ReactNode } from "react";
import { AttributeSet, Price } from "../../global/types";
import styles from "./OverlayCard.module.scss";
import HeaderStore from "../../stores/HeaderStore";
import { Attribute } from "../../global/types";
import { v4 } from "uuid";

export type OverlayCardProps = {
  id: string;
  name: string;
  brand: string;
  prices: Array<Price>;
  picture: string;
  attributes: Array<AttributeSet>
}

export default class OverlayCard extends Component<OverlayCardProps> {
  headerStore = HeaderStore;
  state = {
    count: 0
  };
  render(): ReactNode {
    return (
      <div className={styles["main"]} >
        <div className={styles["main__left"]} >
          <div className={styles["main__left__txt"]} >
            <span>
              {this.props.brand}
              <br />
              {this.props.name}
              <br />
            </span>
            <span className={styles["main__left__txt__price"]} >
              {this.headerStore.currency.symbol +
                " " +
                this.props.prices.filter(
                  price => price.currency.symbol === this.headerStore.currency.symbol)[0].amount}
            </span>
          </div>
          <div className={styles["main__left__attributes"]} >
            {
              this.props.attributes.map((attribute: AttributeSet) =>
                attribute.type === "text" ?
                  <div
                    key={v4()}
                    className={styles["main__left__attributes__txtAttribute"]} >
                    {attribute.items.map((item: Attribute) =>
                      <div
                        key={v4()}
                        className={styles["main__left__attributes__txtAttribute__attrCell"]} >
                        {item.value}
                      </div>
                    )
                    }
                  </div>
                  :
                  <div>
                    {
                      attribute.items.map((item: Attribute) =>
                        <div
                          key={v4()}
                          className={styles["main__left__attributes__swatchAttribute__attrCell"]}
                          style={{ backgroundColor: `${item.value}` }}>
                          habado
                        </div>
                      )
                    }
                  </div>
              )
            }
          </div>

        </div>
        <div className={styles["main__right"]} >
          <div className={styles["main__right__counter"]} >
            <button
              onClick={() => this.setState({ count: this.state.count + 1 })}
              className={styles["main__right__counter__btn"]}
            >
              +
            </button>
            <span className={styles["main__right__counter__num"]}>
              {this.state.count}
            </span>
            <button
              onClick={() => this.state.count !== 0 ? this.setState({ count: this.state.count - 1 }) : null}
              className={styles["main__right__counter__btn"]}
            >
              -
            </button>
          </div>
          <div className={styles["main__right__imgContainer"]} >
            <img
              className={styles["main__right__imgContainer__pic"]}
              src={this.props.picture}
              alt="product picture" />
          </div>
        </div>
      </div >
    );
  }
}