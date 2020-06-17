import { combineReducers } from "redux";
import user from "./user";
import publishers from "./publisher";
import discounts from "./discount";
import books from "./book";
import categories from "./category";

export default combineReducers({ user, publishers, discounts, books, categories });
