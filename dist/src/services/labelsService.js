var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var LabelsService = LabelsService_1 = (function () {
    function LabelsService() {
        this.labels = {
            "select.all": "Select all",
            "deselect.all": "Deselect all",
            "search": "Search"
        };
    }
    LabelsService.prototype.getLabel = function (label) {
        return this.labels[label] || label;
    };
    LabelsService.prototype.mixin = function (labels) {
        for (var property in labels) {
            this.labels[property] = labels[property];
        }
    };
    LabelsService.withLabels = function (labels) {
        var newService = new LabelsService_1();
        for (var prop in labels) {
            newService.labels[prop] = labels[prop];
        }
        return newService;
    };
    return LabelsService;
}());
LabelsService = LabelsService_1 = __decorate([
    Injectable()
], LabelsService);
export { LabelsService };
var LabelsService_1;
//# sourceMappingURL=labelsService.js.map