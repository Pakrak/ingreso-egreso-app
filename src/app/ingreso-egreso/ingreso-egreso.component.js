"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IngresoEgresoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ingreso_egreso_model_1 = require("../models/ingreso-egreso.model");
var sweetalert2_1 = require("sweetalert2");
var ui = require("src/app/share/ui.actions");
var IngresoEgresoComponent = /** @class */ (function () {
    function IngresoEgresoComponent(fb, ingresoEgresoService, store) {
        this.fb = fb;
        this.ingresoEgresoService = ingresoEgresoService;
        this.store = store;
        this.tipo = 'ingreso';
        this.cargando = false;
    }
    IngresoEgresoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ingresoForm = this.fb.group({
            descripcion: ['', forms_1.Validators.required],
            monto: ['', forms_1.Validators.required]
        });
        this.uiSubscription = this.store.select('ui').subscribe(function (ui) { return _this.cargando = ui.isLoading; });
    };
    IngresoEgresoComponent.prototype.ngOnDestroy = function () {
        this.uiSubscription.unsubscribe();
    };
    IngresoEgresoComponent.prototype.guardar = function () {
        var _this = this;
        console.log('vamos a guardar');
        if (this.ingresoForm.invalid) {
            return;
        }
        this.store.dispatch(ui.isLoading());
        var _a = this.ingresoForm.value, descripcion = _a.descripcion, monto = _a.monto;
        console.log('creamos objeto para guardar');
        var ingresoEgreso = new ingreso_egreso_model_1.IngresoEgreso(descripcion, monto, this.tipo);
        console.log('llamamos a crear IngresoEgreso');
        this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
            .then(function () {
            _this.store.dispatch(ui.stopLoading());
            sweetalert2_1["default"].fire('Registro creado', descripcion, 'success');
            _this.ingresoForm.reset();
        })["catch"](function (err) {
            _this.store.dispatch(ui.stopLoading());
            sweetalert2_1["default"].fire('Error', err.message, 'error');
        });
    };
    IngresoEgresoComponent = __decorate([
        core_1.Component({
            selector: 'app-ingreso-egreso',
            templateUrl: './ingreso-egreso.component.html',
            styles: []
        })
    ], IngresoEgresoComponent);
    return IngresoEgresoComponent;
}());
exports.IngresoEgresoComponent = IngresoEgresoComponent;
