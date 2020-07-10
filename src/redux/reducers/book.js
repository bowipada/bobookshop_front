import {
    SET_BOOKS,
    ADD_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
    SET_CATEGORIES_BOOKS
  } from "../actionTypes";
  
  const initialState = {
    items: [],
    categories: []
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
      case SET_CATEGORIES_BOOKS: {
        return { ...state, categories: action.categories };
      }
      default: {
        return state;
      }
    }
  }