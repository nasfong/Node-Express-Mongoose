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
exports.deleteData = exports.updateData = exports.readData = exports.readAllData = exports.createData = void 0;
var menu_model_1 = __importDefault(require("./menu.model"));
var createData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, url, icon, menu, menu_1, validate_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, url = _a.url, icon = _a.icon;
                menu = new menu_model_1["default"]({ name: name, url: url, icon: icon });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, menu
                        .save()];
            case 3:
                menu_1 = _b.sent();
                return [2 /*return*/, res.status(200).json({ data: menu_1 })];
            case 4:
                validate_1 = _b.sent();
                return [2 /*return*/, res.status(201).json({ data: validate_1.errors })];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                res.status(500).json({ error: error_1 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createData = createData;
var readAllData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var menu, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, menu_model_1["default"]
                        .find()
                        .select('-__v')];
            case 1:
                menu = _a.sent();
                return [2 /*return*/, res.status(200).json({ data: menu })];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readAllData = readAllData;
var readData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, menu, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, menu_model_1["default"]
                        .findById(id)
                        .select('-__v')];
            case 2:
                menu = _a.sent();
                return [2 /*return*/, menu ? res.status(200).json({ data: menu }) : res.status(404).json({ status: 'Not found' })];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.readData = readData;
var updateData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.params.id;
        return [2 /*return*/, menu_model_1["default"]
                .findById(id)
                .then(function (menu) { return __awaiter(void 0, void 0, void 0, function () {
                var menu_1, validate_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!menu) return [3 /*break*/, 5];
                            menu.set({
                                name: req.body.name,
                                url: req.body.url,
                                icon: req.body.icon
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, menu
                                    .save()];
                        case 2:
                            menu_1 = _a.sent();
                            return [2 /*return*/, res.status(200).json({ data: menu_1 })];
                        case 3:
                            validate_2 = _a.sent();
                            return [2 /*return*/, res.status(201).json({ data: validate_2.errors })];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            res.status(404).json({ status: 'Not found' });
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); })["catch"](function (error) { return res.status(500).json({ error: error }); })];
    });
}); };
exports.updateData = updateData;
var deleteData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.params.id;
        return [2 /*return*/, menu_model_1["default"].findByIdAndDelete(id)
                .then(function (menu) { return menu ? res.status(200).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' }); })["catch"](function (error) { return res.status(500).json({ error: error }); })];
    });
}); };
exports.deleteData = deleteData;
