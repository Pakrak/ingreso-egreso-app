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
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var usuario_model_1 = require("../models/usuario.model");
var authActions = require("../auth/auth.actions");
var ingresoEgresoActions = require("../ingreso-egreso/ingreso-egreso.actions");
var AuthService = /** @class */ (function () {
    function AuthService(auth, firestore, store) {
        this.auth = auth;
        this.firestore = firestore;
        this.store = store;
    }
    Object.defineProperty(AuthService.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: false,
        configurable: true
    });
    AuthService.prototype.initAuthListener = function () {
        var _this = this;
        this.auth.authState.subscribe(function (fuser) {
            var _a;
            if (fuser) {
                _this.userSubscription = _this.firestore.doc(fuser.uid + "/usuario").valueChanges()
                    .subscribe(function (firestoreUser) {
                    var user = usuario_model_1.Usuario.fromFirebase(firestoreUser);
                    _this._user = user;
                    _this.store.dispatch(authActions.setUser({ user: user }));
                });
            }
            else {
                //console.log('no tendría que pasar por aquí');
                _this._user = null;
                (_a = _this.userSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
                _this.store.dispatch(authActions.unSetUser());
                _this.store.dispatch(ingresoEgresoActions.unSetItems());
            }
        });
    };
    AuthService.prototype.crearUsuario = function (nombre, email, password) {
        var _this = this;
        return this.auth.createUserWithEmailAndPassword(email, password)
            .then(function (_a) {
            var user = _a.user;
            var newUser = new usuario_model_1.Usuario(user.uid, nombre, user.email);
            return _this.firestore.doc(user.uid + "/usuario").set(__assign({}, newUser));
        });
    };
    AuthService.prototype.loginUsuario = function (email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    };
    AuthService.prototype.logout = function () {
        return this.auth.signOut();
    };
    AuthService.prototype.isAuth = function () {
        return this.auth.authState.pipe(operators_1.map(function (fbUser) { return fbUser != null; }));
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
