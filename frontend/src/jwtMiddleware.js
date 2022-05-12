import jwt from 'jsonwebtoken';

function jwtMiddleware() {
    const token = localStorage.getItem('accessToken');

    // 토큰이 없는경우, 토큰 검증이 성공한 경우(try), 검증이 실패한 경우(catch)
    
    if (!token) {
        alert('토큰이 없습니다.')
        return;
    }

    let decoded = jwt.decode(token);
    console.log(decoded);
    
    let verify = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verify);
};

export default jwtMiddleware;

// const getUserInfo = () => {
//     return axios.get(API_URL + "user", { headers: authHeader() });
// };

// const isAdmin = () => {
//     return axios.get(API_URL + "admin", { headers: authHeader() });
// };