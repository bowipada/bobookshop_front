export const getUser = store => store.user.username;

export const getAvatar = store => {
    if (store.user.username) {
        return store.user.username.slice(0, 1).toUpperCase();
    }
    return "";
}


export const getBooksShop =  store => {
    if (store.books.items) {
        const books = store.books.items.map(book => {
            let discountPercent = 0;
            if (book.publisher && book.publisher.discount) {
              discountPercent = book.publisher.discount.discountPercent;
            }
            return { book: {...book, discountPercent}, bookId: book.id };
          });
        return books;
    }
    return []
}