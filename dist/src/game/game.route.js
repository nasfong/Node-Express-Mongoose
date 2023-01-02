"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.routerGame = void 0;
var express_1 = __importDefault(require("express"));
var authMiddleware_1 = require("../../Middleware/authMiddleware");
var game_controller_1 = require("./game.controller");
var routerGame = express_1["default"].Router();
exports.routerGame = routerGame;
routerGame.get('/', authMiddleware_1.authMiddleware, game_controller_1.readAllData);
routerGame.post('/', authMiddleware_1.authMiddleware, game_controller_1.upload, game_controller_1.createData);
routerGame.get('/:id', authMiddleware_1.authMiddleware, game_controller_1.readData);
routerGame.put('/:id', authMiddleware_1.authMiddleware, game_controller_1.upload, game_controller_1.updateData);
routerGame["delete"]('/:id', authMiddleware_1.authMiddleware, game_controller_1.deleteData);
