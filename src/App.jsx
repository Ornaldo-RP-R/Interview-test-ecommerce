import * as React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CheckoutPage from "./pages/CheckoutPage/Checkout";
//I usually keep App.js clean just displaying pages in their route by using Switch and Route
const App = () => {
  return (
    <div className="body">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/CheckoutPage" component={CheckoutPage} />
      </Switch>
    </div>
  );
};
export default App;
