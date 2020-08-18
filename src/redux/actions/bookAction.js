import {
    SET_BOOKS,
    ADD_BOOK,
    UPDATE_BOOK,
    DELETE_BOOK,
    SET_GROUPS_BOOKS,
    SET_CART
  } from "../actionTypes";
  import Api from "../../api";
  
  const api = new Api();
  
  export const fetchBooks = (param = null) => {
    return dispatch => {
      return api.getBook(param).then((res) => {
        if (res.data) {
          dispatch(setBooks(res.data));
        } else {
          dispatch(setBooks([]));
        }
      })
    }
  };

  export const saveBookCategories = (categories, bookId) => {
    return dispatch => {
      return api.saveBookCategories({bookId, categories}).then((res) => {
        if (res.status === 200) {
          dispatch(fetchBooks());
        }
      });
    }
  };

  export const saveBookTags = (tags, bookId) => {
    return dispatch => {
      return api.saveBookTags({bookId, tags}).then((res) => {
        if (res.status === 200) {
          dispatch(fetchBooks());
        }
      });
    }
  };
  
  export const createBook = (payload) => {
    return dispatch => {
      return api.createBook(payload).then((res) => {
        if (res.status === 200) {
          dispatch(fetchBooks());
          return res.data;
        }
      })
    }
  };
  
  export const updateBook = (item, index) => {
    return dispatch => {
      return api.updateBook(item).then((res) => {
        if (res.status === 200) {
          dispatch(updateItemBook({item, index}));
        }
      })
    }
  };
  
  export const deleteBook = (item, index) => {
    return dispatch => {
      return api.deleteBook(item.id).then((res) => {
        if (res.status === 200) {
          dispatch(deleteItemBook(index));
        }
      });
    }
  };
  
  export const fetchCategoriesBooks = (param = null) => {
    return dispatch => {
      return api.getCategoriesBooks(param).then((res) => {
        if (res.data) {
          dispatch(setGroupsBook(res.data));
        } else {
          dispatch(setGroupsBook([]));
        }
      });
    }
  };

  export const fetchTagsBooks = (param = null) => {
    return dispatch => {
      return api.getTagsBooks(param).then((res) => {
        if (res.data) {
          dispatch(setGroupsBook(res.data));
        } else {
          dispatch(setGroupsBook([]));
        }
      });
    }
  };

  export const setBooks = payload => ({
    type: SET_BOOKS,
    payload
  });
  
  export const addBook = (payload) => ({
    type: ADD_BOOK,
    payload
  });

  export const updateItemBook = (payload) => ({
    type: UPDATE_BOOK,
    payload
  });
  
  export const deleteItemBook = (index) => ({
    type: DELETE_BOOK,
    index
  });

  export const setGroupsBook = (groups) => ({
    type: SET_GROUPS_BOOKS,
    groups
  });

  export const setCart = (cart) => ({
    type: SET_CART,
    cart
  });