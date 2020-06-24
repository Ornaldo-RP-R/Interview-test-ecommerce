import { SpinnerActionTypes } from "./Spinners.type";
const INITIAL_STATE = {
  SpinnerVissibility: false,
};
const SpinnerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SpinnerActionTypes.TOGGLE_SPINNER:
      return {
        ...state,
        SpinnerVissibility: !state.SpinnerVissibility,
      };

    default:
      return state;
  }
};
export default SpinnerReducer;
