const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    // Kiểm tra nếu token có trong header
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Format "Bearer TOKEN"
        console.log(token)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRECT, (err, user) => {
           
            if (err) return res.sendStatus(403); // Token không hợp lệ
            req.user = user; // Gắn thông tin user vào req để dùng rout sau
            
            if (req.user.role !== 'teacher') { // Kiểm tra vai trò
                return res.status(403).json({ message: 'Access forbidden: Teachers only' });
            }
            next();
        });
    } else { 
        res.sendStatus(403); // Không có token trong header
    }
};

module.exports = authenticateJWT;