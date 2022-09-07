export type Currency = {
  label: string;
  symbol: string;
};

export enum AttributeType {
  text = 'text',
  swatch = 'swatch'
};

export type Attribute = {
  displayValue: string;
  value: string;
  id?: string;
  active: boolean;
};

export type AttributeSet = {
  id: string;
  cartStoreID: number;
  items: Array<Attribute>;
  type: AttributeType;
};


export type Price = {
  currency: Currency;
  amount: number;
};

export enum Category {
  all = 'all',
  clothes = 'clothes',
  tech = 'tech'
};

export interface cartStoreProduct {
  name: string;
  id: string;
  prices: Array<Price>;
  gallery: Array<string>;
  attributes: Array<AttributeSet>;
  brand: string;
  quantity: number;
  cartStoreID: number;
};

export interface productPageProduct extends cartStoreProduct{
  description: string;
  inStock: boolean;
}

export type DisplayProduct = {
  name: string;
  id: string;
  prices: Array<string>;
  picture: string;
};