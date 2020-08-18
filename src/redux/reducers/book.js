import {
    SET_BOOKS,
    ADD_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
    SET_GROUPS_BOOKS,
    SET_CART
  } from "../actionTypes";
  
  const initialState = {
    items: [],
    groups: [],
    cart: 0
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case SET_BOOKS: {
        return { ...state, items: action.payload }
      }
      case ADD_BOOK: {
        const items =  state.items.slice();
        items.splice(0, 0, action.paylaod);
        return { ...state, items };
      }
      case UPDATE_BOOK: {
        const items =  state.items.slice();
        items[action.payload.index] = {...action.payload.item };
        return { ...state, items };
      }
      case DELETE_BOOK: {
        const items =  state.items.slice();
        items.splice(action.index, 1);
        return { ...state, items };
      }
      case SET_GROUPS_BOOKS: {
        return { ...state, groups: action.groups };
      }
      case SET_CART: {
        return { ...state, cart: action.cart };
      }
      default: {
        return state;
      }
    }
  }