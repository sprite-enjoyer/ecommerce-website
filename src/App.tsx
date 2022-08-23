import React, { Component } from 'react';
import styles from "./App.module.scss";
import { Routes, Router, BrowserRouter, Link } from 'react-router-dom';
import ProductCard, { ProductCardProps } from './components/ProductCard/ProductCard';
import Header from './components/Header/Header';


class App extends Component {
  render(): React.ReactNode {
    return (
      <div className={styles["main"]}>
        <Header />
      </div>
    );
  }
}
export default App;
