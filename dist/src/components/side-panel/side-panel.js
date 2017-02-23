var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
var SidePanel = (function () {
    function SidePanel(_eref) {
        this._eref = _eref;
        this.onClose = new EventEmitter();
    }
    Object.defineProperty(SidePanel.prototype, "toggle", {
        set: function (toggle) {
            this.opened = toggle;
        },
        enumerable: true,
        configurable: true
    });
    SidePanel.prototype.onClick = function (event) {
        var checkOpener = this.opener &&
            (this.opener.contains && this.opener.contains(event.target)) ||
            (this.opener.nativeElement && this.opener.nativeElement.contains(event.target));
        if (this.opened &&
            !this._eref.nativeElement.contains(event.target) &&
            !checkOpener) {
            this.opened = false;
            this.onClose.emit();
        }
        return true;
    };
    return SidePanel;
}());
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SidePanel.prototype, "toggle", null);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SidePanel.prototype, "opener", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SidePanel.prototype, "onClose", void 0);
SidePanel = __decorate([
    Component({
        selector: 'side-panel',
        template: "<div [ngClass]=\"{ opened: opened }\"><ng-content></ng-content></div>",
        styles: ["\n        div {\n            position: fixed;\n            z-index: 10;\n            overflow-x: hidden;\n            overflow-y: scroll;\n            height: 100%;\n            top: 0px;\n            left: -30%;\n            width: 30%;\n            transition: transform 0.25s;\n        }\n        div.opened {\n            transform: translateX(100%);\n        }\n    "],
        host: {
            '(document:click)': 'onClick($event)',
        }
    }),
    __metadata("design:paramtypes", [ElementRef])
], SidePanel);
export { SidePanel };
//# sourceMappingURL=side-panel.js.map