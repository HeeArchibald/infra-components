"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('./rxjs-extensions');
var core_1 = require('@angular/core');
var deps = require('./module.dependencies');
var InfraComponentsModule = (function () {
    function InfraComponentsModule() {
    }
    InfraComponentsModule.forRoot = function (providers) {
        return {
            ngModule: InfraComponentsModule,
            providers: providers
        };
    };
    InfraComponentsModule = __decorate([
        core_1.NgModule({
            imports: deps.imports,
            declarations: deps.declarations,
            providers: deps.providers,
            exports: deps.exportList
        }), 
        __metadata('design:paramtypes', [])
    ], InfraComponentsModule);
    return InfraComponentsModule;
}());
exports.InfraComponentsModule = InfraComponentsModule;
//# sourceMappingURL=infracomponents.module.js.map