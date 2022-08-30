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
  value?: string;
  id?: string;
};
export type AttributeSet = {
  id: string;
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

export type CartProduct = {
  name: string;
  id: string;
  prices: Array<Price>;
  gallery: Array<string>;
  attributes: Array<AttributeSet>;
  brand: string;
};

export type DisplayProduct = {
  name: string;
  id: string;
  prices: Array<string>;
  picture: string;
};