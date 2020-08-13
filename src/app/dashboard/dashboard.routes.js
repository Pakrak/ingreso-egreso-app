"use strict";
exports.__esModule = true;
exports.dashboardRoutes = void 0;
var estadistica_component_1 = require("../ingreso-egreso/estadistica/estadistica.component");
var ingreso_egreso_component_1 = require("../ingreso-egreso/ingreso-egreso.component");
var detalle_component_1 = require("../ingreso-egreso/detalle/detalle.component");
exports.dashboardRoutes = [
    { path: '', component: estadistica_component_1.EstadisticaComponent },
    { path: 'ingreso-egreso', component: ingreso_egreso_component_1.IngresoEgresoComponent },
    { path: 'detalle', component: detalle_component_1.DetalleComponent },
];
