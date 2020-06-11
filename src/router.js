
import Login from "./view/login";
import Publisher from "./view/publisher";
import Discount from "./view/discount";
import Book from "./view/book";
import Shop from "./view/shop"

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
    path: "/shop",
    component: Shop,
  }
];
