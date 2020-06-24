import { PageActionsTypes } from "./Page.types";
const INITIAL_STATE = {
  ViewOfPage: "Scrolling",
};
const PageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PageActionsTypes.SET_VIEW_OF_PAGE:
      return {
        ...state,
        ViewOfPage:
          state.ViewOfPage === "Pagination" ? "Scrolling" : "Pagination",
      };

    default:
      return state;
  }
};
export default PageReducer;
