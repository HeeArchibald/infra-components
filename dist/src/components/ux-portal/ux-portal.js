var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
export var UxPortal = (function () {
    function UxPortal() {
    }
    UxPortal = __decorate([
        Component({
            selector: 'ux-portal',
            template: "\n        <header>\n            <ng-content select=\"[header-left]\"></ng-content>\n            <ng-content select=\"[header-middle]\"></ng-content>\n            <ng-content select=\"[header-right]\"></ng-content>\n        </header>\n        <section>\n            <ng-content select=\"[section]\"></ng-content>\n        </section>\n        <footer>\n            <ng-content select=\"[footer]\"></ng-content>\n        </footer>\n    ",
            styles: ["\n        header{\n            position:relative;\n            display: flex;\n            align-items: center;\n            top: 0px;\n            width: 100%;\n        }\n\n        header >>> > div {\n            flex-grow: 1;\n            flex-basis: 33.3%;\n        }\n        header >>> > div {\n            display: flex;\n            align-items: center;\n        }\n        header >>> > div[header-middle] {\n            justify-content: center;\n        }\n        header >>> > div[header-right] {\n            flex-direction: row-reverse;\n        }\n        header >>> > div > *{\n            display: inline-block;\n            vertical-align: middle;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], UxPortal);
    return UxPortal;
}());
//# sourceMappingURL=ux-portal.js.map