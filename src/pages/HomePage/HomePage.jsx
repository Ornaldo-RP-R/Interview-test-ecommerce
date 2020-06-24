import React from "react";
import "./HomePage.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  setFullArrayOfProducts,
  setDisplayedArrayOfProducts,
  setValueByName,
} from "../../redux/Shop/Shop.actions";
import { getData, ContrFunc } from "../../api/AxiosHelperFunctions";
import Filter from "../../components/Filter/Filter.component";
import { toggleSpinner } from "../../redux/Spinner/Spinner.actions";
import { setViewOfPage } from "../../redux/Page/Page.actions";
import ProductScrollView from "../../components/ProductScrollView/ProductScrollView.component";
import ProducdPaginationView from "../../components/ProductPaginationView/ProductPaginationView.component";
import UserLoggedDropdown from "../../components/UserLoggedDropdown/UserLoggedDropdown.component";
import CartDropdown from "../../components/CardDropdown/CardDropdown.component";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDropdown: false,
      cardDropdown: false,
    };
  }
  //Make Api call and get Products Info
  GetProducts = async () => {
    //destructuring props
    const {
      toggleSpinner,
      setFullArrayOfProducts,
      setDisplayedArrayOfProducts,
      setValueByName,
    } = this.props;
    //start Api call
    await getData(ContrFunc.Functions.products, toggleSpinner, {
      _pages: 1,
      _limit: 80,
    }).then((response) => {
      //register  80 products to redux (80 becouse no need more for start and load faster)
      setFullArrayOfProducts(response.data);
      // register products that we need to display to the user
      setDisplayedArrayOfProducts(response.data.slice(0, 20));
      //set Index to redux a variable that i use to keep truck of the product number shown to user
      setValueByName({ name: "Index", value: 20 });
    });
    await toggleSpinner();
    // while user uses the pages full products will be registered not only (80)
    await getData(ContrFunc.Functions.products, null, null).then((response) => {
      setFullArrayOfProducts(response.data);
    });
  };
  componentDidMount() {
    this.props.setValueByName({ name: "Index", value: 0 });

    //Call function to get products when components load
    this.GetProducts();
  }
  //Handle Scrolling  to give more products
  findTotalValue = (Array) => {
    let value = 0;
    for (let i = 0; i < Array.length; i++) {
      value += Array[i].value;
    }
    return value;
  };
  render() {
    //destructuring props
    const { ViewOfPage, setViewOfPage, ItemsOfCard } = this.props;

    return (
      <div className="PositionComponents">
        {/*Display Filter option */}
        <div className="Filter-Header">
          <Filter />
        </div>
        <div>
          <div>
            {/*if user click on user icon in top it will show dropdown*/}
            {this.state.cardDropdown === true ? (
              <CartDropdown cartItems={ItemsOfCard} />
            ) : null}
          </div>
        </div>
        {/*Button to hcange scroll view  between scrolling and pagination*/}
        <div className="SwitchView" onClick={setViewOfPage}>
          {ViewOfPage === "Pagination"
            ? "Turn on Scrolling View"
            : "Turn on Pagination View"}
        </div>
        {/*Cart Menu product that has been saved by user */}
        <div
          className="Store ShopCart"
          onClick={() => {
            this.setState({ cardDropdown: !this.state.cardDropdown });
          }}
        >
          {ItemsOfCard ? <div>{this.findTotalValue(ItemsOfCard)}</div> : null}
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="icon"
            color="white"
          ></FontAwesomeIcon>
        </div>
        {/*User Menu
        Each menu dropdown in handled by state on click it toggle the state prop value
        */}
        <div
          className="Store UserIcon"
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.setState({ userDropdown: !this.state.userDropdown });
          }}
        >
          <FontAwesomeIcon
            icon={faUser}
            className="icon"
            color="white"
          ></FontAwesomeIcon>
        </div>
        <div>
          {this.state.userDropdown === true ? <UserLoggedDropdown /> : null}
        </div>
        {/*Handling which view to show to the user*/}
        {ViewOfPage === "Pagination" ? (
          <ProducdPaginationView />
        ) : (
          <ProductScrollView />
        )}
      </div>
    );
  }
}
//redux and exporting stuff
const mapStateToProps = (state) => ({
  ViewOfPage: state.page.ViewOfPage,
  ItemsOfCard: state.cart.ItemsOfCard,
});
const mapDispatchToProps = (dispatch) => ({
  setFullArrayOfProducts: (FullArrayOfProducts) =>
    dispatch(setFullArrayOfProducts(FullArrayOfProducts)),
  setDisplayedArrayOfProducts: (DisplayedArrayOfProducts) =>
    dispatch(setDisplayedArrayOfProducts(DisplayedArrayOfProducts)),
  toggleSpinner: () => dispatch(toggleSpinner()),
  setValueByName: (NameValue) => dispatch(setValueByName(NameValue)),
  setViewOfPage: () => dispatch(setViewOfPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
