import {
    SET_BOOKS,
    ADD_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK
  } from "../actionTypes";
  
  const initialState = {
    items: []
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
      default: {
        return state;
      }
    }
  }