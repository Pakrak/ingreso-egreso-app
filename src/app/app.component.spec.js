"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var app_component_1 = require("./app.component");
describe('AppComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                app_component_1.AppComponent
            ]
        }).compileComponents();
    }));
    it('should create the app', function () {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        var app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    it("should have as title 'ingresoEgresoApp'", function () {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        var app = fixture.componentInstance;
        expect(app.title).toEqual('ingresoEgresoApp');
    });
    it('should render title', function () {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        fixture.detectChanges();
        var compiled = fixture.nativeElement;
        expect(compiled.querySelector('.content span').textContent).toContain('ingresoEgresoApp app is running!');
    });
});
