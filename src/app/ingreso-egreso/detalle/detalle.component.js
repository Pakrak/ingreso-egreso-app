"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DetalleComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var DetalleComponent = /** @class */ (function () {
    function DetalleComponent(store, ingresoEgresoService) {
        this.store = store;
        this.ingresoEgresoService = ingresoEgresoService;
        this.ingresosEgresos = [];
    }
    DetalleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ingresosSubs = this.store.select('ingresosEgresos').subscribe(function (_a) {
            var items = _a.items;
            return _this.ingresosEgresos = items;
        });
    };
    DetalleComponent.prototype.ngOnDestroy = function () {
        this.ingresosSubs.unsubscribe();
    };
    DetalleComponent.prototype.borrar = function (uid) {
        this.ingresoEgresoService.borrarIngresoEgreso(uid)
            .then(function () { return sweetalert2_1["default"].fire('Borrado', 'Item borrado', 'success'); })["catch"](function (err) { return sweetalert2_1["default"].fire('Error', err.message, 'error'); });
    };
    DetalleComponent = __decorate([
        core_1.Component({
            selector: 'app-detalle',
            templateUrl: './detalle.component.html',
            styles: []
        })
    ], DetalleComponent);
    return DetalleComponent;
}());
exports.DetalleComponent = DetalleComponent;
