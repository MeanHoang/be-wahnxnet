const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Lấy token từ header
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('No token provided.');
    }

    // Kiểm tra tính hợp lệ của token
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).send('Failed to authenticate token.');
        }

        // Lưu thông tin người dùng vào request để dùng ở các route sau
        req.userId = decoded.id;
        next(); // Tiếp tục đến route tiếp theo
    });
};

module.exports = authMiddleware;
