// import { createStore } from "redux";
// import rootReducer from "./reducers";

// export default createStore(rootReducer);
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk))
);