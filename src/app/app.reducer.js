"use strict";
exports.__esModule = true;
exports.appReducers = void 0;
var ui = require("./share/ui.reducer");
var auth = require("./auth/auth.reducer");
var ingresoEgreso = require("./ingreso-egreso/ingreso-egreso.reducer");
exports.appReducers = {
    ui: ui.uiReducer,
    user: auth.authReducer,
    ingresosEgresos: ingresoEgreso.ingresoEgresoReducer
};
