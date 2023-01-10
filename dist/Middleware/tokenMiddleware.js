"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.tokenDecode = exports.tokenSign = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tokenSign = function (_a) {
    var auth = _a.auth;
    var token = jsonwebtoken_1["default"].sign({
        username: auth.username,
        id: auth._id,
        firstname: auth.firstname,
        lastname: auth.lastname,
        role: auth.role
    }, 'MERN', { expiresIn: '1h' });
    return token;
};
exports.tokenSign = tokenSign;
var tokenDecode = function (_a) {
    var token = _a.token;
    var decoded = jsonwebtoken_1["default"].verify(token, 'MERN', { ignoreExpiration: true });
    return decoded;
};
exports.tokenDecode = tokenDecode;
