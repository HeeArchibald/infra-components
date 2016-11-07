var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from '@angular/core';
export var FlattenObjectArrayPipe = (function () {
    function FlattenObjectArrayPipe() {
    }
    FlattenObjectArrayPipe.prototype.transform = function (array, onlyProps) {
        if (!array) {
            return [];
        }
        if (onlyProps.length < 1) {
            return array;
        }
        var flattenedArray = Array.from(array);
        var flatten = function (array) {
            array.forEach(function (item) {
                for (var prop in item) {
                    var val = item[prop];
                    if (val instanceof Array &&
                        !onlyProps ||
                        onlyProps.indexOf(prop) > -1) {
                        flattenedArray = flattenedArray.concat(val);
                        flatten(val);
                    }
                }
            });
        };
        flatten(array);
        return flattenedArray;
    };
    FlattenObjectArrayPipe = __decorate([
        Pipe({ name: "flattenObjArray" }), 
        __metadata('design:paramtypes', [])
    ], FlattenObjectArrayPipe);
    return FlattenObjectArrayPipe;
}());
//# sourceMappingURL=flattenObjArray.js.map