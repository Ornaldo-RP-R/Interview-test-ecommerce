import React, { useState } from "react";
import "./Filter.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Sort from "../Sort/Sort.component";

import { getData, ContrFunc } from "../../api/AxiosHelperFunctions";
import { connect } from "react-redux";
import {
  setFullArrayOfProducts,
  setDisplayedArrayOfProducts,
  setValueByName,
} from "../../redux/Shop/Shop.actions";
import { toggleSpinner } from "../../redux/Spinner/Spinner.actions";
//I have used a component Filter to handle filtering (in actual project sorting)
const Filter = ({
  setFullArrayOfProducts,
  setDisplayedArrayOfProducts,
  setValueByName,
  toggleSpinner,
}) => {
  //4 Pieces of state (i usally dont underestimate state if i am sure that is only used in a single component)
  // first piece is responsible for showing filter options (dropdown)
  // 3 piece in which Each one responsible for each sort type
  const [FilterState, setFilterState] = useState(false);
  const [SizeSort, setSizeSort] = useState(false);

  const [PrizeSort, setPrizeSort] = useState(false);
  const [IdSort, setIdSort] = useState(false);
  // Function For Api request
  const AxiosRequest = async (ItemToSort) => {
    //Make sure to dont get loading more or end of catalogue
    await setValueByName({
      name: "Index",
      value: 0,
    });
    //Get 80 products (i have used this method for performance) so user fast get some result that he firstly need
    await getData(ContrFunc.Functions.products, toggleSpinner, {
      _sort: ItemToSort,
      _limit: 80,
    }).then((response) => {
      //i assign this to my arrays in redux
      //full data on FullArrayofProduct
      setFullArrayOfProducts(response.data);
      //20 products on DisplayedArrayOfProducts becouse i display only 20 before scrolling or each page
      setDisplayedArrayOfProducts(response.data.slice(0, 20));
      //I keep track of index to show more items
      setValueByName({ name: "Index", value: 20 });
      //And to be sure i make LoadingMore false i use it on scrolling
      setValueByName({ name: "LoadingMore", value: false });
    });
    //After i get data and register on redux i toggleSpinner (stop initiated Spinner by getData my helper function)
    await toggleSpinner();
    //then without using spinner i load all products that may come some second
    // later and register them on FullArrayProduct in redux(user wont understand it becouse no spinner )
    await getData(ContrFunc.Functions.products, null, {
      _sort: ItemToSort,
    }).then((response) => {
      setFullArrayOfProducts(response.data);
    });
  };
  return (
    <div>
      {/*If user hasent pressed Filter option it will be false and to the user will be shown only Button To Get Filter Dropdown If he presses*/}
      {FilterState === false ? (
        //Filter Button
        <div className="Filtering" onClick={() => setFilterState(!FilterState)}>
          Filters
          <FontAwesomeIcon
            icon={faFilter}
            className="icon"
            color="#413b3b"
          ></FontAwesomeIcon>
        </div>
      ) : (
        //In the time user presses it he will see also dropdown which will be show sorting types
        <div>
          <div
            //Filter Button I have used it twice this could be also a small component
            // but when i use it only iniside a signle component its not worth it to open new folders while u can use only onec copying
            className="Filtering"
            onClick={() => setFilterState(!FilterState)}
          >
            Filters
            <FontAwesomeIcon
              icon={faFilter}
              className="icon"
              color="#413b3b"
            ></FontAwesomeIcon>
          </div>
          {/*Then Sort options Sort by id/size/price
          Onclick of them i set state of one that is clicked tue and two other false make the request to change the product array displayed(this will cause refresh)
          toggle FilterState  (false) to remove dropdown for better look
          And i also want to keep track if a sort has been used in redux state  i register it in a piece of state with name SortBy
          */}
          <div className="SortOption">
            <div style={{ fontSize: "1.4vw", margin: "1vh 1vw" }}>
              {" "}
              <b>Sort by: </b>
            </div>
            <Sort
              onClick={() => AxiosRequest("id")}
              title="Id"
              sortVisibility={IdSort}
              onClickOfSort={() => {
                setSizeSort(false);
                setPrizeSort(false);
                setIdSort(true);
                AxiosRequest("id");
                setFilterState(!FilterState);
                setValueByName({
                  name: "SortBy",
                  value: "id",
                });
              }}
            />{" "}
            <Sort
              onClick={() => AxiosRequest("price")}
              title="Prize"
              sortVisibility={PrizeSort}
              onClickOfSort={() => {
                setSizeSort(false);
                setPrizeSort(true);
                setIdSort(false);
                AxiosRequest("price");
                setFilterState(!FilterState);
                setValueByName({
                  name: "SortBy",
                  value: "price",
                });
              }}
            />
            <Sort
              title="Size"
              sortVisibility={SizeSort}
              onClickOfSort={() => {
                setSizeSort(true);
                setPrizeSort(false);
                setIdSort(false);
                AxiosRequest("size");
                setFilterState(!FilterState);
                setValueByName({
                  name: "SortBy",
                  value: "size",
                });
              }}
            />{" "}
          </div>
        </div>
      )}
    </div>
  );
};
// DispatchToProps get redux actions and connect to component
const mapDispatchToProps = (dispatch) => ({
  setFullArrayOfProducts: (FullArrayOfProducts) =>
    dispatch(setFullArrayOfProducts(FullArrayOfProducts)),
  setDisplayedArrayOfProducts: (DisplayedArrayOfProducts) =>
    dispatch(setDisplayedArrayOfProducts(DisplayedArrayOfProducts)),
  toggleSpinner: () => dispatch(toggleSpinner()),
  setValueByName: (NameValue) => dispatch(setValueByName(NameValue)),
});

export default connect(null, mapDispatchToProps)(Filter);
