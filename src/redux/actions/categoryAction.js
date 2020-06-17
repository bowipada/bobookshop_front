import {
  SET_CATEGORIES,
  ADD_CATEGORY,
  CANCEL_ADD_CATEGORY,
  EDITING_CATEGORY,
  CANCEL_EDIT_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CHANGE_NAME_CATEGORY
} from "../actionTypes";
import Api from "../../api";

const api = new Api();

export const fetchCategory = (param = null) => {
  return dispatch => {
    return api.getCategory(param).then((res) => {
      if (res.data) {
        dispatch(setCategorys(res.data));
      }
    })
  }
};

export const createCategory = (payload) => {
  return dispatch => {
    return api.createCategory(payload).then((res) => {
      if (res.status === 200) {
        dispatch(updateItemCategory({item: res.data, index: 0}));
      }
    }, error => {
      dispatch(cancelAddCategory());
    })
  }
};

export const updateCategory = (item, index) => {
  return dispatch => {
    return api.updateCategory(item).then((res) => {
      if (res.status === 200) {
        dispatch(updateItemCategory({item, index}));
      }
    }, error => {
      dispatch(cancelEditCategory());
    })
  }
};

export const deleteCategory = (item, index) => {
  return dispatch => {
    return api.deleteCategory(item.id).then((res) => {
      if (res.status === 200) {
        dispatch(deleteItemCategory(index));
      }
    });
  }
};

export const setCategorys = payload => ({
  type: SET_CATEGORIES,
  payload
});

export const addCategory = (payload) => ({
  type: ADD_CATEGORY,
  payload
});

export const cancelAddCategory = () => ({
  type: CANCEL_ADD_CATEGORY
});

export const editingCategory = (index) => ({
  type: EDITING_CATEGORY,
  index
});

export const cancelEditCategory = (index) => ({
  type: CANCEL_EDIT_CATEGORY,
  index
});

export const changeNameCategory = (payload) => ({
  type: CHANGE_NAME_CATEGORY,
  payload
});

export const updateItemCategory = (payload) => ({
  type: UPDATE_CATEGORY,
  payload
});

export const deleteItemCategory = (index) => ({
  type: DELETE_CATEGORY,
  index
});