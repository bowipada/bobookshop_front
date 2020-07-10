
import Login from "./view/login";
import Publisher from "./view/publisher";
import Discount from "./view/discount";
import Book from "./view/book";
import Shop from "./view/shop/shop"
import Category from "./view/category";

export const routes = [
  {
    path: "/",
    component: Login,
    exact: true
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/publisher",
    component: Publisher
  },
  {
    path: "/discount",
    component: Discount
  },
  {
    path: "/book",
    component: Book
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/shop",
    component: Shop,
  }
];
