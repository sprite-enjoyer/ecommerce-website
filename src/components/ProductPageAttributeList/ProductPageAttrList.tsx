import React from "react";
import styles from "./ProductPageAttrList.module.scss";
import ProductPageStore from "../../stores/ProductPageStore";
import { v4 } from "uuid";
import { AttributeSet, Attribute } from "../../global/types";
import SwatchButton from "../AttributeButtons/SwatchButton";
import TextButton from "../AttributeButtons/TextButton";

class ProductPageAttrList extends React.Component{
    ppStore = ProductPageStore;
    render(): React.ReactNode {
        return (
            <div className={styles["main"]} >
                {this.ppStore.currentProduct !== undefined &&
                this.ppStore.currentProduct.attributes.map(
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
                                    forCartStore={false}
                                    attrSetID ={attrSet.id}
                                    productID = {(-1).toString()}
                                    key={v4()}
                                    attribute={attr}
                                    minHeight="3vw"
                                    minWidth="3.5vw"
                                    />)
                            :
                            attrSet.items.map(
                                (attr: Attribute) =>
                                    <SwatchButton 
                                        forCartStore={false}
                                        attrSetID ={attrSet.id}
                                        productID = {(-1).toString()}
                                        key={v4()}
                                        attribute={attr}
                                        minHeight="2vw"
                                        minWidth="2vw"
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

export default ProductPageAttrList;