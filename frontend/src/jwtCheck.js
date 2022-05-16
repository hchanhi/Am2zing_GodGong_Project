import jwt from 'jsonwebtoken';

export function isAuth(token) {
    
    if (!token) {
        return false;
    }
    try {
        let decoded = jwt.verify(token.accessToken, process.env.REACT_APP_JWT_SECRET);
        return decoded;
    } catch (err) {
        console.log(err);
        localStorage.clear();
        return false;
    }
}

export function getNickName(token) {

    if (!token) {
        return;
    }
    return jwt.verify(token.accessToken, process.env.REACT_APP_JWT_SECRET).iss;
}

export function getId(token) {

    if (!token) {
        return;
    }
    return jwt.verify(token.accessToken, process.env.REACT_APP_JWT_SECRET).sub;
}