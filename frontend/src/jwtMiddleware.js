import jwt from 'jsonwebtoken';

const jwtMiddleware = () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        alert('토큰이 없습니다.')
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

    } catch (error) {
        // 토큰 검증 실패
        console.log(error);
        return;
    }
};

export default jwtMiddleware;

// const getUserInfo = () => {
//     return axios.get(API_URL + "user", { headers: authHeader() });
// };

// const isAdmin = () => {
//     return axios.get(API_URL + "admin", { headers: authHeader() });
// };