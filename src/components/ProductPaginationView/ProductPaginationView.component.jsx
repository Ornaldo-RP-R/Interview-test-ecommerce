import React, { useEffect } from "react";
import "./ProductPaginationView.styles.css";
import { connect } from "react-redux";
import ProductCard from "../Product/Product.component";
import Pagination from "../Pagination/Pagination.component";
import { toggleSpinner } from "../../redux/Spinner/Spinner.actions";
import Spinner from "../Spinner/spinner.component";
import { setValueByNameCart } from "../../redux/Cart/Cart.actions";

import {
  setDisplayedArrayOfProducts,
  setValueByName,
} from "../../redux/Shop/Shop.actions";
import { getData, ContrFunc } from "../../api/AxiosHelperFunctions";
//This function is responsible to increase or decrease page by geting an
//increment and using some redux state props and functions(Exactly when pressing arrows)
const EncreaseOrDecreasePage = async (
  increment,
  clickedPage,
  totalPages,
  setValueByName,
  toggleSpinner,
  AddsIndexes,
  SortBy
) => {
  //find page clicked after pressing (in this case indicated by increment and should not pass limit of first and last page)
  const PageClickedAfterPressing =
    clickedPage + increment <= 1
      ? 1
      : clickedPage + increment >= totalPages
      ? totalPages
      : clickedPage + increment;
  //register clicked page
  await setValueByName({
    name: "clickedPage",
    value: PageClickedAfterPressing,
  });
  // get new add
  //For adds i have used a logic that i keep an array of adds in redux and when i should display another add
  //by using findRandomNotFirstAdd i make sure that the new add that will be added (r index for image in /ads?r=)
  //will be different than the last index of that array and user will not see two adds in a row

  /*IMPORTANT i checked by url and some different r values gives me same images , 
  i made sure that r are different if two adds in a row are same it may be api bug*/
  await setValueByName({
    name: "AddsIndexes",
    value: [...AddsIndexes, findRandomNotFirstAdd(AddsIndexes)],
  });
  //Since the page is changed we have to make again call to get new products
  getProductsNedded(
    PageClickedAfterPressing,
    toggleSpinner,
    setValueByName,
    SortBy
  );
};
//When user click direct to page kind of same logic but clicked page will be the page that user click
const OnPageClick = async (
  page,
  setValueByName,
  toggleSpinner,
  AddsIndexes,
  SortBy
) => {
  await setValueByName({
    name: "clickedPage",
    value: page,
  });
  await setValueByName({
    name: "AddsIndexes",
    value: [...AddsIndexes, findRandomNotFirstAdd(AddsIndexes)],
  });
  getProductsNedded(page, toggleSpinner, setValueByName, SortBy);
};
//GetProductsNeeded is a helper function used in top  functions it makes request api and get product needed
const getProductsNedded = async (
  clickedPage,
  toggleSpinner,
  setValueByName,
  SortBy,
  setValueByNameCart
) => {
  await getData(ContrFunc.Functions.products, toggleSpinner, {
    _page: clickedPage,
    _limit: 20,
    _sort: SortBy,
  }).then((response) => {
    setValueByName({
      name: "PaginationDisplayedArrayOfProducts",
      value: response.data,
    });
  });
  toggleSpinner();
};
//Check last index of array before to display an add
const findRandomNotFirstAdd = (AddsIndexes) => {
  //get a random number
  let zIndex = Math.floor(Math.random() * 1000);
  // make sure that is not the same add that was before so last index of addsindexes
  while (zIndex === AddsIndexes[AddsIndexes.length - 1]) {
    zIndex = Math.floor(Math.random() * 1000);
  }
  return zIndex;
};
//This component is responsible for showing products by using paginations

