"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"))
require("dotenv/config");
var menu_route_1 = require("./menu/menu.route");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var todo_route_1 = require("./todo-list/todo.route");
var game_route_1 = require("./game/game.route");
var _a = process.env, PORT = _a.PORT, MONGO_DB = _a.MONGO_DB;
var app = (0, express_1["default"])();
app.use(express_1["default"].static('public'));
app.use('/images', express_1["default"].static('images'));
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])());
mongoose_1["default"].set("strictQuery", false);
mongoose_1["default"]
    .connect(MONGO_DB, {
    retryWrites: true,
    w: 'majority'
})
    .then(function () {
    console.log('Dabase Connected');
});
app.listen(PORT, function () {
    console.log("http://localhost:".concat(PORT));
});
app.use('/menu', menu_route_1.routerMenu);
app.use('/todo', todo_route_1.routerTodo);
app.use('/game', game_route_1.routerGame);
