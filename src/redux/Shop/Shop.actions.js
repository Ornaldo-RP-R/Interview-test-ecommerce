import { ShopActionTypes } from "./Shop.types";

export const setFullArrayOfProducts = (FullArrayOfProducts) => ({
  type: ShopActionTypes.SET_FULL_ARRAY_OF_PRODUCTS,
  payload: FullArrayOfProducts,
});
export const setDisplayedArrayOfProducts = (DisplayedArrayOfProducts) => ({
  type: ShopActionTypes.SET_DISIPLAYED_ARRAY_OF_PRODUCTS,
  payload: DisplayedArrayOfProducts,
});
export const setValueByName = (NameValue) => ({
  type: ShopActionTypes.SET_VALUE_BY_NAME,
  payload: NameValue,
});
