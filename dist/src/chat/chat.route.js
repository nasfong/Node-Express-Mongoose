"use strict";
exports.__esModule = true;
exports.routerChat = void 0;
var express_1 = require("express");
var authMiddleware_1 = require("../../Middleware/authMiddleware");
var chat_controller_1 = require("./chat.controller");
var routerChat = (0, express_1.Router)();
exports.routerChat = routerChat;
routerChat.get('', chat_controller_1.readAllData);
routerChat.post('', authMiddleware_1.authMiddleware, chat_controller_1.createData);
routerChat.get('/:id', authMiddleware_1.authMiddleware, chat_controller_1.readData);
routerChat.put('/:id', authMiddleware_1.authMiddleware, chat_controller_1.updateData);
routerChat["delete"]('/:id', authMiddleware_1.authMiddleware, chat_controller_1.deleteData);