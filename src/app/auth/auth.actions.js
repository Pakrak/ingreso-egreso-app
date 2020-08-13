"use strict";
exports.__esModule = true;
exports.unSetUser = exports.setUser = void 0;
var store_1 = require("@ngrx/store");
exports.setUser = store_1.createAction('[Auth] setUser', store_1.props());
exports.unSetUser = store_1.createAction('[Auth] unsetUser');
