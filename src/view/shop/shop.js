import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ShopHome from "./shopHome";
import Books from "./books";
import BookDetail from "./bookDetail";

import imgbookHeader from '../../assets/images/bookstack.png';

const headerStyle = {
  fontWeight: "bold",
  fontFamily: 'Dancing Script',
  fontSize: "32px",
  color: "#fff",
  lineGHeight: "50px",
  height: "50px",
  padding: "0 20px",
  background: "#009688"
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


class Shop extends React.Component {
  render() {
    return (
      <div className="container">
        <div style={headerStyle}><div style={imgbookHeaderStyle}></div>Bo's Bookshop</div>
        <Router>
          <Switch>
            <Route path={`/shop/books`} component={Books} />
            <Route path={`/shop/book/:id`} component={BookDetail} />
            <Route path={`/shop`} component={ShopHome} />
          </Switch>
        </Router>
      </div>
    )
  }

}

export default Shop;