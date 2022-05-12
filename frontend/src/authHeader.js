export default function authHeader() {

    let accessToken = JSON.parse(localStorage.getItem('accessToken'));

    if (accessToken && accessToken) {
        return { Authorization: 'Bearer ' + accessToken };
    } else {
        return {};
    }
}