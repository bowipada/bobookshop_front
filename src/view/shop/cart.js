import React from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import Api from "../../api";
import {
  IconButton,
  TextField
} from '@material-ui/core';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { connect } from "react-redux";
import { setCart } from "../../redux/actions/bookAction";

const HeaderRow = styled.div`
  border-top: solid 2px #009688; 
  border-bottom: solid 2px #009688;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  text-align: center;
  padding: 5px;
  margin: 5px 0;
`
const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: solid 1px #ccc;
  padding: 5px;
  margin-bottom: 10px;
`
const Price = styled.div`
  width: 120px;
  text-align: right;
  padding: 0 10px;
`

const BookName = styled.div`
  flex: 2;
  @media (max-width: 425px) {
    flex-basis: 100%;
  }
`

const inputStyle = {
  width: "50px"
}

const Total = styled.div`
  font-size: 18px;
  width: 120px;
  text-align: right;
  padding: 0 10px;
`

const ItemWrap =  styled.div`
  width: 120px;
  padding: 0 10px;
`

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      books: []
    }
  }

  onRemove(index) {
    const books = this.state.books.slice();
    books[index].quantity -= 1;
    if (books[index].quantity === 0) {
      books.splice(index, 1);
      const cart = sessionStorage.getItem("cart");
      let ids = [];
      if (cart != null) {
        ids = JSON.parse(cart);
        ids.splice(ids.indexOf(books.id));
        sessionStorage.setItem("cart", JSON.stringify(ids));
        this.props.dispatch(setCart(ids.length));
      }
    }
    this.setState({ books });
  }

  onAdd(index) {
    const books = this.state.books.slice();
    books[index].quantity += 1;
    this.setState({ books })
  }

  onInputQuantiy(event, index) {
    const quantity = event.target.value ? +event.target.value : 0;
    const books = this.state.books.slice();
    books[index].quantity = quantity;
    this.setState({ books })
  }

  render() {
    let total = 0;
    return (
      <div className="content h100">
        <HeaderRow>
          <BookName>Book Name</BookName>
          <ItemWrap>Unit Price</ItemWrap>
          <ItemWrap>Quantity</ItemWrap>
          <ItemWrap>Subtotal</ItemWrap>
        </HeaderRow>
        {
          this.state.books.map((book, i) => {
            let unitPrice = book.price;
            if (book.publisher && book.publisher.discount) {
              unitPrice = Math.round(book.price * (100 - book.publisher.discount.discountPercent) / 100);
            }
            let subTotal = (unitPrice *  book.quantity);
            total += subTotal;
            return (
              <Wrap key={book.id}>
                <BookName>{book.bookName}</BookName>
                <Price>{unitPrice}</Price>
                <ItemWrap>
                  <IconButton
                    size="small"
                    onClick={() => this.onRemove(i)}>
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    label=""
                    size="small"
                    variant="outlined"
                    style={inputStyle}
                    value={book.quantity}
                    onChange={(event) => this.onInputQuantiy(event, i)} />
                  <IconButton
                    size="small"
                    onClick={() => this.onAdd(i)}>
                    <AddIcon />
                  </IconButton>
                </ItemWrap>
                <Price>{this.numFormat(subTotal)}</Price>
              </Wrap>
            )
          })
        }
        <Wrap>
          <BookName>Total</BookName>
          <Price></Price>
          <ItemWrap></ItemWrap>
          <Total>{this.numFormat(total)}</Total>
        </Wrap>
      </div>
    )
  }

  numFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  componentDidMount() {
    this.getBook();
  }

  getBook() {
    const cart = sessionStorage.getItem("cart");
    if (cart) {
      const ids = JSON.parse(cart);
      const api = new Api();
      const promise = ids.map(async (id) => {
        const res = await api.getBookById(id);
        if (res.data && res.data.length > 0) {
          return { ...res.data[0], quantity: 1 };
        }
        return {};
      });
      Promise.all(promise).then(books => {
        this.setState({ books });
        console.log(this.state)
      });
    }
  }
}

const mapStateToProps = state => {
  return {
    cart: state.books.cart
  };
};

export default connect(mapStateToProps)(withRouter(Cart));