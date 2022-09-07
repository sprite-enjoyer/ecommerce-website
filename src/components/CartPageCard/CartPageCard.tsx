import { observer } from "mobx-react";
import { Component, ReactNode } from "react";
import { Price, AttributeSet } from "../../global/types";
import CartStore from "../../stores/CartStore";
import HeaderStore from "../../stores/HeaderStore";
import CartPageAttrList from "../CartPageAttrList/CartPageAttrList";
import styles from "./CartPageCard.module.scss";
import leftArrow from "../../assets/arrowLeft.svg";
import rightArrow from "../../assets/arrowRight.svg";


export type CartPageCardProps = {
    id: string;
    name: string;
    brand: string;
    prices: Array<Price>;
    gallery: Array<string>;
    attributeArray: Array<AttributeSet>
    quantitiy: number;
    cartStoreID: number;
}

class CartPageCard extends Component<CartPageCardProps>{
    cartStore = CartStore;
    headerStore = HeaderStore;

    state={
        currentImgIndex: 0
    };

    render(): ReactNode {
        return (
            <div className={styles["main"]} >
                <div className={styles["main__left"]} > 
                <div className={styles["main__left__nameBrandWrapper"]} >
                    <span className={styles["main__left__nameBrandWrapper__brand"]} >
                        {this.props.brand}
                    </span>
                    <span className={styles["main__left__nameBrandWrapper__name"]} >
                        {this.props.name}
                    </span>
                </div>
                <span className={"main__left__price"} >
                    {this.props.prices.filter(
                        (price: Price) => price.currency.symbol === this.headerStore.currency.symbol
                        )[0].currency.symbol
                    }
                    {this.props.prices.filter(
                        (price: Price) => price.currency.symbol === this.headerStore.currency.symbol
                        )[0].amount
                    }
                </span>
                <CartPageAttrList
                    product={{
                        id: this.props.id,
                        name: this.props.name,
                        gallery: this.props.gallery,
                        brand: this.props.brand,
                        attributes: this.props.attributeArray,
                        quantity: this.props.quantitiy,
                        prices: this.props.prices,
                        cartStoreID: this.props.cartStoreID
                    }}
                    />
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
                                src={this.props.gallery[this.state.currentImgIndex]}
                                alt="product" />
                                {this.props.gallery.length !== 1 &&
                                <div className={styles["main__right__imgContainer__arrowWrapper"]} > 
                                    <img 
                                    onClick={() => {
                                        this.state.currentImgIndex !== 0 &&
                                        this.setState({currentImgIndex: this.state.currentImgIndex - 1});
                                    }}
                                    className={styles["main__right__imgContainer__arrowWrapper__arrow__left"]}
                                    src={require("../../assets/arrowLeft.svg").default} 
                                    alt="left arrow" />
                                    <img 
                                    onClick={() => {
                                        this.props.gallery[this.state.currentImgIndex + 1] !== undefined &&
                                        this.setState({currentImgIndex: this.state.currentImgIndex + 1});
                                    }}
                                    className={styles["main__right__imgContainer__arrowWrapper__arrow__right"]}
                                    src={require("../../assets/arrowRight.svg").default} 
                                    alt="right arrow" />
                                </div>
                                }
                            
                    </div>
                </div>
            </div>
        );
    }
}

export default observer(CartPageCard);