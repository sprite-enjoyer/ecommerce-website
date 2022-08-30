import { Component, ReactNode } from "react";
import styles from "./MainPage.module.scss";
import Header from "../components/Header/Header";
import ProductList from "../components/ProductList/ProductList";
import HeaderStore from "../stores/HeaderStore";
import { observer } from "mobx-react";

class MainPage extends Component {
  headerStore = HeaderStore;
  render(): ReactNode {
    return (
      <div className={styles["main"]} >
        <div
          onClick={() => this.headerStore.setCartShown(false)}
          className={this.headerStore.cartShown ? styles["main__blurryDiv"] : styles["noDiv"]}
        />
        <Header />
        <ProductList />
      </div>
    );
  }
}


export default observer(MainPage);