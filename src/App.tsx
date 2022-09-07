import React, { Component } from 'react';
import styles from "./App.module.scss";
import { Routes, BrowserRouter , Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './routes/MainPage/MainPage';
import CartPage from './routes/CartPage/CartPage';
import ProductPage from './routes/ProductPage/ProductPage';
import HeaderStore from './stores/HeaderStore';
import { observer } from 'mobx-react';

class App extends Component {
  headerStore = HeaderStore;
  render(): React.ReactNode {
    return (
      <div className={styles["main"]}>
        <div
          onClick={() => this.headerStore.setCartShown(false)}
          className={this.headerStore.cartShown ? styles["main__blurryDiv"] : styles["noDiv"]}
        />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/CartPage" element={<CartPage />}/>
            <Route path="/products/*" element={<ProductPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default observer(App);
