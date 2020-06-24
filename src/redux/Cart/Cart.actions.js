//About redux i wont comment line per line i will comment how i work
// on Readme file of the project it almost same structure for every file
// but anyway i will comment only Cart Folder in redux

//geting acces on types from my object
import { CartActionTypes } from "./Cart.types";

//Each actiion has same structure it needs a type (unique) that redux understand what to catch and
//a payload it is not required but helps you giving a prop or argument
export const setValueByNameCart = (NameValue) => ({
  type: CartActionTypes.SET_VALUE_BY_NAME_CART,
  payload: NameValue,
});
export const increaseValueOfProduct = (ProductId) => ({
  type: CartActionTypes.INCREASE_VALUE_OF_PRODUCT_BY_ONE,
  payload: ProductId,
});
export const decreaseValueOfProduct = (ProductId) => ({
  type: CartActionTypes.DECREASE_VALUE_OF_PRODUCT_BY_ONE,
  payload: ProductId,
});
export const deleteProduct = (ProductId) => ({
  type: CartActionTypes.DELETE_PRODUCT,
  payload: ProductId,
});
export const selectOneProduct = (ProductId) => ({
  type: CartActionTypes.SELECT_ONE_PRODUCT,
  payload: ProductId,
});
export const selectOrDeselectAll = () => ({
  type: CartActionTypes.SELECT_ALL_OR_DESELECT_ALL,
});
