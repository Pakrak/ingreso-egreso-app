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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IngresoEgresoService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var IngresoEgresoService = /** @class */ (function () {
    function IngresoEgresoService(firestore, authService) {
        this.firestore = firestore;
        this.authService = authService;
    }
    IngresoEgresoService.prototype.crearIngresoEgreso = function (ingresoEgreso) {
        var uid = this.authService.user.uid;
        delete ingresoEgreso.uid;
        return this.firestore.doc(uid + "/ingresos-egresos")
            .collection('items')
            .add(__assign({}, ingresoEgreso));
    };
    IngresoEgresoService.prototype.initIngresosEgresosListener = function (uid) {
        return this.firestore.collection(uid + "/ingresos-egresos/items")
            .snapshotChanges()
            .pipe(operators_1.map(function (snapshot) { return snapshot.map(function (doc) { return (__assign({ uid: doc.payload.doc.id }, doc.payload.doc.data())); }); }));
    };
    IngresoEgresoService.prototype.borrarIngresoEgreso = function (uidItem) {
        var uid = this.authService.user.uid;
        return this.firestore.doc(uid + "/ingresos-egresos/items/" + uidItem)["delete"]();
    };
    IngresoEgresoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], IngresoEgresoService);
    return IngresoEgresoService;
}());
exports.IngresoEgresoService = IngresoEgresoService;
