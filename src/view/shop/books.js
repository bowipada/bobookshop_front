import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
// import { fetchPublishers } from "../redux/actions/publisherAction";
import { fetchCategoriesBooks } from "../../redux/actions/bookAction";
import { fetchDiscounts } from "../../redux/actions/discountAction";
import BookGroup from "./bookGroup";
import { withRouter } from "react-router-dom";


// const cateBookWrap = {
//   display: "flex",
//   justifyContent: "space-between",
//   flexWrap: "wrap"
// };
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0;
  color: #009688;
`

class Books extends React.Component {
  constructor() {
    super();
    this.discounts = {};
    this.state = {
      title: "",
      books: []
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchDiscounts()).then(() => {
      this.props.discounts.forEach(item => {
        this.discounts["pub-" + item.publisherId] = item.discountPercent;
      });
    });

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const cate = params.get('cate');
    if (cate) {
      this.props.dispatch(fetchCategoriesBooks({ categoryid: cate })).then(() => {
        if (this.props.categories.length > 0) {
          
          this.setState({ title : this.props.categories[0].categoryName});
          this.setState({ books : this.props.categories[0].book_categories});
        }
      });
    }

  }

  render() {
    return (
      <div className="content">
        <Title>{this.state.title}</Title>
        <div>
          {
            <BookGroup books={this.state.books} discounts={this.discounts}></BookGroup>
          }
        </div>
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

export default connect(mapStateToProps)(withRouter(Books));