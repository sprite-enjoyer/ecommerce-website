import { Component, ReactNode } from "react";
import styles from "./ProductPage.module.scss";
import { observer } from "mobx-react";
import { v4 } from "uuid";
import ProductPageStore from "../../stores/ProductPageStore";
import CartStore from "../../stores/CartStore";
import { Navigate } from "react-router-dom";
import ProductPageAttrList from "../../components/ProductPageAttributeList/ProductPageAttrList";
import { Interweave } from 'interweave';
import HeaderStore from "../../stores/HeaderStore";
import { Price } from "../../global/types";

class ProductPage extends Component{
    ppStore = ProductPageStore;
    cartStore = CartStore;
    headerStore = HeaderStore;

    componentDidMount(): void {
    const productID = window.location.href.split("/")[4];
    this.ppStore.fetchProduct(productID);
    }

    render(): ReactNode {
        return (
        <>
        {this.ppStore.redirectToHome && <Navigate to={"/"} />}
            <div className={styles["main"]} >
                <div className={styles["main__left"]} > 
                    <div className={styles["main__left__smallImgWrapper"]} >
                        {this.ppStore.currentProduct?.gallery
                        .map((link: string) => 
                        <img
                            onClick={() => this.ppStore.setCurrentPhoto(link)}
                            className={styles["main__left__smallImgWrapper__image"]}
                            key={v4()} 
                            src={link} 
                            alt="small product" 
                        />)
                    }
                    </div>
                    <div className={styles["main__left__bigImgWrapper"]} >
                        <img
                            className={styles["main__left__bigImgWrapper__image"]} 
                            src={this.ppStore.currentPhoto} 
                            alt="product" />
                    </div>
                </div>
                <div className={styles["main__right"]} >
                    <div className={styles["main__right__productNameBrandWrapper"]} >
                        <span className={styles["main__right__productNameBrandWrapper__brand"]} >
                            {this.ppStore.currentProduct?.brand}
                        </span>
                        <span className={styles["main__right__productNameBrandWrapper__name"]} >
                            {this.ppStore.currentProduct?.name}
                        </span>
                    </div>
                    <ProductPageAttrList />
                    <div className={styles["main__right__price"]}>
                        <span className={styles["main__right__price__txt"]}>
                            PRICE:
                        </span>
                        <br />
                        <span className={styles["main__right__price__value"]} >
                        {
                            this.ppStore.currentProduct?.prices.filter(
                                (price: Price) => 
                                price.currency.symbol === this.headerStore.currency.symbol
                                )[0].amount
                                 +
                            this.headerStore.currency.symbol
                        }
                        </span>
                    </div>
                    <button
                        className={styles["main__right__btn"]}
                        onClick={() => {
                            if (this.ppStore.currentProduct === undefined) return;
                            if(!this.ppStore.currentProduct.inStock) return;
                            if(!this.ppStore.everyAttributeIsSelected()) return;
                            this.cartStore.addProduct(
                                this.ppStore.currentProduct.id, 
                                this.ppStore.currentProduct?.attributes);
                            this.ppStore.fetchProduct(window.location.href.split("/")[4]);
                            }}
                    >
                        ADD TO CART
                    </button>
                    <span className={styles["main__right__desc"]} >
                        <Interweave content={this.ppStore.currentProduct?.description}/>
                    </span>
                </div>
            </div>
        </>
        );
    }
}

export default observer(ProductPage);