const ProducdPaginationView = ({
  ProductsFullArray,
  clickedPage,
  setValueByName,
  toggleSpinner,
  PaginationDisplayedArrayOfProducts,
  SpinnerVissibility,
  AddsIndexes,
  ItemsOfCard,
  SortBy,
}) => {
  //useEffect Hook  i used this when component load to get products even if user dont presses anything
  useEffect(() => {
    getProductsNedded(1, toggleSpinner, setValueByName, SortBy);
  }, [toggleSpinner, setValueByName, SortBy]);

  return (
    <div className="ShowPageProductsPagination">
      {/*I make sure for being 100% if AddsIndexes last item is not undefiend or false value */}
      {AddsIndexes[AddsIndexes.length - 1] ? (
        //If it exist show normal add by index of aaddsindexes
        <div className="adscontainer">
          <img
            style={{ width: "40vw", height: "14vh" }}
            alt="Loading"
            src={`http://localhost:5000/ads?r=${
              AddsIndexes[AddsIndexes.length - 1]
            }`}
          />
        </div>
      ) : (
        //otherwise a random add (this will barely happen but if any case in order to dont crash)
        <div className="adscontainer">
          <img
            style={{ width: "40vw", height: "14vh" }}
            alt="Loading"
            src={`http://localhost:5000/ads?r=${Math.floor(
              Math.random() * 1000
            )}`}
          />
        </div>
      )}
      {/*Display product grid  if my spinnerBolean in redux is true i get spinner to wait fetch happen
    otherwise i use my component ProductCard to loop throught my array and display every ProductCard  on Grid */}
      <div className="Products" style={{ width: "90vw", height: "65vh" }}>
        {SpinnerVissibility === true ? (
          <Spinner></Spinner>
        ) : (
          PaginationDisplayedArrayOfProducts.map((Product) => {
            return (
              <ProductCard
                ItemsofCart={ItemsOfCard}
                setValueByName={setValueByNameCart}
                key={Product.id}
                id={Product.id}
                price={Product.price}
                size={Product.size}
                face={Product.face}
                date={Product.date}
              />
            );
          })
        )}
      </div>
      {/*Also at the end of page is pagination component for showing pages  and it have functions explained up*/}
      <Pagination
        style={{ width: "90vw", height: "10vh" }}
        pages={
          ProductsFullArray.length % 20 === 0
            ? ProductsFullArray.length / 20
            : ProductsFullArray.length / 20 + 1
        }
        clickedPage={clickedPage}
        onClickOfPage={(page) => {
          OnPageClick(page, setValueByName, toggleSpinner, AddsIndexes, SortBy);
        }}
        IncreasePageByThree={() => {
          EncreaseOrDecreasePage(
            3,
            clickedPage,
            ProductsFullArray.length % 20 === 0
              ? ProductsFullArray.length / 20
              : ProductsFullArray.length / 20 + 1,
            setValueByName,
            toggleSpinner,
            AddsIndexes,
            SortBy
          );
        }}
        IncreasePageByOne={() => {
          EncreaseOrDecreasePage(
            1,
            clickedPage,
            ProductsFullArray.length % 20 === 0
              ? ProductsFullArray.length / 20
              : ProductsFullArray.length / 20 + 1,
            setValueByName,
            toggleSpinner,
            AddsIndexes,
            SortBy
          );
        }}
        DecreasePageByOne={() => {
          EncreaseOrDecreasePage(
            -1,
            clickedPage,
            ProductsFullArray.length % 20 === 0
              ? ProductsFullArray.length / 20
              : ProductsFullArray.length / 20 + 1,
            setValueByName,
            toggleSpinner,
            AddsIndexes,
            SortBy
          );
        }}
        DecreasePageByThree={() => {
          EncreaseOrDecreasePage(
            -3,
            clickedPage,
            ProductsFullArray.length % 20 === 0
              ? ProductsFullArray.length / 20
              : ProductsFullArray.length / 20 + 1,
            setValueByName,
            toggleSpinner,
            AddsIndexes,
            SortBy
          );
        }}
      />
    </div>
  );
};
//redux and export stuffs
const mapStateToProps = (state) => ({
  DisplayedProductsArray: state.shop.DisplayedProductsArray,
  ProductsFullArray: state.shop.ProductsFullArray,
  clickedPage: state.shop.clickedPage,
  SpinnerVissibility: state.spinner.SpinnerVissibility,
  AddsIndexes: state.shop.AddsIndexes,
  Index: state.shop.Index,
  LoadingMore: state.shop.LoadingMore,
  PaginationDisplayedArrayOfProducts:
    state.shop.PaginationDisplayedArrayOfProducts,
  ItemsOfCard: state.cart.ItemsOfCard,
  SortBy: state.shop.SortBy,
});
const mapDispatchToProps = (dispatch) => ({
  setDisplayedArrayOfProducts: (DisplayedArrayOfProducts) =>
    dispatch(setDisplayedArrayOfProducts(DisplayedArrayOfProducts)),
  setValueByName: (NameValue) => dispatch(setValueByName(NameValue)),
  toggleSpinner: () => dispatch(toggleSpinner()),
  setValueByNameCart: (NameValue) => dispatch(setValueByNameCart(NameValue)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProducdPaginationView);
