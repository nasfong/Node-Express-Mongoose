"use strict";
exports.__esModule = true;
exports.routerPermissionDropdown = exports.routerPermission = void 0;
var express_1 = require("express");
var authMiddleware_1 = require("../../Middleware/authMiddleware");
var permission_controller_1 = require("./permission.controller");
var routerPermission = (0, express_1.Router)();
exports.routerPermission = routerPermission;
var routerPermissionDropdown = (0, express_1.Router)();
exports.routerPermissionDropdown = routerPermissionDropdown;
routerPermission.get('', authMiddleware_1.authMiddleware, permission_controller_1.readAllData);
routerPermission.post('', authMiddleware_1.authMiddleware, permission_controller_1.createData);
routerPermission.get('/:id', authMiddleware_1.authMiddleware, permission_controller_1.readData);
routerPermission.put('/:id', authMiddleware_1.authMiddleware, permission_controller_1.updateData);
routerPermission["delete"]('/:id', authMiddleware_1.authMiddleware, permission_controller_1.deleteData);
//dropdown
routerPermissionDropdown.get('', authMiddleware_1.authMiddleware, permission_controller_1.readDropdown);
