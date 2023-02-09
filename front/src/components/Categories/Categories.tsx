import { gql } from "@apollo/client";
import styles from "./Categories.module.scss";
import { observer } from "mobx-react";
import {Component, ReactNode} from "react";
import { apolloClient } from "../..";
import { v4 } from "uuid";
import ProductPageStore from "../../stores/ProductPageStore";
import HeaderStore from "../../stores/HeaderStore";

class Categories extends Component{
    ppStore = ProductPageStore;
    headerStore = HeaderStore;
    state = {
        categories: []
    };
    componentDidMount(): void {
        apolloClient.query({
            query: gql`
            {
                categories{
                  name
                }
            }
            `
        }).then(response => {
            let temp: string[] = [];
            response.data.categories.forEach(
                (something: {__typename: string, name: string}) => temp.push(something.name)
                );
            this.setState({categories: temp});
        });
    }
    render(): ReactNode {
        return (
            <div className={styles["main"]}>
                {
                    this.state.categories.map((category: string) => 
                    <button
                        key={v4()}
                        onClick={() => {
                            this.ppStore.setRedirectToHome();
                            this.headerStore.setCategory(category)
                          }}
                        style={this.headerStore.category === category ?
                            { borderBottom: "3px solid #5ECE7B" } : { paddingBottom: "5px" }}
                        className={styles["main__btn"]} 
                    >
                        <span className={styles["main__btn__txt"]} >
                            {category}
                        </span>
                    </button>)
                }
            </div>
        );
    }
}

export default observer(Categories);