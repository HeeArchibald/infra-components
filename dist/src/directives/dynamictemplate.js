var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, Directive, Input, ElementRef, ViewContainerRef, ReflectiveInjector, Compiler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfraComponentsModule } from '../infracomponents.module';
import { DynamicModuleImports } from '../services/dynamicModuleImports';
var DynamicTemplate = (function () {
    function DynamicTemplate(elementRef, viewContainer, compiler, dynamicModuleImports) {
        this.elementRef = elementRef;
        this.viewContainer = viewContainer;
        this.compiler = compiler;
        this.dynamicModuleImports = dynamicModuleImports;
        this._html = "";
        this._selector = "dynamic-view";
    }
    DynamicTemplate.prototype._createDynamicComponent = function () {
        var metadata = {
            selector: this._selector,
            template: this._html,
            inputs: ['template']
        };
        var _cmp_ = (function () {
            function _cmp_() {
            }
            return _cmp_;
        }());
        _cmp_.prototype = this.context;
        return Component(metadata)(_cmp_);
    };
    DynamicTemplate.prototype._createDynamicModule = function (componentType) {
        var _mod_ = (function () {
            function _mod_() {
            }
            return _mod_;
        }());
        return NgModule({
            imports: [
                CommonModule,
                InfraComponentsModule
            ].concat(this.dynamicModuleImports.imports),
            declarations: [componentType],
            providers: []
        })(_mod_);
    };
    Object.defineProperty(DynamicTemplate.prototype, "templateContents", {
        set: function (html) {
            var _this = this;
            if (html) {
                this._html = html;
                var cmpType = this._createDynamicComponent();
                var moduleType = this._createDynamicModule(cmpType);
                var injector_1 = ReflectiveInjector.fromResolvedProviders([], this.viewContainer.parentInjector);
                this.compiler.compileModuleAndAllComponentsAsync(moduleType)
                    .then(function (factory) {
                    var cmpFactory;
                    for (var i = factory.componentFactories.length - 1; i >= 0; i--) {
                        if (factory.componentFactories[i].selector === _this._selector) {
                            cmpFactory = factory.componentFactories[i];
                            break;
                        }
                    }
                    return cmpFactory;
                })
                    .then(function (cmpFactory) {
                    if (cmpFactory) {
                        _this.viewContainer.clear();
                        _this.viewContainer.createComponent(cmpFactory, 0, injector_1);
                    }
                });
            }
            else {
                this._html = "";
                this.viewContainer.clear();
            }
        },
        enumerable: true,
        configurable: true
    });
    return DynamicTemplate;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicTemplate.prototype, "context", void 0);
__decorate([
    Input("template"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DynamicTemplate.prototype, "templateContents", null);
DynamicTemplate = __decorate([
    Directive({
        selector: 'dynamic-template'
    }),
    __metadata("design:paramtypes", [ElementRef,
        ViewContainerRef,
        Compiler,
        DynamicModuleImports])
], DynamicTemplate);
export { DynamicTemplate };
//# sourceMappingURL=dynamictemplate.js.map