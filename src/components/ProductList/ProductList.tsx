import { observer } from "mobx-react";
import { Component, ReactNode } from "react";
import styles from "./ProductList.module.scss";


class ProductList extends Component {

  componentDidMount() {

  }

  render(): ReactNode {
    return (
      <div className={styles["main"]} >

      </div>
    );
  }
}


export default observer(ProductList);