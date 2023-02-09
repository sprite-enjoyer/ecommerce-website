import { Component, ReactNode } from "react";
import styles from "./MainPage.module.scss";
import ProductList from "../../components/ProductList/ProductList";
import HeaderStore from "../../stores/HeaderStore";
import { observer } from "mobx-react";

class MainPage extends Component {
  headerStore = HeaderStore;
  render(): ReactNode {
    return (
      <div 
      style={this.headerStore.cartShown ? {overflow: "hidden"} : {}}
      className={styles["main"]} >
        <ProductList />
      </div>
    );
  }
}


export default observer(MainPage);