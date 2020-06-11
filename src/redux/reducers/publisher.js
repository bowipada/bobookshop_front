import {
  SET_PUBLISHERS,
  ADD_PUBLISHER,
  CANCEL_ADD_PUBLISHER,
  EDITING_PUBLISHER,
  CANCEL_EDIT_PUBLISHER,
  CHANGE_NAME_PUBLISHER,
  UPDATE_PUBLISHER,
  DELETE_PUBLISHER
} from "../actionTypes";

const initialState = {
  items: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PUBLISHERS: {
      return { ...state, items: action.payload }
    }
    case ADD_PUBLISHER: {
      const items =  state.items.slice();
      items.splice(0, 0, { isAdd: true, publisherName: "" });
      return { ...state, items };
    }
    case CANCEL_ADD_PUBLISHER: {
      const items = state.items.slice();
      items.splice(0, 1);
      return { ...state, items};
    }
    case EDITING_PUBLISHER: {
      const items =  state.items.slice();
      items[action.index].isEdit = true;
      return { ...state, items };
    }
    case CANCEL_EDIT_PUBLISHER: {
      const items =  state.items.slice();
      items[action.index].isEdit = false;
      return { ...state, items };
    }
    case CHANGE_NAME_PUBLISHER: {
      const items =  state.items.slice();
      items[action.payload.index].publisherName = action.payload.name;
      return { ...state, items };
    }
    case UPDATE_PUBLISHER: {
      const items =  state.items.slice();
      items[action.payload.index] = {...action.payload.item, isEdit: false };
      return { ...state, items };
    }
    case DELETE_PUBLISHER: {
      const items =  state.items.slice();
      items.splice(action.index, 1);
      return { ...state, items };
    }
    default: {
      return state;
    }
  }
}