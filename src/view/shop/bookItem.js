import React from "react";
import styled from 'styled-components';
import imgBook from '../../assets/images/book.png';


const BookWrap = styled.div`
  width: 23.5%;
  
  border: solid 1px #ccc;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  box-sizing: border-box;
  position: relative;
  margin-right: 2%;
  &:nth-child(4n){
    margin-right: 0;
  }
  @media (max-width: 1000px) {
    width: 49%;
    &:nth-child(2n){
      margin-right: 0;
    }s
  }
  @media (max-width: 425px) {
    width: 100%;
    margin-right: 0;
    flex-direction: column;
    justify-content: center;
  }
`

const ImgWrap = styled.div`
  width: 120px;
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

const TextWrap = styled.div`
  line-height: 24px;
  position: relative;
`
const Price = styled.div`
  color: red;
  @media (min-width: 426px) {
    position: absolute;
    bottom: 0;
  }
  @media (max-width: 425px) {
    float: right;
    margin-top: -46px;
  }
`

const BookName = styled.div`
  font-size: 18px;
  line-height: 20px;
`

const Author = styled.div`
  font-size: 14px;
  line-height: 18px;
`

const Tag = styled.div`
  background: red;
  color: #fff;
  width: 50px;
  line-height: 22px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  &:after {
    position: absolute;
    right: -11px;
    top: 0;
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 11px 11px 0 0;
    border-color: red transparent transparent transparent;
  }
  &:before {
    position: absolute;
    right: -11px;
    bottom: 0;
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 11px 0 0 11px;
    border-color: transparent transparent transparent red;
  }
`


function BookItem(props) {
  let priceDiscount = 0;
  let isDisCount = false;
  if (props.discount) {
    isDisCount = true;
    priceDiscount = Math.round(props.book.price * (100 - props.discount) / 100);
  }
  return (
    <BookWrap>
      {isDisCount && <Tag>-{props.discount}%</Tag>}
      <ImgWrap>
        <img src={imgBook} style={imgStyle} alt={props.book.bookName} />
      </ImgWrap>
      <TextWrap>
        <BookName>{props.book.bookName}</BookName>
        <Author>{props.book.author}</Author>
        {!isDisCount && <Price>{props.book.price}฿</Price>}
        {isDisCount && <Price>{priceDiscount}฿</Price>}
      </TextWrap>
    </BookWrap>
  );
}

export default BookItem;