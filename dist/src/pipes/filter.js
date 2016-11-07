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
export var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype._filterString = function (value, filter, arrayRef) {
        if (typeof value === "string" &&
            typeof filter === "string" &&
            filter.trim() &&
            value.match(new RegExp(filter, 'i'))) {
            arrayRef.push(value);
            return true;
        }
        return false;
    };
    FilterPipe.prototype._filterObject = function (value, filter, arrayRef) {
        if (typeof value == "object" &&
            typeof filter === "object") {
            var check = true;
            for (var property in filter) {
                if (value[property] && typeof value[property] === "string") {
                    if (!value[property].match(new RegExp(filter[property], 'i'))) {
                        check = false;
                        break;
                    }
                }
            }
            if (check) {
                arrayRef.push(value);
            }
            return true;
        }
        return false;
    };
    FilterPipe.prototype._filterFunction = function (value, filter, arrayRef) {
        if (typeof filter === "function") {
            if (filter(value)) {
                arrayRef.push(value);
            }
            return true;
        }
        return false;
    };
    FilterPipe.prototype.transform = function (array, by) {
        var _this = this;
        if (!array || !by) {
            return array;
        }
        var filteredArray = [];
        array.forEach(function (item) {
            _this._filterString(item, by, filteredArray) ||
                _this._filterObject(item, by, filteredArray) ||
                _this._filterFunction(item, by, filteredArray) ||
                (filteredArray = array);
        });
        return filteredArray;
    };
    FilterPipe = __decorate([
        Pipe({ name: 'filter' }), 
        __metadata('design:paramtypes', [])
    ], FilterPipe);
    return FilterPipe;
}());
//# sourceMappingURL=filter.js.map