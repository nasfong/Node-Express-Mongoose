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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteData = exports.updateData = exports.readData = exports.readAllData = exports.createData = void 0;
var auth_model_1 = __importDefault(require("../auth/auth.model"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var createData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, username, role, salt, hashedPass, administrator;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, username = _a.username, role = _a.role;
                if (!req.body.password) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1["default"].genSalt(10)];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1["default"].hash(req.body.password, salt)];
            case 2:
                hashedPass = _b.sent();
                req.body.password = hashedPass;
                _b.label = 3;
            case 3:
                administrator = new auth_model_1["default"]({
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    password: req.body.password,
                    role: role
                });
                administrator.populate('role');
                try {
                    return [2 /*return*/, administrator
                            .save()
                            .then(function (administrator) { return res.status(200).json({ data: administrator }); })["catch"](function (validate) { return res.status(201).json({ data: validate.errors }); })];
                }
                catch (error) {
                    return [2 /*return*/, res.status(500).json({ error: error })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.createData = createData;
var readAllData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var administrators, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, auth_model_1["default"]
                        .find()
                        .populate('role')
                        .select('-__v')];
            case 1:
                administrators = _a.sent();
                administrators = administrators.map(function (administrator) {
                    var _a = administrator._doc, password = _a.password, otherDetails = __rest(_a, ["password"]);
                    return otherDetails;
                });
                return [2 /*return*/, res.status(200).json({ data: administrators })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readAllData = readAllData;
var readData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, administrator, _a, password, otherDtails, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, auth_model_1["default"]
                        .findById(id)
                        .populate('role')
                        .select('-__v')];
            case 2:
                administrator = _b.sent();
                if (administrator) {
                    _a = administrator._doc, password = _a.password, otherDtails = __rest(_a, ["password"]);
                    res.status(200).json(otherDtails);
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.readData = readData;
var updateData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, firstname, lastname, username, role, salt, hashedPass;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, username = _a.username, role = _a.role;
                if (!req.body.password) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1["default"].genSalt(10)];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1["default"].hash(req.body.password, salt)];
            case 2:
                hashedPass = _b.sent();
                req.body.password = hashedPass;
                _b.label = 3;
            case 3: return [2 /*return*/, auth_model_1["default"]
                    .findById(id)
                    .select('-__v')
                    .then(function (administrator) {
                    if (administrator) {
                        administrator.set({
                            firstname: firstname,
                            lastname: lastname,
                            role: role,
                            username: username,
                            password: req.body.password
                        })
                            .populate('role');
                        return administrator
                            .save()
                            .then(function (administrator) { return res.status(200).json({ data: administrator }); })["catch"](function (validate) { return res.status(201).json({ data: validate.errors }); });
                    }
                    else {
                        res.status(404).json({ message: 'Not found' });
                    }
                })["catch"](function (error) { return res.status(500).json({ error: error }); })];
        }
    });
}); };
exports.updateData = updateData;
var deleteData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.params.id;
        return [2 /*return*/, auth_model_1["default"].findByIdAndDelete(id)
                .then(function (administrator) {
                if (administrator) {
                    // fs.unlinkSync(`public/uploads/${image}`)
                    res.status(200).json({ data: 'Deleted successfully' });
                }
                else {
                    res.status(404).json({ message: 'Not found' });
                }
            })["catch"](function (error) { return res.status(500).json({ error: error }); })];
    });
}); };
exports.deleteData = deleteData;
