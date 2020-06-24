import React from "react";
import Spinner from "../Spinner/spinner.component";
import { connect } from "react-redux";
import ProductCard from "../Product/Product.component";
import "./ProductScrollView.styles.css";
import { setValueByNameCart } from "../../redux/Cart/Cart.actions";
import {
  setDisplayedArrayOfProducts,
  setValueByName,
} from "../../redux/Shop/Shop.actions";
const findRandomNotFirstAdd = (AddsIndexes) => {
  let zIndex = Math.floor(Math.random() * 1000);
  while (zIndex === AddsIndexes[AddsIndexes.length - 1]) {
    zIndex = Math.floor(Math.random() * 1000);
  }
  return zIndex;
};
const handleScroll = async (
  e,
  Index,
  setDisplayedArrayOfProducts,
  DisplayedProductsArray,
  ProductsFullArray,
  AddsIndexes,
  setValueByName
) => {
  if (
    //Check when users reach the bottom
    e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
    Index <= 481
  ) {
    await setValueByName({
      name: "LoadingMore",
      value: true,
    });
    // Tell message to the user in ex "Loading more"
    await setValueByName({
      name: "AddsIndexes",
      value: [...AddsIndexes, findRandomNotFirstAdd(AddsIndexes)],
    });
    // Set timeout so even if data come faster Loading will be shown to users for 1/3s just for design
    await setTimeout(async () => {
      await setValueByName({
        name: "Index",
        value: Index + 20,
      });
      //Get more products from full array that i use in redux state
      await setDisplayedArrayOfProducts(
        DisplayedProductsArray.concat(
          ProductsFullArray.slice(Index, Index + 20)
        )
      );
      // Keep truck of index
      await setValueByName({
        name: "Index",
        value: Index + 20,
      });
      //Stop loading more
      await setValueByName({
        name: "LoadingMore",
        value: false,
      });
      //Check if all products have been displayed
      if (
        Index <= ProductsFullArray.length &&
        Index >= ProductsFullArray.length - 20
      ) {
        setDisplayedArrayOfProducts(ProductsFullArray);
      }
    }, 300);
  }
};
let ProductsCount = 0;

const ProductScrollView = ({
  DisplayedProductsArray,
  SpinnerVissibility,
  AddsIndexes,
  LoadingMore,
  Index,
  setDisplayedArrayOfProducts,
  ProductsFullArray,
  setValueByName,
  ItemsOfCard,
  setValueByNameCart,
}) => {
  ProductsCount = 0;

  return (
    <div
      className="Products"
      onScroll={(e) => {
        handleScroll(
          e,
          Index,
          setDisplayedArrayOfProducts,
          DisplayedProductsArray,
          ProductsFullArray,
          AddsIndexes,
          setValueByName
        );
      }}
    >
      {SpinnerVissibility === true ? (
        <Spinner></Spinner>
      ) : (
        DisplayedProductsArray.map((Product) => {
          ProductsCount++;

          return ProductsCount % 20 === 0 ? (
            <ProductCard
              ItemsofCart={ItemsOfCard}
              setValueByName={setValueByNameCart}
              key={Product.id}
              id={Product.id}
              price={Product.price}
              size={Product.size}
              face={Product.face}
              date={Product.date}
              AddsIndexes={AddsIndexes}
              ProductsCount={ProductsCount}
              AdsVisibility={true}
            />
          ) : (
            <ProductCard
              ItemsofCart={ItemsOfCard}
              setValueByName={setValueByNameCart}
              key={Product.id}
              id={Product.id}
              price={Product.price}
              size={Product.size}
              face={Product.face}
              date={Product.date}
              AddsIndexes={AddsIndexes}
              ProductsCount={ProductsCount}
              AdsVisibility={false}
            />
          );
        })
      )}
      {/*The difference between pagination and scrolling component is here  at bottom i added option for 
      pagination while here by checking when user scroll in bottom i add a loading and continue displaying
       or if all products displayed end of catalogue
      */}
      {LoadingMore === true ? (
        <div className="LoadingMoreend">Loading ...</div>
      ) : null}
      {Index !== 0 && Index === DisplayedProductsArray.length ? (
        <div className="LoadingMoreend">end of catalogue</div>
      ) : null}
    </div>
  );
};
//redux export stuffs
const mapStateToProps = (state) => ({
  DisplayedProductsArray: state.shop.DisplayedProductsArray,
  ProductsFullArray: state.shop.ProductsFullArray,

  SpinnerVissibility: state.spinner.SpinnerVissibility,
  AddsIndexes: state.shop.AddsIndexes,
  Index: state.shop.Index,
  LoadingMore: state.shop.LoadingMore,
  ItemsOfCard: state.cart.ItemsOfCard,
});
const mapDispatchToProps = (dispatch) => ({
  setDisplayedArrayOfProducts: (DisplayedArrayOfProducts) =>
    dispatch(setDisplayedArrayOfProducts(DisplayedArrayOfProducts)),
  setValueByName: (NameValue) => dispatch(setValueByName(NameValue)),
  setValueByNameCart: (NameValue) => dispatch(setValueByNameCart(NameValue)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductScrollView);
