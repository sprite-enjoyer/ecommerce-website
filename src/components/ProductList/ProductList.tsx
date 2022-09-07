import { observer } from "mobx-react";
import { Component, ReactNode } from "react";
import styles from "./ProductList.module.scss";
import HeaderStore from "../../stores/HeaderStore";
import ProductCard from "../ProductCard/ProductCard";
import { v4 } from "uuid";

class ProductList extends Component {
  headerStore = HeaderStore;
  componentDidMount() {
    this.headerStore.fetchProducts();
  }

  render(): ReactNode {
    return (
      <div className={styles["main"]}
        onClick={() => this.headerStore.setCurrencyCollapsed(false)}

      >
        <h1 className={styles["main__category"]} >
          {this.headerStore.category.toUpperCase()}
        </h1>
        <div className={styles["main__productList"]} >
          {this.headerStore.filteredProducts.map((product: any) =>
            <ProductCard
              brand={product.brand}
              name={product.name}
              id={product.id}
              inStock={product.inStock}
              prices={product.prices}
              picture={product.gallery[0]}
              key={v4()}
            />
          )}
        </div>
      </div>
    );
  }
}


export default observer(ProductList);