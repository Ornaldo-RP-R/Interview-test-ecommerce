import React from "react";
import "./Product.styles.css";
import CustomButton from "../CustomButton/Button.component";
// Find Date format if 1week or less ex:"2 days ago"
//otherwise i let full date YY/MM/DD more confortable for human eye otherwise i could do a .toString for fully date
const findCorrectDateFormat = (productDate) => {
  let now = new Date();
  let date = "";
  //Make first check foramt of 1week or less from today's date
  if (
    now.getFullYear() === productDate.getFullYear() &&
    now.getMonth() === productDate.getMonth() &&
    now.getDate() - productDate.getDate() >= 7
  ) {
    //make small checks if is day ago/minutes/hours
    if (now.getDate() - productDate.getDate() === 0) {
      if (now.getHours() - productDate.getHours() === 0) {
        if (now.getMinutes() - productDate.getMinutes() === 0) {
          if (now.getSeconds() - productDate.getSeconds() !== 0) {
            return (date = `${
              now.getSeconds() - productDate.getSeconds()
            } minutes ago`);
          }
        } else {
          return (date = `${
            now.getMinutes() - productDate.getMinutes()
          } minutes ago`);
        }
      } else {
        return (date = `${now.getHours() - productDate.getHours()} hours ago`);
      }
    } else {
      return (date = `${now.getDate() - productDate.getDate()} days ago`);
    }
  } else {
    //otherwise full date format (in full format i used year/month/date becouse full date .tostring would not be good
    //for users eye anyway i just need more instructions and i can make everything)
    return (date =
      "since " +
      productDate.getFullYear() +
      "/" +
      productDate.getMonth() +
      "/" +
      productDate.getDate());
  }
  return date;
};
// I loop through array and return index of that product if product is inside otherwise -1
const FindIfIsInsideOfArray = (Array, product) => {
  if (Array) {
    for (let i = 0; i < Array.length; i++) {
      if (product.id === Array[i].product.id) {
        return i;
      }
    }
    return -1;
  } else {
    return -1;
  }
};
//This function helps me to change ItemsOfCard array (items that user ordered or saaved to card)
//i get a product /cart products list/and modification action that is in redux then i fire that action base on
// my modification
const SaveToCard = (product, setValueByName, ItemsofCart) => {
  let ModifyItemsOfCart = ItemsofCart;
  // check if ModifyItemsOfCart exist or is valid
  if (ModifyItemsOfCart) {
    // then if product doesnt exist on that array just add it with value of one and checkOption false(unchecked)
    if (FindIfIsInsideOfArray(ItemsofCart, product) === -1) {
      ModifyItemsOfCart.push({
        product: product,
        value: 1,
        checkOption: false,
      });
    } else {
      //otherwise find that product and increase value by one
      ModifyItemsOfCart[FindIfIsInsideOfArray(ItemsofCart, product)].value =
        ModifyItemsOfCart[FindIfIsInsideOfArray(ItemsofCart, product)].value +
        1;
    }
  }
  //and then save modified array of cart items in redux
  setValueByName({
    name: "ItemsOfCard",
    value: [...ModifyItemsOfCart],
  });
};
//Product Card component which is responsible for displaying each product
const ProductCard = ({
  setValueByName,
  id,
  price,
  size,
  face,
  date,
  AddsIndexes,
  ProductsCount,
  AdsVisibility,
  ItemsofCart,
}) => (
  //I will not explain every line below becouse is not anything
  //logic just displaying my props and giving some styles
  <div>
    <div id={id} className="Each-Product">
      <span className="face" style={{ fontSize: `${size}px` }}>
        {face}
      </span>
      <div
        onClick={() => {
          SaveToCard(
            {
              id,
              price,
              size,
              face,
              date,
            },
            setValueByName,
            ItemsofCart
          );
        }}
      >
        <CustomButton title={"Add To Cart"} desiredClassName={"OrderNow"} />
      </div>

      <div className="price">
        $<span style={{ color: "black" }}>{` ${price}`}</span>
      </div>
      <div className="date">{`${findCorrectDateFormat(new Date(date))}`}</div>
    </div>
    {AdsVisibility === true ? (
      AddsIndexes[ProductsCount / 20] ? (
        <div className="advertisment">
          <img
            className="ad"
            alt="Loading"
            src={`http://localhost:5000/ads?r=${
              AddsIndexes[ProductsCount / 20]
            }`}
          />
        </div>
      ) : (
        <div className="advertisment">
          <img
            className="ad"
            alt="Loading"
            src={`http://localhost:5000/ads?r=${Math.floor(
              Math.random() * 1000
            )}`}
          />
        </div>
      )
    ) : null}
  </div>
);
export default ProductCard;
