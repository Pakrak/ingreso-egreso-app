"use strict";
exports.__esModule = true;
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(uid, nombre, email) {
        this.uid = uid;
        this.nombre = nombre;
        this.email = email;
    }
    Usuario.fromFirebase = function (_a) {
        var email = _a.email, uid = _a.uid, nombre = _a.nombre;
        return new Usuario(uid, nombre, email);
    };
    return Usuario;
}());
exports.Usuario = Usuario;
