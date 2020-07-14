import React from 'react';
import { Input, Box, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
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
  textDecoration: "none"
};

class Shop extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: ""
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

  render() {
    return (
      <div className="container">
        <Router>
          <div style={headerStyle}><div style={imgbookHeaderStyle}></div>
            <Link to="/shop" style={linkStyle}>Bo's Bookshop</Link>
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
            {/* <Input
              value={this.state.keyword}
              onChange={this.onKeywordChange}
              onKeyDown={this.onKeyDown}
              fullWidth={true}
              placeholder="Search"
            /> */}
          </div>
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
export default (withRouter(Shop));