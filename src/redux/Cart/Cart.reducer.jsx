//geting acces to action types from my object
import { CartActionTypes } from "./Cart.types";
//geting acces from my helperfunctions
import {
  FindItemToArrayByIdIncreaseOrDecrease,
  RemoveProductById,
  SelectAllOrDeselectAll,
  SelectOneById,
} from "./Cart.filterhelper";
//declaring INITIALSTATE
const INITIAL_STATE = {
  ItemsOfCard: [],
};
//Create reducer by giving state,action and use switch to  give acces to see between actions
//each case is a string by my obj and it reeturns first state but with a property changed  depend on type and
//my logic

const CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.SELECT_ALL_OR_DESELECT_ALL:
      return {
        ...state,
        ItemsOfCard: [...SelectAllOrDeselectAll(state.ItemsOfCard)],
      };

    case CartActionTypes.SELECT_ONE_PRODUCT:
      return {
        ...state,
        ItemsOfCard: [...SelectOneById(action.payload, state.ItemsOfCard)],
      };

    case CartActionTypes.INCREASE_VALUE_OF_PRODUCT_BY_ONE:
      return {
        ...state,
        ItemsOfCard: [
          ...FindItemToArrayByIdIncreaseOrDecrease(
            action.payload,
            state.ItemsOfCard,
            1
          ),
        ],
      };
    case CartActionTypes.DECREASE_VALUE_OF_PRODUCT_BY_ONE:
      return {
        ...state,
        ItemsOfCard: [
          ...FindItemToArrayByIdIncreaseOrDecrease(
            action.payload,
            state.ItemsOfCard,
            -1
          ),
        ],
      };
    case CartActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        ItemsOfCard: [...RemoveProductById(action.payload, state.ItemsOfCard)],
      };

    case CartActionTypes.SET_VALUE_BY_NAME_CART:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    default:
      return state;
  }
};
export default CartReducer;
