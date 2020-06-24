//Configuring rootReducer the reducer that holds
// every other reducer(every small piece of state that i keep in other folders)
import { combineReducers } from "redux";
import ShopReducer from "./Shop/Shop.reducer";
import SpinnerReducer from "./Spinner/Spinner.reducer";
import PageReducer from "./Page/Page.reducer";
import CartReducer from "./Cart/Cart.reducer";
import storageSession from "redux-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
//Config presistor state that u wanted to be saved in a storage of user computer
const persistConfig = {
  key: "shopItems",
  storage: storage,
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  shop: ShopReducer,
  spinner: SpinnerReducer,
  page: PageReducer,
  cart: CartReducer,
});
//Exporting default in order to be used in main files like Index.js
export default persistReducer(persistConfig, rootReducer);
