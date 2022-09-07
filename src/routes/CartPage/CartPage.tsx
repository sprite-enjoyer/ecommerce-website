import { observer } from "mobx-react";
import { Component, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { v4 } from "uuid";
import CartPageCard from "../../components/CartPageCard/CartPageCard";
import { cartStoreProduct } from "../../global/types";
import CartStore from "../../stores/CartStore";
import HeaderStore from "../../stores/HeaderStore";
import ProductPageStore from "../../stores/ProductPageStore";
import styles from "./CartPage.module.scss";

class CartPage extends Component{
    cartStore = CartStore;
    headerStore = HeaderStore;
    ppStore = ProductPageStore;

    render(): ReactNode {
        return (
            this.ppStore.redirectToHome
            ? 
            <Navigate to={"/"}/>
            :
            <div className={styles["main"]} >
                <h1 className={styles["main__cartText"]} >
                    CART
                </h1>
                <div className={styles["main__cardList"]} >
                {
                    this.cartStore.products.map(
                        (product: cartStoreProduct) => 
                        <CartPageCard
                        key={v4()}
                        id={product.id}
                        name={product.name}
                        brand={product.brand}
                        prices={product.prices}
                        gallery={product.gallery}
                        attributeArray={product.attributes}
                        quantitiy={product.quantity}
                        cartStoreID={product.cartStoreID}
                        />

                    )
                }
                </div>
                <div className={styles["main__bottomText"]} >
                    <span className={styles["main__bottomText__tax"]} >
                        Tax 21%:
                        {" " + this.headerStore.currency.symbol + this.cartStore.totalPriceWithTax}
                    </span>
                    <span className={styles["main__bottomText__quantity"]} >
                        Quantity: 
                        {" " + this.cartStore.ProductCount}
                    </span>
                    <span className={styles["main__bottomText__total"]} >
                        Total:
                        {" " + this.headerStore.currency.symbol + this.cartStore.totalPrice.toString()}
                    </span>
                    <button className={styles["main__bottomText__btn"]}>
                        ORDER
                    </button >
                </div>
            </div>
            
        )
    }
}


export default observer(CartPage);