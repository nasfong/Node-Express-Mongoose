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
exports.readDropdown = exports.deleteData = exports.updateData = exports.readData = exports.readAllData = exports.createData = void 0;
var permission_model_1 = __importDefault(require("./permission.model"));
var role_model_1 = __importDefault(require("../role/role.model"));
var createData = function (req, res) {
    var _a = req.body, name = _a.name, role = _a.role;
    var permission = new permission_model_1["default"]({ name: name, role: role });
    try {
        permission
            .save()
            .then(function (permission) { return res.status(200).json({ data: permission }); })["catch"](function (validate) { return res.status(201).json({ data: validate.errors }); });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.createData = createData;
var readAllData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Permissions_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, permission_model_1["default"]
                        .find()
                        .populate('role')
                        .select('-__v')];
            case 1:
                Permissions_1 = _a.sent();
                return [2 /*return*/, res.status(200).json({ data: Permissions_1 })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readAllData = readAllData;
var readData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, permission, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, permission_model_1["default"]
                        .findById(id)
                        // .populate('role')
                        .select('-__v')];
            case 2:
                permission = _a.sent();
                return [2 /*return*/, permission ? res.status(200).json({ data: permission }) : res.status(404).json({ status: 'Not found' })];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.readData = readData;
var updateData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, role, permission, newPermission_1, permissionUpdate, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, role = _a.role;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, permission_model_1["default"].findById(id)];
            case 2:
                permission = _b.sent();
                if (permission) {
                    newPermission_1 = permission._id.toString();
                    try {
                        if (permission.role) {
                            permission.role.map(function (role) { return __awaiter(void 0, void 0, void 0, function () {
                                var roleAll, oldPermission;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, role_model_1["default"].findById(role.toString())];
                                        case 1:
                                            roleAll = _a.sent();
                                            oldPermission = roleAll.permission.map(function (permission) { return permission.toString(); });
                                            // console.log(roleAll.permission.filter(filter => filter.toString().includes([newPermission])))
                                            roleAll.set({
                                                permission: newPermission_1.includes(oldPermission) ?
                                                    [newPermission_1]
                                                    :
                                                        roleAll.permission.filter(function (filter) { return filter.toString().includes([newPermission_1]); })
                                            });
                                            roleAll.save();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                    }
                    catch (error) {
                        res.status(404).json({ message: 'Not found' });
                    }
                    try {
                        permissionUpdate = permission.set({ name: name, role: role });
                        permissionUpdate.save();
                        res.status(200).json({ data: permissionUpdate });
                    }
                    catch (validate) {
                        res.status(201).json({ data: validate.errors });
                    }
                }
                else {
                    res.status(404).json({ status: 'Not found' });
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                res.status(500).json({ error: error_3 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateData = updateData;
var deleteData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.params.id;
        return [2 /*return*/, permission_model_1["default"].findByIdAndDelete(id)
                .then(function (permission) { return permission ? res.status(200).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' }); })["catch"](function (error) { return res.status(500).json({ error: error }); })];
    });
}); };
exports.deleteData = deleteData;
var readDropdown = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Permissions_2, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, permission_model_1["default"].find()];
            case 1:
                Permissions_2 = _a.sent();
                Permissions_2 = Permissions_2.reduce(function (json, value, index) {
                    json[value._id] = value.name;
                    return json;
                }, {});
                return [2 /*return*/, res.status(200).json(Permissions_2)];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_4 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.readDropdown = readDropdown;
