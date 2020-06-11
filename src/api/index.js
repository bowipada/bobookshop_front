import Axios from "axios";

class API {
  apiUrl = process.env.REACT_APP_API_URL;
  constructor() {
    Axios.defaults.headers.post['Content-Type'] = 'application/json';

  }

  get header() {
    let token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: "Bearer " + token
      }
    }
  }

  post(url, body, isAddHeader = true) {
    if (isAddHeader) {
      return Axios.post(`${this.apiUrl}/${url}`, body, this.header);

    } else {
      return Axios.post(`${this.apiUrl}/${url}`, body);

    }
  }

  get(url) {
    return Axios.get(`${this.apiUrl}/${url}`, this.header);
  }

  put(url, body) {
    return Axios.put(`${this.apiUrl}/${url}`, body, this.header);
  }

  delete(url) {
    return Axios.delete(`${this.apiUrl}/${url}`, this.header);
  }

  login(body) {
    return this.post("auth", body, false)
  }

  refreshToken() {
    return this.put("auth", null);
  }

  // publishers
  createPublisher(data) {
    return this.post("publishers", data);
  }

  updatePublisher(data) {
    return this.put("publishers", data);
  }

  deletePublisher(id) {
    return this.delete("publishers/" + id);
  }

  getPublisher(param = null) {
    let order = "";
    if (param) {
      order = `?order=${param}`
    }
    return this.get("publishers" + order);
  }

  // discount
  createDiscount(data) {
    return this.post("discounts", data);
  }

  updateDiscount(data) {
    return this.put("discounts", data);
  }

  deleteDiscount(id) {
    return this.delete("discounts/" + id);
  }

  getDiscount() {
    return this.get("discounts");
  }

  // book
  getBook(keyword = "") {
    let path = "books";
    if (keyword) {
      path += `?keyword=${keyword}`
    }
    return this.get(path);
  }

  createBook(data) {
    return this.post("books", data);
  }

  updateBook(data) {
    return this.put("books", data);
  }

  deleteBook(id) {
    return this.delete("books/" + id);
  }

}

export default API;