import { Component, ReactNode } from "react";
import styles from "./Header.module.scss";
import CartOverlay from "../CartOverlay/CartOverlay";
import HeaderStore from "../../stores/HeaderStore";
import { Category } from "../../global/types";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import { observer } from "mobx-react";
import ProductPageStore from "../../stores/ProductPageStore";

class Header extends Component {
  headerStore = HeaderStore;
  ppStore = ProductPageStore;

  render(): ReactNode {
    return (
        <div className={styles["main"]} >
          <div className={styles["main__categoryContainer"]} >
            <div>
              <button
                onClick={() => {
                  this.ppStore.setRedirectToHome();
                  this.headerStore.setCategory(Category.all)
                }}
                style={this.headerStore.category === Category.all ?
                  { borderBottom: "3px solid #5ECE7B" } : { paddingBottom: "5px" }}
                className={styles["main__categoryContainer__btn"]} >
                <span className={styles["main__categoryContainer__btn__txt"]}>
                  ALL
                </span>
              </button>
            </div>
            <div>
              <button
                style={this.headerStore.category === Category.clothes ?
                  { borderBottom: "3px solid #5ECE7B" } : { paddingBottom: "5px" }}
                onClick={() => {
                  this.ppStore.setRedirectToHome();
                  this.headerStore.setCategory(Category.clothes)
                }}
                className={styles["main__categoryContainer__btn"]} >
                <span className={styles["main__categoryContainer__btn__txt"]}>
                  CLOTHES
                </span>
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  this.ppStore.setRedirectToHome();
                  this.headerStore.setCategory(Category.tech)
                }}
                style={this.headerStore.category === Category.tech ?
                  { borderBottom: "3px solid #5ECE7B" } : { paddingBottom: "5px" }}
                className={styles["main__categoryContainer__btn"]} >
                <span className={styles["main__categoryContainer__btn__txt"]}>
                  TECH
                </span>
              </button>
            </div>
          </div>
          <div className={styles["main__logoContainer"]} >
            <img src={require("../../assets/logo.svg").default} alt="logo" />
          </div>
          <div className={styles["main__dropDowns"]} >
            <CurrencySwitcher />
            <CartOverlay />
          </div>
        </div>
    );
  }
}

export default observer(Header);