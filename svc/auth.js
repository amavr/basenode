const jwt = require("jsonwebtoken");
const ctx = require('./context');

const config = process.env;

const verifyToken = (req, res, next) => {

	const path = req.originalUrl;
	if (path.startsWith('/api/')) {
		if (!path.startsWith('/api/public')) {
			try {
				const token = req.body.token || req.query.token || req.headers["x-access-token"];
				if (!token) {
					return res.status(403).send("A token is required for authentication");
				}
			}
			catch (err) {
				return res.status(401).send("A token is required for authentication");
			}

			try {
				const decoded = jwt.verify(token, ctx.cfg.key);
				req.user = decoded;
			}
			catch (err) {
				return res.status(401).send("Invalid Token");
			}
		}
	}

	return next();
};

module.exports = verifyToken;