const jwt = require("jsonwebtoken");
const ctx = require('./context');

const config = process.env;

const verifyToken = (req, res, next) => {

	const path = req.originalUrl;
	if (path.startsWith('/api/')) {
		if (!path.startsWith('/api/public')) {
			try {
				const token = req.headers["x-access-token"];
				if (!token) {
					// 401 Unauthorized 
					return res.status(401).send("A token is required for authentication");
				}
				const decoded = jwt.verify(token, ctx.cfg.key);
				req.user = decoded;
			}
			catch (err) {
				// 403 Forbidden
				return res.status(403).send("Invalid Token");
			}
		}
	}

	return next();
};



module.exports = verifyToken;