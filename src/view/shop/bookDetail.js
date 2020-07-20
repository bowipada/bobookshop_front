import React from 'react';
import styled from 'styled-components';
import Api from "../../api";
import { withRouter } from "react-router-dom";
import imgBook from '../../assets/images/book.png';

const contentStyle = {
  height: "100%"
}

const BookName = styled.div`
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 10px;
`

const Detail = styled.div`
  text-indent: 30px;
`

const DetailWrap = styled.div`
  line-height: 24px;
`

const Price = styled.div`
  color: red;
  font-size: 20px;
`

const OriginalPrice = styled.div`
  color: #7f7f7f;
  text-decoration: line-through;
  color: #7f7f7f;
  font-size: 14px;
`

const ImgWrap = styled.div`
  width: 300px;
  float: left;
  @media (max-width: 425px) {
    width: 100%;
    height: 150px;
  }
`

const imgStyle = {
  maxHeight: "100%",
  maxWidth: "100%",
  margin: "auto",
  display: "block"
};

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
        if (res && res.data && res.data.length > 0) {
          console.log(res.data[0]);
          this.setState({ book: res.data[0] });
        }
      });
    }

  }

  render() {
    const book = this.state.book;
    let isDiscount = false;
    let originalPrice = 0;
    if (book.publisher && book.publisher.discount) {
      isDiscount = true;
      originalPrice = Math.round(book.price * (100 - book.publisher.discount.discountPercent) / 100);
    }
    return (
      <div className="content" style={contentStyle}>
        <ImgWrap>
          <img src={imgBook} style={imgStyle} alt={book.bookName} />
        </ImgWrap>
        <BookName>{book.bookName}</BookName>
        <DetailWrap>
          <div>Author {book.author}</div>
          <div>Publisher {book.publisher ? book.publisher.publisherName : ''}</div>
          {isDiscount && <OriginalPrice>{originalPrice}฿</OriginalPrice>}
          <Price>{book.price}฿</Price>
          <Detail>{book.detail}</Detail>
        </DetailWrap>
      </div>
    )
  }

}


export default withRouter(BookDetail);