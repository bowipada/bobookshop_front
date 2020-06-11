export const getUser = store => store.user.username;

export const getAvatar = store => {
    if (store.user.username) {
        return store.user.username.slice(0, 1).toUpperCase();
    }
    return "";
}
