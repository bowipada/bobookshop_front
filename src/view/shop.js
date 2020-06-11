import React from 'react';
import { connect } from "react-redux";
import { fetchPublishers } from "../redux/actions/publisherAction";
import { fetchBooks } from "../redux/actions/bookAction";

import imgbookHeader from '../assets/images/bookstack.png';
// import imgBook from '../assets/images/book.png'

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

}
class Shop extends React.Component {

  componentDidMount() {
    // this.props.dispatch(fetchBooks());
    // this.props.dispatch(fetchPublishers("publisherName"));
  }

  render() {
    return (
      <div className="container">
        <div style={headerStyle}><div style={imgbookHeaderStyle}></div>Bo's Bookshop</div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    publishers: state.publishers.items,
    books: state.books.items
  };
};

export default connect(mapStateToProps)(Shop);