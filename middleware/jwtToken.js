const jwt = require('jsonwebtoken');


exports.protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({ message: "Not authorized, no token provided."});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error) {
        console.log('Token verification failed: ', error.message);
        return res.status(401).json({ message: 'Not authorized, token failed. '})
    }
}
