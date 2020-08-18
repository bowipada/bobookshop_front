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

const initialState = {
  items: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TAGS: {
      return { ...state, items: action.payload }
    }
    case ADD_TAG: {
      const items =  state.items.slice();
      items.splice(0, 0, { isAdd: true, tagName: "" });
      return { ...state, items };
    }
    case CANCEL_ADD_TAG: {
      const items = state.items.slice();
      items.splice(0, 1);
      return { ...state, items};
    }
    case EDITING_TAG: {
      const items =  state.items.slice();
      items[action.index].isEdit = true;
      return { ...state, items };
    }
    case CANCEL_EDIT_TAG: {
      const items =  state.items.slice();
      items[action.index].isEdit = false;
      return { ...state, items };
    }
    case CHANGE_TAG_NAME: {
      const items =  state.items.slice();
      items[action.payload.index].tagName = action.payload.tagName;
      return { ...state, items };
    }
    case UPDATE_TAG: {
      const items =  state.items.slice();
      items[action.payload.index] = {...action.payload.item, isEdit: false };
      return { ...state, items };
    }
    case DELETE_TAG: {
      const items =  state.items.slice();
      items.splice(action.index, 1);
      return { ...state, items };
    }
    default:
      return state;
  }
}