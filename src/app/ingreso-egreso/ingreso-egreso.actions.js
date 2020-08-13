"use strict";
exports.__esModule = true;
exports.unSetItems = exports.setItems = void 0;
var store_1 = require("@ngrx/store");
exports.setItems = store_1.createAction('[IngresoEgreso] Set Items', store_1.props());
exports.unSetItems = store_1.createAction('[IngresoEgreso] UnSet Items');
