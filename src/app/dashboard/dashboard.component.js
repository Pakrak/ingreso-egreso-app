"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var ingresoEgresoActions = require("../ingreso-egreso/ingreso-egreso.actions");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(store, ingresoEgresoService) {
        this.store = store;
        this.ingresoEgresoService = ingresoEgresoService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSubs = this.store.select('user')
            .pipe(operators_1.filter(function (auth) { return auth.user != null; }))
            .subscribe(function (_a) {
            var user = _a.user;
            _this.ingresosSubs = _this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
                .subscribe(function (ingresosEgresosFB) {
                _this.store.dispatch(ingresoEgresoActions.setItems({ items: ingresosEgresosFB }));
            });
        });
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.ingresosSubs.unsubscribe();
        this.userSubs.unsubscribe();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styles: []
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
