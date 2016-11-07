var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
export var LabelsService = (function () {
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
        var newService = new LabelsService();
        for (var prop in labels) {
            newService.labels[prop] = labels[prop];
        }
        return newService;
    };
    LabelsService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], LabelsService);
    return LabelsService;
}());
//# sourceMappingURL=labelsService.js.map