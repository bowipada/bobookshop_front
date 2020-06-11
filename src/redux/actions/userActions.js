import { SET_USER, CLEAR_USER } from "../actionTypes";
import Api from "../../api";
export const setUser = payload => ({
  type: SET_USER,
  payload
});

export const clearUser = () => ({
  type: CLEAR_USER
});

export const refreshToken = () => {
  return dispatch => {
    const api = new Api();
    return api.refreshToken().then((res) => {
      if (res.status === 200 && res.data.token) {
        dispatch(setUser(res.data));
      }
    }, err => {
      localStorage.clear();
    });
  };
}