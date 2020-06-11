import {
  SET_DISCOUNTS,
  ADD_DISCOUNT,
  EDITING_DISCOUNT,
  CANCEL_ADD_DISCOUNT,
  CANCEL_EDIT_DISCOUNT,
  UPDATE_DISCOUNT,
  DELETE_DISCOUNT,
  CHANGE_PERCENT_DISCOUNT,
  CHANGE_PUBLISHER_DISCOUNT
} from "../actionTypes";
import Api from "../../api";

const api = new Api();

export const fetchDiscounts = () => {
  return dispatch => {
    return api.getDiscount().then((res) => {
      if (res.data) {
        dispatch(setDiscounts(res.data));
      }
    })
  }
};

export const createDiscount = (payload) => {
  return dispatch => {
    return api.createDiscount(payload).then((res) => {
      if (res.status === 200) {
        dispatch(fetchDiscounts());
      }
    }, error => {
      dispatch(cancelAddDiscount());
    })
  }
};

export const updateDiscount = (item, index) => {
  return dispatch => {
    return api.updateDiscount(item).then((res) => {
      if (res.status === 200) {
        dispatch(updateItemDiscount({item, index}));
      }
    }, error => {
      dispatch(cancelEditDiscount());
    })
  }
};

export const deleteDiscount = (item, index) => {
  return dispatch => {
    return api.deleteDiscount(item.id).then((res) => {
      if (res.status === 200) {
        dispatch(deleteItemDiscount(index));
      }
    });
  }
};


export const setDiscounts = payload => ({
  type: SET_DISCOUNTS,
  payload
});

export const addDiscount = (payload) => ({
  type: ADD_DISCOUNT,
  payload
});

export const cancelAddDiscount = () => ({
  type: CANCEL_ADD_DISCOUNT
});

export const editingDiscount = (index) => ({
  type: EDITING_DISCOUNT,
  index
});

export const cancelEditDiscount = (index) => ({
  type: CANCEL_EDIT_DISCOUNT,
  index
});

export const changePercentDiscount = (payload) => ({
  type: CHANGE_PERCENT_DISCOUNT,
  payload
});

export const changePublisherDiscount = (payload) => ({
  type: CHANGE_PUBLISHER_DISCOUNT,
  payload
});

export const updateItemDiscount = (payload) => ({
  type: UPDATE_DISCOUNT,
  payload
});

export const deleteItemDiscount = (index) => ({
  type: DELETE_DISCOUNT,
  index
});