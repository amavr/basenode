'use strict';

const express = require('express');
const app = express();

const ctx = require('./svc/context');
// const auth = require('./svc/auth');
const api_pub = require('./api/public');
const api_pri = require('./api/private');
const jwt = require('./svc/jwt');

const ofs = 10;
console.log("".padEnd(32, '='));
console.log("Platform:".padStart(ofs), process.platform);
console.log("Version:".padStart(ofs), process.version);
console.log("Arch:".padStart(ofs), process.arch);
// console.log("OracleDB:".padStart(ofs), oracledb.versionString);
// console.log("Client:".padStart(ofs), oracledb.oracleClientVersionString);
console.log("".padEnd(32, '='));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 

app.use('*', (req, res, next) => {
	ctx.debug(req.originalUrl);
	next();
});

app.use(express.static(`${__dirname}/public`));

app.use('/api/public', api_pub);
// app.use('/api', auth, api_pri);
app.use('/api', jwt.verify, api_pri);

// app.get('/', function (req, res) {
// 	res.send('Hello World!');
// });

app.listen(ctx.cfg.port, function () {
	ctx.debug(`Example app listening on port ${ctx.cfg.port}`);
});