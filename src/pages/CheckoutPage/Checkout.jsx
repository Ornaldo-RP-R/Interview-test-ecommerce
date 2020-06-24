import React from "react";
import "./Checkout.css";
import { connect } from "react-redux";
import CustomButton from "../../components/CustomButton/Button.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faArrowLeft,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  increaseValueOfProduct,
  decreaseValueOfProduct,
  deleteProduct,
  selectOrDeselectAll,
  selectOneProduct,
} from "../../redux/Cart/Cart.actions";
import { Link } from "react-router-dom";
//Find total of money by product that are checked
//loop through array and if element.checkOption ===true so if product is checked i add in total that would
// be displayed to the user
const FindTotal = (Array) => {
  let sum = 0;
  for (let i = 0; i < Array.length; i++) {
    if (Array[i].checkOption === true) {
      sum += Array[i].product.price * Array[i].value;
    }
  }
  return sum;
};
//Check if all are selected,if i find one that is not selected i just break all and return false otherwise
//at the end if have not found any will return true
const CheckArrayIfAreALLSelected = (Array) => {
  if (Array) {
    let response = true;
    for (let i = 0; i < Array.length; i++) {
      if (Array[i].checkOption === false) {
        response = false;
        break;
      }
    }
    return response;
  } else {
    return false;
  }
};
//Displaying CheckoutPage
const CheckoutPage = ({
  ItemsOfCard,
  increaseValueOfProduct,
  decreaseValueOfProduct,
  deleteProduct,
  selectOneProduct,
  selectOrDeselectAll,
}) => (
  <div>
    <div className="HeaderMessagePosition">
      <span>
        {/*Displaying a back button in order to go back to homepage*/}
        <Link to="/" style={{ textDecoration: "none", position: "relative" }}>
          <div
            style={{
              marginLeft: "3vw",
              width: "35vw",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              color="#1c61c2"
            ></FontAwesomeIcon>
            <div className="CheckoutBackToHome">Go Back To Shop More</div>
          </div>
        </Link>
      </span>
      {/*Displaying a friendly message to the user*/}
      <span className="CheckoutHeadMessage">Happy Shopping</span>
    </div>
    <div className="CheckUncheckAllPosition">
      {/*Displaying a Checkbox for checking all product or deselecting all*/}
      {/*If has any unchecked i show them an option to select all and checkbox of empty(unchecked)*/}
      {CheckArrayIfAreALLSelected(ItemsOfCard) === false ? (
        <div className="CheckUncheckAll">
          <div>Select All</div>
          <div
            className="CheckUncheckAllBox"
            onClick={() => {
              selectOrDeselectAll();
            }}
          ></div>
        </div>
      ) : (
        //otherwise deselect all and a checked box
        <div className="CheckUncheckAll">
          <div>Deselect All</div>
          <div
            className="CheckUncheckAllBox"
            onClick={() => {
              selectOrDeselectAll();
            }}
          >
            <span style={{ color: "green", fontWeight: "bold" }}>&#10004;</span>
          </div>
        </div>
      )}
    </div>
    <div className="CheckoutPage">
      {ItemsOfCard.length ? (
        //Load Items by cartItem array looping though it
        //Every item have checkbox for checking/price/face/value(with posibility to increase or decrease)and
        //a bin for deleting it
        ItemsOfCard.map((cartItem) => (
          <div className="CheckoutPageItem" key={cartItem.product.id}>
            <div
              className="CheckOption"
              onClick={() => {
                selectOneProduct(cartItem.product.id);
              }}
            >
              {cartItem.checkOption === true ? (
                <div className="CheckMarkBox">&#10004;</div>
              ) : (
                <div></div>
              )}
            </div>
            <span className="CheckoutPageface">{cartItem.product.face}</span>
            <div className="CheckoutPageValue">
              <span
                style={
                  cartItem.value === 1
                    ? { backgroundColor: "#f5efef", cursor: "default" }
                    : {}
                }
                className="CheckoutPageArrows"
                onClick={() => {
                  decreaseValueOfProduct(cartItem.product.id);
                }}
              >
                -
              </span>

              {cartItem.value}
              <span
                className="CheckoutPageArrows"
                onClick={() => {
                  increaseValueOfProduct(cartItem.product.id);
                }}
              >
                +
              </span>
            </div>
            <div className="CheckoutPagePrice">
              Price : <span style={{ color: "green" }}> $ </span>{" "}
              {cartItem.product.price}
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="CheckoutPageX"
              onClick={() => {
                deleteProduct(cartItem.product.id);
              }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="icon"
              ></FontAwesomeIcon>
            </div>
          </div>
        ))
      ) : (
        //If no items in cartItems Array i display them a message that cart is ampty and a icon to go to the shop
        //(Main Page)
        <div className="CheckoutPageEmptyMessage">
          Your cart is empty Go To Home Page To Shop More
          <Link to="/" style={{ textDecoration: "none", position: "relative" }}>
            <FontAwesomeIcon
              style={{ marginTop: "3vh" }}
              icon={faShoppingCart}
              color={"crimson"}
              className="icon"
              size={"3x"}
            ></FontAwesomeIcon>
          </Link>
        </div>
      )}
    </div>
    {/*Then button for buying and total amount of product checked*/}

    <div className="CheckoutPageTotalBuyNow">
      {ItemsOfCard.length ? (
        <div className="CheckoutPageTotal">
          {" "}
          Total : <span style={{ color: "green" }}> $ </span>{" "}
          {FindTotal(ItemsOfCard)}
        </div>
      ) : null}
      <div className="CheckoutPageBuyNow">
        <CustomButton
          title="Buy Now"
          desiredClassName="BuyNowButtonCheckoutPage"
        >
          <FontAwesomeIcon
            style={{ marginLeft: "1vw" }}
            icon={faCreditCard}
            className="icon"
          ></FontAwesomeIcon>
        </CustomButton>
      </div>
    </div>
  </div>
);
const mapStateToProps = (state) => ({
  ItemsOfCard: state.cart.ItemsOfCard,
});
const mapDispatchToProps = (dispatch) => ({
  increaseValueOfProduct: (ProductId) =>
    dispatch(increaseValueOfProduct(ProductId)),
  decreaseValueOfProduct: (ProductId) =>
    dispatch(decreaseValueOfProduct(ProductId)),
  deleteProduct: (ProductId) => dispatch(deleteProduct(ProductId)),
  selectOneProduct: (ProductId) => dispatch(selectOneProduct(ProductId)),
  selectOrDeselectAll: () => dispatch(selectOrDeselectAll()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
