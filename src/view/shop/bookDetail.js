import React from 'react';
import styled from 'styled-components';
import Api from "../../api";
import { withRouter } from "react-router-dom";
import imgBook from '../../assets/images/book.png';
import { Button } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect } from "react-redux";
import { setCart } from "../../redux/actions/bookAction";

const contentStyle = {
  height: "100%"
}

const BookName = styled.div`
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 10px;
`

const Detail = styled.div`
  text-indent: 50px;
`

const TopWrap = styled.div`
  overflow: hidden;
`

const Price = styled.div`
  color: red;
  font-size: 20px;
  display: inline-block;
  line-height: 32px;
  margin-bottom: 10px;
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

const Tag = styled.div`
  border: solid 1px red;
  color: red;
  font-size: 16px;
  line-height: 32px;
  padding: 0 10px;
  text-align: center;
  display: inline-block;
  margin-left: 10px;
`

const TextWrap = styled.div`
  float: right;
  width: calc(100% - 300px);
  line-height: 24px;
`

class BookDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      book: {}
    };
    this.onAddCart = this.onAddCart.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      const api = new Api();
      api.getBookById(id).then((res) => {
        if (res && res.data && res.data.length > 0) {
          this.setState({ book: res.data[0] });
        }
      });
    }

  }

  render() {
    const book = this.state.book;
    let isDiscount = false;
    let salePrice = book.price;
    let discount = 0;
    if (book.publisher && book.publisher.discount) {
      isDiscount = true;
      discount = book.publisher.discount.discountPercent;
      salePrice = Math.round(book.price * (100 - discount) / 100);
    }
    return (
      <div className="content" style={contentStyle}>
        <TopWrap>
          <ImgWrap>
            <img src={imgBook} style={imgStyle} alt={book.bookName} />
          </ImgWrap>
          <TextWrap>
            <BookName>{book.bookName}</BookName>
            <div>Author {book.author}</div>
            <div>Publisher {book.publisher ? book.publisher.publisherName : ''}</div>
            {isDiscount && <OriginalPrice>{book.price}฿</OriginalPrice>}
            <div>
              <Price>{salePrice}฿</Price>
              {isDiscount && <Tag>Sale {discount}%</Tag>}
            </div>
            <Button
              startIcon={<ShoppingCartIcon />}
              variant="contained"
              color="secondary"
              onClick={() => { this.onAddCart() }}> Add to cart</Button>
          </TextWrap>
        </TopWrap>
        <Detail>{book.detail}</Detail>
      </div>
    )
  }

  onAddCart() {
    let ids = [];
    const cart = sessionStorage.getItem("cart");
    if (cart != null) {
      ids = JSON.parse(cart);
    }
    if (ids.indexOf(this.state.book.id) === -1) {
      ids.push(this.state.book.id);
      sessionStorage.setItem("cart", JSON.stringify(ids));
      this.props.dispatch(setCart(ids.length));
    }
  }
}

const mapStateToProps = state => {
  return {
    cart: state.books.cart
  };
};

export default connect(mapStateToProps)(withRouter(BookDetail));