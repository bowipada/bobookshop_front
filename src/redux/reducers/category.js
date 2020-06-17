import {
  SET_CATEGORIES,
  ADD_CATEGORY,
  CANCEL_ADD_CATEGORY,
  EDITING_CATEGORY,
  CANCEL_EDIT_CATEGORY,
  CHANGE_NAME_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from "../actionTypes";

const initialState = {
  items: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES: {
      return { ...state, items: action.payload }
    }
    case ADD_CATEGORY: {
      const items =  state.items.slice();
      items.splice(0, 0, { isAdd: true, categoryName: "" });
      return { ...state, items };
    }
    case CANCEL_ADD_CATEGORY: {
      const items = state.items.slice();
      items.splice(0, 1);
      return { ...state, items};
    }
    case EDITING_CATEGORY: {
      const items =  state.items.slice();
      items[action.index].isEdit = true;
      return { ...state, items };
    }
    case CANCEL_EDIT_CATEGORY: {
      const items =  state.items.slice();
      items[action.index].isEdit = false;
      return { ...state, items };
    }
    case CHANGE_NAME_CATEGORY: {
      const items =  state.items.slice();
      items[action.payload.index].categoryName = action.payload.name;
      return { ...state, items };
    }
    case UPDATE_CATEGORY: {
      const items =  state.items.slice();
      items[action.payload.index] = {...action.payload.item, isEdit: false };
      return { ...state, items };
    }
    case DELETE_CATEGORY: {
      const items =  state.items.slice();
      items.splice(action.index, 1);
      return { ...state, items };
    }
    default: {
      return state;
    }
  }
}