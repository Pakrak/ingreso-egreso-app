"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.authReducer = exports.initialState = void 0;
var store_1 = require("@ngrx/store");
var auth_actions_1 = require("./auth.actions");
exports.initialState = {
    user: null
};
var _authReducer = store_1.createReducer(exports.initialState, store_1.on(auth_actions_1.setUser, function (state, _a) {
    var user = _a.user;
    return (__assign(__assign({}, state), { user: __assign({}, user) }));
}), store_1.on(auth_actions_1.unSetUser, function (state) { return (__assign(__assign({}, state), { user: null })); }));
function authReducer(state, action) {
    return _authReducer(state, action);
}
exports.authReducer = authReducer;
