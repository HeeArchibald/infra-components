var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './rxjs-extensions';
import { NgModule } from '@angular/core';
import * as deps from './module.dependencies';
import { DynamicModuleImports, LabelsService } from './services';
var InfraComponentsModule = InfraComponentsModule_1 = (function () {
    function InfraComponentsModule() {
    }
    InfraComponentsModule.forRoot = function (labelsProvider) {
        return {
            ngModule: InfraComponentsModule_1,
            providers: [
                DynamicModuleImports,
                labelsProvider || LabelsService
            ]
        };
    };
    InfraComponentsModule.forChild = function () {
        return {
            ngModule: InfraComponentsModule_1,
            providers: []
        };
    };
    return InfraComponentsModule;
}());
InfraComponentsModule = InfraComponentsModule_1 = __decorate([
    NgModule({
        imports: deps.imports,
        declarations: deps.declarations,
        providers: [],
        exports: deps.exportList
    })
], InfraComponentsModule);
export { InfraComponentsModule };
var InfraComponentsModule_1;
//# sourceMappingURL=infracomponents.module.js.map