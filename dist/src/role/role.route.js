"use strict";
exports.__esModule = true;
exports.routerRoleDropdown = exports.routerRole = void 0;
var express_1 = require("express");
var authMiddleware_1 = require("../../Middleware/authMiddleware");
var role_controller_1 = require("./role.controller");
var routerRole = (0, express_1.Router)();
exports.routerRole = routerRole;
var routerRoleDropdown = (0, express_1.Router)();
exports.routerRoleDropdown = routerRoleDropdown;
routerRole.get('', authMiddleware_1.authMiddleware, role_controller_1.readAllData);
routerRole.post('', authMiddleware_1.authMiddleware, role_controller_1.createData);
routerRole.get('/:id', authMiddleware_1.authMiddleware, role_controller_1.readData);
routerRole.put('/:id', authMiddleware_1.authMiddleware, role_controller_1.updateData);
routerRole["delete"]('/:id', authMiddleware_1.authMiddleware, role_controller_1.deleteData);
//dropdown
routerRoleDropdown.get('', authMiddleware_1.authMiddleware, role_controller_1.readDropdown);
