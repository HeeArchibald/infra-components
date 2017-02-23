var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var LimitPipe = (function () {
    function LimitPipe() {
    }
    LimitPipe.prototype.transform = function (array, limit, offset) {
        if (offset === void 0) { offset = 0; }
        return array.slice(offset, limit);
    };
    return LimitPipe;
}());
LimitPipe = __decorate([
    Pipe({
        name: "limit",
        pure: false
    })
], LimitPipe);
export { LimitPipe };
//# sourceMappingURL=limit.js.map