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

const initialState = {
  items: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DISCOUNTS: {
      return { ...state, items: action.payload }
    }
    case ADD_DISCOUNT: {
      const items =  state.items.slice();
      items.splice(0, 0, { isAdd: true, publisherId: "", discountPercent: "" });
      return { ...state, items };
    }
    case CANCEL_ADD_DISCOUNT: {
      const items = state.items.slice();
      items.splice(0, 1);
      return { ...state, items};
    }
    case EDITING_DISCOUNT: {
      const items =  state.items.slice();
      items[action.index].isEdit = true;
      return { ...state, items };
    }
    case CANCEL_EDIT_DISCOUNT: {
      const items =  state.items.slice();
      items[action.index].isEdit = false;
      return { ...state, items };
    }
    case CHANGE_PERCENT_DISCOUNT: {
      const items =  state.items.slice();
      items[action.payload.index].discountPercent = action.payload.discountPercent;
      return { ...state, items };
    }
    case CHANGE_PUBLISHER_DISCOUNT: {
      const items =  state.items.slice();
      items[action.payload.index].publisherId = action.payload.publisherId;
      return { ...state, items };
    }
    case UPDATE_DISCOUNT: {
      const items =  state.items.slice();
      items[action.payload.index] = {...action.payload.item, isEdit: false };
      return { ...state, items };
    }
    case DELETE_DISCOUNT: {
      const items =  state.items.slice();
      items.splice(action.index, 1);
      return { ...state, items };
    }
    default:
      return state;
  }
}