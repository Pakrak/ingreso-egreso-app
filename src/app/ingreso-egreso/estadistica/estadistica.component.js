"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstadisticaComponent = void 0;
var core_1 = require("@angular/core");
var EstadisticaComponent = /** @class */ (function () {
    function EstadisticaComponent(store) {
        this.store = store;
        this.doughnutChartLabels = ['Ingresos', 'Egresos'];
        this.doughnutChartData = [];
        this.ingresos = 0;
        this.egresos = 0;
        this.totalEgresos = 0;
        this.totalIngresos = 0;
    }
    EstadisticaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select('ingresosEgresos')
            .subscribe(function (_a) {
            var items = _a.items;
            return _this.generarEstadistica(items);
        });
    };
    EstadisticaComponent.prototype.generarEstadistica = function (items) {
        this.totalEgresos = 0;
        this.totalIngresos = 0;
        this.egresos = 0;
        this.ingresos = 0;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item.tipo === 'ingreso') {
                this.totalIngresos += item.monto;
                this.ingresos++;
            }
            else {
                this.totalEgresos += item.monto;
                this.egresos++;
            }
        }
        this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
    };
    EstadisticaComponent = __decorate([
        core_1.Component({
            selector: 'app-estadistica',
            templateUrl: './estadistica.component.html',
            styles: []
        })
    ], EstadisticaComponent);
    return EstadisticaComponent;
}());
exports.EstadisticaComponent = EstadisticaComponent;
