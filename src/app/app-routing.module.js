"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./auth/login/login.component");
var register_component_1 = require("./auth/register/register.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var dashboard_routes_1 = require("./dashboard/dashboard.routes");
var auth_guard_1 = require("./services/auth.guard");
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    {
        path: '', component: dashboard_component_1.DashboardComponent,
        children: dashboard_routes_1.dashboardRoutes,
        canActivate: [auth_guard_1.AuthGuard]
    },
    { path: '**', redirectTo: '' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
