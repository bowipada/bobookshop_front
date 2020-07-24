import React from 'react';
import { Input, Box, IconButton, Badge } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import ShopHome from "./shopHome";
import Books from "./books";
import BookDetail from "./bookDetail";
import Cart from "./cart";
import { connect } from "react-redux";
import { setCart } from "../../redux/actions/bookAction";
import imgbookHeader from '../../assets/images/bookstack.png';

const headerStyle = {
  color: "#fff",
  fontWeight: "bold",
  fontFamily: 'Dancing Script',
  fontSize: "32px",
  lineGHeight: "50px",
  height: "50px",
  padding: "0 20px",
  background: "#009688",
  zIndex: 1,
  postion: "sticky",
  top: 0
};

const imgbookHeaderStyle = {
  display: "inline-block",
  verticalAlign: "middle",
  width: "32px",
  height: "32px",
  marginRight: "15px",
  backgroundImage: `url(${imgbookHeader})`,
  backgroundSize: "contain"
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  display: "inline-block",
  lineHeight: "50px"
};

const iconCartStyle = {
  float: "right",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  height: "100%",
  color: "#fff"
}
class Shop extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
      cartCount: 0
    };
    this.onKeywordChange = this.onKeywordChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSearch = this.onSearch.bind(this)
  }

  onKeywordChange(event) {
    const keyword = event.target.value;
    this.setState({ keyword });
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }

  onSearch() {
    const keyword = encodeURI(this.state.keyword);
    this.props.history.push('/shop/books?keyword=' + keyword);
    window.location.reload();
  }

  setCartCount() {
    let cartCount = 0;
    if (sessionStorage.getItem("cart")) {
      const cart = JSON.parse(sessionStorage.getItem("cart"));
      cartCount = cart.length;
    }
    this.props.dispatch(setCart(cartCount));
  }

  componentDidMount() {
    this.setCartCount();
  }

  render() {
    const cart = this.props.cart ? this.props.cart : 0;
    return (
      <div className="container">
        <Router>
          <div style={headerStyle}><div style={imgbookHeaderStyle}></div>
            <Link to="/shop" style={linkStyle}>Bo's Bookshop</Link>
            <Link to="/shop/cart" style={iconCartStyle}>
              <Badge badgeContent={cart} color="secondary" max={99}>
                <ShoppingCartIcon></ShoppingCartIcon>
              </Badge>
            </Link>
          </div>
          <div className="content">
            <Box m={1} display="flex">
              <Box flexGrow={2}>
                <Input
                  value={this.state.keyword}
                  onChange={this.onKeywordChange}
                  onKeyDown={this.onKeyDown}
                  fullWidth={true}
                  placeholder="Search"
                />
              </Box>
              <IconButton onClick={this.onSearch}>
                <SearchIcon />
              </IconButton>
            </Box>
          </div>
          <Switch>
            {/* <Route path="/shop/book/:id" render={() => <BookDetail setCartCount={this.setCartCount} />} /> */}
            <Route path={`/shop/book/:id`} component={BookDetail} />
            <Route path="/shop/books" component={Books} />
            <Route path="/shop/cart" component={Cart} />
            <Route path="/shop" component={ShopHome} />
          </Switch>
        </Router>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    cart: state.books.cart
  };
};

export default connect(mapStateToProps)(withRouter(Shop));