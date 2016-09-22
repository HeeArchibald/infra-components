"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var PushPanel = (function () {
    function PushPanel(_eref) {
        this._eref = _eref;
        this.onClose = new core_1.EventEmitter();
    }
    Object.defineProperty(PushPanel.prototype, "toggle", {
        set: function (toggle) {
            this._opened = toggle;
        },
        enumerable: true,
        configurable: true
    });
    PushPanel.prototype.onClick = function (event) {
        var checkOpener = this.opener &&
            (this.opener.contains && this.opener.contains(event.target)) ||
            (this.opener.nativeElement && this.opener.nativeElement.contains(event.target));
        if (this._opened &&
            !this.inside.nativeElement.contains(event.target) &&
            !checkOpener) {
            this._opened = false;
            this.onClose.emit();
        }
        return true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], PushPanel.prototype, "toggle", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PushPanel.prototype, "opener", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PushPanel.prototype, "onClose", void 0);
    __decorate([
        core_1.ViewChild("inside"), 
        __metadata('design:type', core_1.ElementRef)
    ], PushPanel.prototype, "inside", void 0);
    PushPanel = __decorate([
        core_1.Component({
            selector: 'push-panel',
            template: "\n    <div [ngClass]=\"{ opened: _opened }\" #inside>\n        <ng-content select=\"[inside]\"></ng-content>\n    </div>\n    <div>\n        <ng-content select=\"[companion]\"></ng-content>\n    </div>\n    ",
            styles: ["\n        :host > div:nth-child(1) {\n            position: fixed;\n            z-index: 10;\n            overflow-x: hidden;\n            overflow-y: scroll;\n            height: 100%;\n            top: 0px;\n            left: -30%;\n            width: 30%;\n            transition: left 0.25s;\n        }\n        :host > div:nth-child(1).opened {\n            left: 0%;\n        }\n        :host > div:nth-child(2) {\n            position: relative;\n            left: 0%;\n            opacity: 1;\n            transition: left 0.25s, opacity 0.25s;\n        }\n        :host > div:nth-child(1).opened + div {\n            opacity: 0.7;\n            left: 30%;\n            overflow-x: hidden;\n        }\n    "],
            host: {
                '(document:click)': 'onClick($event)',
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PushPanel);
    return PushPanel;
}());
exports.PushPanel = PushPanel;
//# sourceMappingURL=push-panel.js.map