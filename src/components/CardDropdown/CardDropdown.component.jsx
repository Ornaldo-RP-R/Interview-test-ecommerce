// Components folder is used to create small parts that are used frequently , that i use many times or keep me track of it better organization in small pieces
//imports
import React from "react";
import "./CardDropdown.styles.css";
import CustomButton from "../CustomButton/Button.component";
import { Link } from "react-router-dom";
import {
  increaseValueOfProduct,
  decreaseValueOfProduct,
  deleteProduct,
} from "../../redux/Cart/Cart.actions";
import { connect } from "react-redux";
//CartDropdown is used to show dropdown when user presses shop icon at the top to show list of product he has saved
const CartDropdown = ({
  cartItems,
  increaseValueOfProduct,
  decreaseValueOfProduct,
  deleteProduct,
}) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {/* if i have items saved by user i loop through them and display some info */}
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <div className="cart-item" key={cartItem.product.id}>
            <div className="item-details">
              {/* displaying product face */}
              <span className="Cardface">{cartItem.product.face}</span>
              {/* displaying product price */}
              <span className="CardPrice">
                {/* displaying product value with increase or decrease arrows  */}
                <span
                  className="CardDropdownArrows"
                  // onClick of arrow i check if this product by id given  ,is inside the saved item .And if it is i increase
                  // or decrease value depend on increment that i pass to function
                  onClick={() => {
                    decreaseValueOfProduct(cartItem.product.id);
                  }}
                >
                  {" "}
                  &lt;{" "}
                </span>
                {cartItem.value}
                <span
                  className="CardDropdownArrows"
                  onClick={() => {
                    //Same as on other arrow but here increment in redux fnuction changes to +1 to increase it while up is -1 to decrease it
                    increaseValueOfProduct(cartItem.product.id);
                  }}
                >
                  {" "}
                  &gt;{" "}
                </span>{" "}
                x<span style={{ color: "green" }}> $ </span>{" "}
                {/* displaying product price */}
                {cartItem.product.price}
              </span>
              <span
                // displaying a delete option
                //onclick i use redux action by geting this product id and checking if exist in cartItem array if yes then use splice method to remove it
                className="CartDropdownX"
                onClick={() => {
                  deleteProduct(cartItem.product.id);
                }}
              >
                &#10006;
              </span>
            </div>
          </div>
        ))
      ) : (
        // otherwise i show that its cart is empty
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <Link
      to="/CheckoutPage"
      style={{ textDecoration: "none", position: "relative" }}
    >
      {/*And finally the button if he want to view again orders before ordering */}
      <CustomButton
        title={"Go To Checkout"}
        desiredClassName={"CardDropdownCheckout"}
      />
    </Link>
  </div>
);
// For parts that are same i wont use long explanation
//In some components  i use connect in order to get acces to state or actions in redux
//For actions i use mapDispatchToProps(any other name is ok but this is likely gloabl and well known by proramers)
//For state i use mapStateToProps(any other name is ok but this is likely gloabl and well known by proramers)

const mapDispatchToProps = (dispatch) => ({
  increaseValueOfProduct: (ProductId) =>
    dispatch(increaseValueOfProduct(ProductId)),
  decreaseValueOfProduct: (ProductId) =>
    dispatch(decreaseValueOfProduct(ProductId)),
  deleteProduct: (ProductId) => dispatch(deleteProduct(ProductId)),
});
//And then use connect to give acces to component this two constants i created (to access state/actions or both of them)
export default connect(null, mapDispatchToProps)(CartDropdown);
