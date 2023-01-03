"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.readUser = exports.login = exports.register = void 0;
var auth_model_1 = __importDefault(require("./auth.model"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var salt, hashedPass, auth, oldUser, token_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.password) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1["default"].genSalt(10)];
            case 1:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1["default"].hash(req.body.password, salt)];
            case 2:
                hashedPass = _a.sent();
                req.body.password = hashedPass;
                _a.label = 3;
            case 3:
                auth = new auth_model_1["default"](req.body);
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, auth_model_1["default"].findOne({ username: req.body.username })];
            case 5:
                oldUser = _a.sent();
                if (oldUser)
                    return [2 /*return*/, res.status(400).json({ message: 'username is already registered' })
                        //token
                    ];
                token_1 = jsonwebtoken_1["default"].sign({
                    username: auth.username,
                    id: auth._id,
                    firstname: auth.firstname,
                    lastname: auth.lastname,
                    role: auth.role
                }, 'MERN', { expiresIn: '1h' });
                return [2 /*return*/, auth
                        .save()
                        .then(function (auth) { return res.status(200).json({
                        data: auth,
                        token: token_1
                    }); })["catch"](function (validate) { return res.status(201).json({
                        data: validate.errors
                    }); })];
            case 6:
                error_1 = _a.sent();
                res.status(500).json({ messgae: error_1.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, auth, passwrod_check, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, auth_model_1["default"].findOne({ username: username })];
            case 2:
                auth = _b.sent();
                if (!auth) return [3 /*break*/, 4];
                return [4 /*yield*/, bcrypt_1["default"].compare(password, auth.password)];
            case 3:
                passwrod_check = _b.sent();
                if (!passwrod_check)
                    return [2 /*return*/, res.status(202).json({ message: 'Wrong Password' })];
                token = jsonwebtoken_1["default"].sign({
                    username: auth.username,
                    id: auth._id,
                    firstname: auth.firstname,
                    lastname: auth.lastname,
                    role: auth.role
                }, 'MERN', { expiresIn: '1h' });
                res.status(200).json({
                    // data: auth,
                    token: token
                });
                return [3 /*break*/, 5];
            case 4:
                res.status(202).json({ messsage: 'User dose not exist' });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                res.status(500).json({ messgae: error_2.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var readUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.readUser = readUser;
