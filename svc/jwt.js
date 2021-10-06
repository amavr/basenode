'use strict';

const jwt = require('jsonwebtoken');
const ctx = require('./context');

class jwtTool {

    static verify = (req, res, next) => {
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
                    if(decoded.type === "RT"){
                        
                    }
                    req.user = decoded;
                }
                catch (err) {
                    if (err.message === "jwt expired") {
                        return res.status(419).send("Invalid Token");
                    }
                    else {
                        // 403 Forbidden
                        return res.status(403).send("Invalid Token");
                    }
                }
            }
        }

        return next();
    };

    static refresh = (RT) => {
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
            if (err.message === "jwt expired") {
                return res.status(419).send("Invalid Token");
            }
            else {
                // 403 Forbidden
                return res.status(403).send("Invalid Token");
            }
        }

        return next();
    };

    static generate(dataAT, dataRT) {
        dataAT.exp = Math.floor(Date.now() / 1000) + ctx.cfg.expire;
        dataAT.type = "AT";
        dataRT.type = "RT";
        return {
            at: jwt.sign(dataAT, ctx.cfg.key),
            rt: jwt.sign(dataRT, ctx.cfg.key),
        }
    }

}

module.exports = jwtTool;