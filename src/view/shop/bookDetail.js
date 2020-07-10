import React from 'react';
// import styled from 'styled-components';
import Api from "../../api";
import { withRouter } from "react-router-dom";

class BookDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      book: {}
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      const api = new Api();
      api.getBookById(id).then((res) => {
        if (res &&  res.data && res.data.length > 0) {
          this.setState({ book: res.data[0] });
        }
      });
    }

  }

  render() {
    return (
      <div className="content">
        <div>{this.state.book.bookName}</div>
      </div>
    )
  }

}


export default withRouter(BookDetail);