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
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.stringFullCompare = function (str1, str2) {
        return str1.match(new RegExp(str2, 'i')) !== null;
    };
    FilterPipe.prototype._filterString = function (value, filter, arrayRef) {
        if (typeof value === "string" &&
            typeof filter === "string" &&
            filter.trim() &&
            this.stringFullCompare(value, filter)) {
            arrayRef.push(value);
            return true;
        }
        return false;
    };
    FilterPipe.prototype._filterObject = function (value, filter, arrayRef) {
        if (typeof value == "object" && typeof filter === "object") {
            var check = true;
            for (var property in filter) {
                if (!check)
                    break;
                var filterValue = filter[property];
                var checkedValue = value[property];
                if (typeof filterValue === "string" && typeof checkedValue === "string") {
                    check = this.stringFullCompare(checkedValue, filterValue);
                }
                else if (filterValue instanceof Array && typeof checkedValue === "string") {
                    for (var i = 0; i < filterValue.length; i++) {
                        check = this.stringFullCompare(checkedValue, filterValue[i]);
                        if (check)
                            break;
                    }
                }
                else if (filterValue instanceof Function) {
                    check = filterValue(checkedValue);
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
                _this._filterFunction(item, by, filteredArray);
        });
        return filteredArray;
    };
    return FilterPipe;
}());
FilterPipe = __decorate([
    Pipe({ name: 'filter', pure: false }),
    __metadata("design:paramtypes", [])
], FilterPipe);
export { FilterPipe };
//# sourceMappingURL=filter.js.map