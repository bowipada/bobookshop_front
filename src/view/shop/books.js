import React from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { getBooksShop } from "../../redux/selectors";
// import { fetchPublishers } from "../redux/actions/publisherAction";
import { fetchCategoriesBooks, fetchBooks, fetchTagsBooks } from "../../redux/actions/bookAction";
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

const contentStyle = {
  height: "100%"
}

class Books extends React.Component {
  constructor() {
    super();
    this.discounts = {};
    this.state = {
      title: "",
      books: [],
      keyword: ""
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchDiscounts()).then(() => {
      this.props.discounts.forEach(item => {
        this.discounts["pub-" + item.publisherId] = item.discountPercent;

        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const categoryid = params.get('cate');
        const tagid = params.get('tag');
        let keyword = params.get('keyword');
        if (categoryid || tagid) {

          let fetchFunc = null;
          let fetchParam = null;
          if (categoryid) {
            fetchParam = { categoryid };
            fetchFunc = fetchCategoriesBooks;
          } else {
            fetchParam = { tagid };
            fetchFunc = fetchTagsBooks;
          }
          this.props.dispatch(fetchFunc(fetchParam)).then(() => {
            if (this.props.groups.length > 0) {
              if (categoryid) {
                this.setState({ title: this.props.groups[0].categoryName });
                this.setState({ books: this.props.groups[0].book_categories });
              } else {
                this.setState({ title: this.props.groups[0].tagName });
                this.setState({ books: this.props.groups[0].book_tags });
              }
            }
          });
        } else if (keyword) {
          this.onSearch(keyword);
        }
      });
    });
  }

  componentDidUpdate() {
    const search = "?" + window.location.href.split("?")[1];
    const params = new URLSearchParams(search);
    let keyword = params.get('keyword');
    if (keyword && keyword !== this.state.keyword) {
      this.onSearch(keyword);
    }
  }

  onSearch(txt) {
    const keyword = decodeURI(txt);
    this.setState({ keyword });
    console.log("onSearch", keyword)
    this.props.dispatch(fetchBooks(keyword)).then(() => {
      this.setState({ title: `result for "${keyword}"` });
      this.setState({ books: this.props.books });
    });
  }

  render() {
    return (
      <div className="content" style={contentStyle}>
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
    books: getBooksShop(state),
    groups: state.books.groups,
    discounts: state.discounts.items
  };
};

export default connect(mapStateToProps)(withRouter(Books));