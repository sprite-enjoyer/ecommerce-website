import { Component, ReactNode } from "react";
import { Attribute } from "../../global/types";
import styles from "./AttributeButtons.module.scss";
import CartStore from "../../stores/CartStore";
import { observer } from "mobx-react";
import ProductPageStore from "../../stores/ProductPageStore";


export type TextButtonProps = {
    attribute: Attribute;
    forCartStore: boolean;
    cartStoreID?: number;
    productID?: string;
    attrSetID: string;
    height?: string;
    width?: string;
    minHeight?: string;
    minWidth?:string;
    maxHeight?: string;
    maxWidth?:string;

};

export default class TextButton extends Component<TextButtonProps>{
    cartStore = CartStore;
    ppStore = ProductPageStore;
    
    constructor(props: TextButtonProps){
        super(props);
        this.forProductPageStore = this.forProductPageStore.bind(this);
        this.forCartStore = this.forCartStore.bind(this);
    }

    forCartStore(){
        (this.props.cartStoreID !== undefined) && 
            this.cartStore.setActiveAttributeWithId
                (this.props.cartStoreID, this.props.attrSetID,  this.props.attribute)
    }

    forProductPageStore(){
        this.ppStore.setActiveAttribute(this.props.attrSetID, this.props.attribute)
    }

    render(): ReactNode {
        return (
            <button 
            style={{
                height: this.props?.height,
                width: this.props?.width,
                minWidth: this.props?.minWidth,
                minHeight: this.props?.minHeight,
                maxWidth: this.props?.maxWidth,
                maxHeight: this.props?.maxHeight
            }}
            onClick={this.props.forCartStore ? this.forCartStore : this.forProductPageStore}
            className={styles[this.props.attribute.active ? "activeText" : "text"]} > 
                {this.props.attribute.value}
            </button>
        );
    }
}

observer(TextButton);