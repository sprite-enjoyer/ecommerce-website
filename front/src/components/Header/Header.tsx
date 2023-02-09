import { Component, ReactNode } from "react";
import styles from "./Header.module.scss";
import CartOverlay from "../CartOverlay/CartOverlay";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import Categories from "../Categories/Categories";

class Header extends Component {

  render(): ReactNode {
    return (
        <div className={styles["main"]} >
          <div className={styles["main__categoryContainer"]} >
            <Categories />
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

export default Header;