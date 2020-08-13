"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(auth, router, store) {
        this.auth = auth;
        this.router = router;
        this.store = store;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSubs = this.store.select('user')
            .pipe(operators_1.filter(function (_a) {
            var user = _a.user;
            return user != null;
        }))
            .subscribe(function (_a) {
            var user = _a.user;
            return _this.nombre = user === null || user === void 0 ? void 0 : user.nombre;
        });
    };
    SidebarComponent.prototype.ngOnDestroy = function () {
        this.userSubs.unsubscribe();
    };
    SidebarComponent.prototype.logout = function () {
        var _this = this;
        this.auth.logout().then(function () {
            _this.router.navigate(['/login']);
        });
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styles: []
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
