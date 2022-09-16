import { Component, ReactNode } from "react";
import styles from "./AttributeButtons.module.scss";
import CartStore from "../../stores/CartStore";
import ProductPageStore from "../../stores/ProductPageStore";
import { Attribute } from "../../global/types";
import { observer } from "mobx-react";

export type SwatchButtonProps = {
    attribute: Attribute;
    forCartStore: boolean;
    productID: string;
    attrSetID: string;
    cartStoreID?: number;
    height?: string;
    width?: string;
    minHeight?: string;
    minWidth?:string;
    maxHeight?: string;
    maxWidth?:string;
};

export default class SwatchButton extends Component<SwatchButtonProps>{
    cartStore = CartStore;
    ppStore = ProductPageStore;
    
    constructor(props: SwatchButtonProps){
        super(props);
        this.forCartStore = this.forCartStore.bind(this);
        this.forProductPageStore = this.forProductPageStore.bind(this);
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
            <div className={styles[this.props.attribute.active ? "activeSwatchWrapper": ""]} >
                <button 
                onClick={this.props.forCartStore ? this.forCartStore : this.forProductPageStore}
                style={{
                    backgroundColor: this.props.attribute.value,
                    height: this.props?.height,
                    width: this.props?.width,
                    minWidth: this.props?.minWidth,
                    minHeight: this.props?.minHeight,
                    maxWidth: this.props?.maxWidth,
                    maxHeight: this.props?.maxHeight
                }}
                className={styles[ this.props.attribute.active ? "activeSwatch" : "swatch"]} />
            </div>

        );
    }
}

observer(SwatchButton);