import { observer } from "mobx-react";
import { Component } from "react";
import { v4 } from "uuid";
import { AttributeSet, Attribute, cartStoreProduct } from "../../global/types";
import SwatchButton from "../AttributeButtons/SwatchButton";
import TextButton from "../AttributeButtons/TextButton";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./CartPageAttrList.module.scss";

export type CartPageAttrListProps = {
    product: cartStoreProduct;
}

class CartPageAttrList extends Component<CartPageAttrListProps>{
    render(): React.ReactNode {
        return (
            <div className={styles["main"]} >
                { this.props.product.attributes.map(
                    (attrSet: AttributeSet) => 
                <div 
                    key={v4()}
                    className={styles["main__attrSetBox"]} >
                        <span className={styles["main__attrSetbox__attrID"]} >
                            {attrSet.id}:
                        </span>
                        <div className={styles["main__attrSetBox__attrSet"]} >
                            {
                            attrSet.type === "text" 
                            ? 
                            attrSet.items.map(
                                (attr: Attribute) =>
                                <TextButton 
                                    forCartStore={true}
                                    attrSetID ={attrSet.id}
                                    productID = {this.props.product.id}
                                    key={v4()}
                                    attribute={attr}
                                    minHeight="2.5vw"
                                    minWidth="3vw"
                                    />)
                            :
                            attrSet.items.map(
                                (attr: Attribute) =>
                                    <SwatchButton 
                                        forCartStore={true}
                                        attrSetID ={attrSet.id}
                                        productID = {this.props.product.id}
                                        key={v4()}
                                        attribute={attr}
                                        minHeight="1.5vw"
                                        minWidth="1.5vw"
                                        />)
                            }
                        </div>
                    </div>
                    )
                }
            </div>
        );
    }
} 

export default observer(CartPageAttrList);