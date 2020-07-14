import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { fetchPublishers } from "../../redux/actions/publisherAction";
import { fetchCategoriesBooks } from "../../redux/actions/bookAction";
import { fetchDiscounts } from "../../redux/actions/discountAction";
import { withRouter } from "react-router-dom";

import BookGroup from "./bookGroup";

const CateName = styled.div`
color: #009688;
font-size: 20px;
line-height: 20px;
font-weight: bold;
border-bottom: solid 2px #009688;
margin-bottom: 10px;
`

const LinkViewAll = styled.div`
  float: right;
  cursor: pointer;
  text-decoration: underline;
  color: #009688;
  font-size: 16px;
  font-weight: normal;
`

const cateWrap = {
  padding: "10px"
};

class ShopHome extends React.Component {
  constructor() {
    super();
    this.discounts = {};
  }

  componentDidMount() {
    this.props.dispatch(fetchDiscounts()).then(() => {
      this.props.discounts.forEach(item => {
        this.discounts["pub-" + item.publisherId] = item.discountPercent;
      });
    });
    this.props.dispatch(fetchPublishers("publisherName"));
    this.props.dispatch(fetchCategoriesBooks({ limit: 8 }));
  }

  viewAll(cateId) {
    this.props.history.push('/shop/books?cate='+cateId);
  }

  render() {
    return (
      <div className="content">
        {
          this.props.categories.map(cate => {
            return (
              <div key={cate.id} style={cateWrap}>
                <CateName>{cate.categoryName}
                  <LinkViewAll onClick={() => this.viewAll(cate.id)}>View all</LinkViewAll>
                </CateName>
                <BookGroup books={cate.book_categories} discounts={this.discounts}></BookGroup>
              </div>
            )
          })
        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    publishers: state.publishers.items,
    books: state.books.items,
    categories: state.books.categories,
    discounts: state.discounts.items
  };
};

export default connect(mapStateToProps)(withRouter(ShopHome));