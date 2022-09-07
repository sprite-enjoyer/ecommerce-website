import { gql } from "@apollo/client";
import { action, makeObservable, observable } from "mobx";
import { apolloClient } from "..";
import { Attribute, AttributeSet, productPageProduct } from "../global/types";

class ProductPageSoreImpl{
    currentProduct: undefined | productPageProduct;
    redirectToHome: boolean = false;
    currentPhoto: string = ""
    constructor(){
        makeObservable(this, {
            currentProduct: observable,
            redirectToHome: observable,
            currentPhoto: observable,
            setCurrentPhoto: action,
            setRedirectToHome: action,
            fetchProduct: action,
            setProduct: action,
            setActiveAttribute: action,
        })
    }

    setProduct(product: productPageProduct) {
        this.currentProduct = product;
    }

    setCurrentPhoto(currentPhoto: string){
      this.currentPhoto = currentPhoto;
    }

    setRedirectToHome(){
        this.redirectToHome = true;
        setTimeout(() => {this.redirectToHome = false}, 100);
    }

    setActiveAttribute(attrSetId: string, attr: Attribute){
        if (this.currentProduct === undefined) return;

    this.currentProduct
    .attributes.filter((attributeSet: AttributeSet) => attributeSet.id === attrSetId)[0]
    .items.forEach(item => item.active = false);

    this.currentProduct
    .attributes.filter((attributeSet: AttributeSet) => attributeSet.id === attrSetId)[0]
    .items.filter((item: Attribute) => item === attr)[0]
    .active = true;
    }

    fetchProduct(id: string){
        const quote = "\"";
        apolloClient.query({
          query: gql`
          {
            product(id: ${quote + id + quote}){
              name
              brand
              description
              inStock
              prices{
                amount
                currency{
                  symbol
                  label
                }
              }
              gallery
              attributes{
                id
                type
                name
                items{
                  displayValue
                  value
                  id
                }
              }
            }
          }
          `
        })
          .then(response => {
            const product = response.data.product;
            for(let attributeSet of product.attributes){
              for(let item of attributeSet.items){
               item= {
                ...item,
                active: false
               };
              }
            }
            const newProduct: productPageProduct = {
              name: product.name,
              id: id,
              prices: product.prices,
              gallery: product.gallery,
              attributes: product.attributes,
              brand: product.brand,
              quantity: 1,
              cartStoreID: -1,
              description: product.description,
              inStock: product.inStock,
            };
            this.setProduct(newProduct);
            this.setCurrentPhoto(newProduct.gallery[0]);
          })
          .catch(error => console.error(error));
      }
    }

const ProductPageStore = new ProductPageSoreImpl();
export default ProductPageStore;