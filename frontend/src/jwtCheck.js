import jwt from 'jsonwebtoken';

export function isAuth(token) {
    if (!token) {
        return false;
    }
    try {
        let decoded = jwt.verify(token.accessToken, process.env.REACT_APP_JWT_SECRET);
        return true;
    } catch (err) {
        console.log(err);
        localStorage.clear();
        return false;
    }
}

export function getNickName(token) {
    return jwt.verify(token.accessToken, process.env.REACT_APP_JWT_SECRET).iss;
}