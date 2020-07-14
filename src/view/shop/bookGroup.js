import React from 'react';
import BookItem from "./bookItem";
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`

class BookGroup extends React.Component {
  render() {
    return (
      <Wrap>
        {
          this.props.books.map(item => {
            let discount = item.book.discountPercent;
            if (!discount) {
              discount = this.props.discounts["pub-" + item.book.publisherId];
            }
            return (
              <BookItem book={item.book} key={item.bookId} discount={discount} />
            )
          })
        }
      </Wrap>
    )
  }

}

export default BookGroup;