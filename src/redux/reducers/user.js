import { SET_USER, CLEAR_USER } from "../actionTypes";

const initialState = { username: "" };

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_USER: {
      localStorage.setItem("token", action.payload.token);
      return { ...state, username: action.payload.username };
    }
    case CLEAR_USER: {
      return { ...state, username: "" };
    }
    default: {
      return state;
    }
  }
}