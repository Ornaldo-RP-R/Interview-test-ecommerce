import { ShopActionTypes } from "./Shop.types";

const INITIAL_STATE = {
  ProductsFullArray: [],
  DisplayedProductsArray: [],
  LoadingMore: false,
  Index: 0,
  AddsIndexes: [Math.floor(Math.random() * 1000)],
  clickedPage: 1,
  PaginationDisplayedArrayOfProducts: [],
  SortBy: "Id",
};

const ShopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.SET_DISIPLAYED_ARRAY_OF_PRODUCTS:
      return {
        ...state,
        DisplayedProductsArray: action.payload,
      };
    case ShopActionTypes.SET_VALUE_BY_NAME:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ShopActionTypes.SET_FULL_ARRAY_OF_PRODUCTS:
      return {
        ...state,
        ProductsFullArray: action.payload,
      };
    default:
      return state;
  }
};
export default ShopReducer;
