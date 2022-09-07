import { Component, ReactNode } from "react";
import { AttributeSet, Attribute} from "../../global/types";
import styles from "./AttributeSetList.module.scss";
import { v4 } from "uuid";
import CartStore from "../../stores/CartStore";
import TextButton from "../AttributeButtons/TextButton";
import SwatchButton from "../AttributeButtons/SwatchButton";

export type AttributeListProps = {
    attributeArray: Array<AttributeSet>;
    itemID: string;
    productID: string;
};

export default class AttributeSetList extends Component<AttributeListProps>{
    cartStore = CartStore;
    render(): ReactNode {    
        return (
            <div className={styles["main"]} >
                {
                this.props.attributeArray.map(
                    (attrSet: AttributeSet) => 
                    <div 
                    key={v4()}
                    className={styles["main__attrSetBox"]} >
                        <span className={styles["main__attrSetbox__attrID"]} >
                            {attrSet.id}
                        </span>
                        <div className={styles["main__attrSetBox__attrSet"]} >
                            {
                            attrSet.type === "text" 
                            ? 
                            attrSet.items.map(
                                (attr: Attribute) =>
                                <TextButton 
                                    forCartStore={true}
                                    attrSetID ={attrSet.cartStoreID}
                                    productID = {this.props.productID}
                                    key={v4()}
                                    attribute={attr}
                                    />)
                            :
                            attrSet.items.map(
                                (attr: Attribute) =>
                                    <SwatchButton 
                                        forCartStore={true}
                                        attrSetID ={attrSet.cartStoreID}
                                        productID = {this.props.productID}
                                        key={v4()}
                                        attribute={attr}
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
