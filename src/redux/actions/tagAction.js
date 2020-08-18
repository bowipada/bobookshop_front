import {
    SET_TAGS,
    ADD_TAG,
    EDITING_TAG,
    CANCEL_ADD_TAG,
    CANCEL_EDIT_TAG,
    UPDATE_TAG,
    DELETE_TAG,
    CHANGE_TAG_NAME
  } from "../actionTypes";
  import Api from "../../api";
  
  const api = new Api();
  
  export const fetchTags = () => {
    return dispatch => {
      return api.getTag().then((res) => {
        if (res.data) {
          dispatch(setTags(res.data));
        }
      })
    }
  };
  
  export const createTag = (payload) => {
    return dispatch => {
      return api.createTag(payload).then((res) => {
        if (res.status === 200) {
          dispatch(fetchTags());
        }
      }, error => {
        dispatch(cancelAddTag());
      })
    }
  };
  
  export const updateTag = (item, index) => {
    return dispatch => {
      return api.updateTag(item).then((res) => {
        if (res.status === 200) {
          dispatch(updateItemTag({item, index}));
        }
      }, error => {
        dispatch(cancelEditTag());
      })
    }
  };
  
  export const deleteTag = (item, index) => {
    return dispatch => {
      return api.deleteTag(item.id).then((res) => {
        if (res.status === 200) {
          dispatch(deleteItemTag(index));
        }
      });
    }
  };
  
  
  export const setTags = payload => ({
    type: SET_TAGS,
    payload
  });
  
  export const addTag = payload => ({
    type: ADD_TAG,
    payload
  });
  
  export const cancelAddTag = () => ({
    type: CANCEL_ADD_TAG
  });
  
  export const editingTag = (index) => ({
    type: EDITING_TAG,
    index
  });
  
  export const cancelEditTag = (index) => ({
    type: CANCEL_EDIT_TAG,
    index
  });
  
  export const updateItemTag = (payload) => ({
    type: UPDATE_TAG,
    payload
  });
  
  export const deleteItemTag = (index) => ({
    type: DELETE_TAG,
    index
  });

  export const changeTagName = (payload) => ({
    type: CHANGE_TAG_NAME,
    payload
  });