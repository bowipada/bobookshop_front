import {
  SET_PUBLISHERS,
  ADD_PUBLISHER,
  CANCEL_ADD_PUBLISHER,
  EDITING_PUBLISHER,
  CANCEL_EDIT_PUBLISHER,
  UPDATE_PUBLISHER,
  DELETE_PUBLISHER,
  CHANGE_NAME_PUBLISHER
} from "../actionTypes";
import Api from "../../api";

const api = new Api();

export const fetchPublishers = (param = null) => {
  return dispatch => {
    return api.getPublisher(param).then((res) => {
      if (res.data) {
        dispatch(setPublishers(res.data));
      }
    })
  }
};

export const createPublisher = (payload) => {
  return dispatch => {
    return api.createPublisher(payload).then((res) => {
      if (res.status === 200) {
        dispatch(updateItemPublisher({item: res.data, index: 0}));
      }
    }, error => {
      dispatch(cancelAddPublisher());
    })
  }
};

export const updatePublisher = (item, index) => {
  return dispatch => {
    return api.updatePublisher(item).then((res) => {
      if (res.status === 200) {
        dispatch(updateItemPublisher({item, index}));
      }
    }, error => {
      dispatch(cancelEditPublisher());
    })
  }
};

export const deletePublisher = (item, index) => {
  return dispatch => {
    return api.deletePublisher(item.id).then((res) => {
      if (res.status === 200) {
        dispatch(deleteItemPublisher(index));
      }
    });
  }
};


export const setPublishers = payload => ({
  type: SET_PUBLISHERS,
  payload
});

export const addPublisher = (payload) => ({
  type: ADD_PUBLISHER,
  payload
});

export const cancelAddPublisher = () => ({
  type: CANCEL_ADD_PUBLISHER
});

export const editingPublisher = (index) => ({
  type: EDITING_PUBLISHER,
  index
});

export const cancelEditPublisher = (index) => ({
  type: CANCEL_EDIT_PUBLISHER,
  index
});

export const changeNamePublisher = (payload) => ({
  type: CHANGE_NAME_PUBLISHER,
  payload
});

export const updateItemPublisher = (payload) => ({
  type: UPDATE_PUBLISHER,
  payload
});

export const deleteItemPublisher = (index) => ({
  type: DELETE_PUBLISHER,
  index
});