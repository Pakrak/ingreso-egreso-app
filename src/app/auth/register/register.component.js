"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var ui = require("src/app/share/ui.actions");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(fb, authService, router, store) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.store = store;
        this.cargando = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.registroForm = this.fb.group({
            nombre: ['', forms_1.Validators.required],
            correo: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', forms_1.Validators.required]
        });
        this.uiSubscription = this.store.select('ui')
            .subscribe(function (ui) { return _this.cargando = ui.isLoading; });
    };
    RegisterComponent.prototype.ngOnDestroy = function () {
        this.uiSubscription.unsubscribe();
    };
    RegisterComponent.prototype.crearUsuario = function () {
        var _this = this;
        if (this.registroForm.invalid) {
            return;
        }
        /* Swal.fire({
          title: 'Espere por favor',
          onBeforeOpen: () => {
            Swal.showLoading();
          }
        }); */
        this.store.dispatch(ui.isLoading());
        var _a = this.registroForm.value, nombre = _a.nombre, correo = _a.correo, password = _a.password;
        this.authService.crearUsuario(nombre, correo, password)
            .then(function (credenciales) {
            console.log(credenciales);
            /* Swal.close(); */
            _this.store.dispatch(ui.stopLoading());
            _this.router.navigate(['/']);
        })["catch"](function (err) {
            _this.store.dispatch(ui.stopLoading());
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Oops...!',
                text: err.message
            });
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styles: []
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
