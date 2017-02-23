var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, Renderer, ElementRef } from '@angular/core';
import { LabelsService } from '../../services';
var MultiCombo = (function () {
    function MultiCombo(_eref, _renderer, labelsService) {
        this._eref = _eref;
        this._renderer = _renderer;
        this.labelsService = labelsService;
        this.self = this;
        this._comboModel = [];
        this.filteredModel = [];
        this.title = "Select";
        this.reverse = false;
        this.disabled = false;
        this.onSelectItem = new EventEmitter();
        this.onDeselectItem = new EventEmitter();
        this.filteredModelChange = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.filteredComboModel = [];
        this.search = {
            input: '',
            reset: function () {
                this.input = "";
            }
        };
        this.show = false;
    }
    MultiCombo.prototype.labels = function (label) {
        return this.labelsService.getLabel(label);
    };
    Object.defineProperty(MultiCombo.prototype, "comboModel", {
        set: function (model) {
            this._comboModel = model;
            if (!model) {
                this.filteredModel = [];
                return;
            }
            for (var i = 0; i < this.filteredModel.length; i++) {
                var idx = model.indexOf(this.filteredModel[i]);
                if (idx < 0) {
                    this.filteredModel.splice(idx, 1);
                    i--;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    MultiCombo.prototype.toggleVisibility = function () {
        this.show = !this.show;
        if (this.show) {
            this.search.reset();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
        }
    };
    MultiCombo.prototype.isSelected = function (item) {
        return this.filteredModel && this.filteredModel.indexOf(item) >= 0;
    };
    MultiCombo.prototype.isDisabled = function () {
        return this.filteredModel && this.maxSelected &&
            this.maxSelected <= this.filteredModel.length;
    };
    MultiCombo.prototype.toggleItem = function (item) {
        var idx = this.filteredModel.indexOf(item);
        if (idx >= 0) {
            this.filteredModel.splice(idx, 1);
            this.onDeselectItem.emit(item);
        }
        else if (!this.maxSelected ||
            this.filteredModel.length < this.maxSelected) {
            this.filteredModel.push(item);
            this.onSelectItem.emit(item);
        }
        this.filteredModelChange.emit(this.filteredModel);
    };
    MultiCombo.prototype.selectAll = function () {
        this.filteredModel = [];
        for (var i = 0; i < this.filteredComboModel.length; i++) {
            this.filteredModel.push(this.filteredComboModel[i]);
        }
        this.filteredModelChange.emit(this.filteredModel);
    };
    MultiCombo.prototype.deselectAll = function () {
        this.filteredModel = [];
        this.filteredModelChange.emit(this.filteredModel);
    };
    MultiCombo.prototype.displayItem = function (item) {
        return item instanceof Object ?
            this.display && typeof this.display === "string" ?
                item[this.display] :
                item.toString() :
            this.display && this.display instanceof Function ?
                this.display(item || '') :
                item;
    };
    MultiCombo.prototype.onClick = function (event) {
        if (this.show && !this._eref.nativeElement.contains(event.target)) {
            this.toggleVisibility();
        }
        return true;
    };
    MultiCombo.prototype.getFilter = function () {
        if (!this.filter)
            return "";
        var filter = "";
        if (this._comboModel.length > 0) {
            if (typeof this._comboModel[0] === 'string') {
                filter = this.search.input;
            }
            else {
                filter = {};
                filter[this.filter] = this.search.input;
            }
        }
        return filter;
    };
    return MultiCombo;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MultiCombo.prototype, "comboModel", null);
__decorate([
    Input("outputModel"),
    __metadata("design:type", Object)
], MultiCombo.prototype, "filteredModel", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], MultiCombo.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MultiCombo.prototype, "display", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], MultiCombo.prototype, "filter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MultiCombo.prototype, "orderBy", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], MultiCombo.prototype, "reverse", void 0);
__decorate([
    Input("max"),
    __metadata("design:type", Number)
], MultiCombo.prototype, "maxSelected", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], MultiCombo.prototype, "disabled", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MultiCombo.prototype, "onSelectItem", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MultiCombo.prototype, "onDeselectItem", void 0);
__decorate([
    Output("outputModelChange"),
    __metadata("design:type", Object)
], MultiCombo.prototype, "filteredModelChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MultiCombo.prototype, "onOpen", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MultiCombo.prototype, "onClose", void 0);
MultiCombo = __decorate([
    Component({
        selector: 'multi-combo',
        template: "\n        <button (click)=\"toggleVisibility()\"\n            [ngClass]=\"{ opened: show }\"\n            [disabled]=\"disabled\">\n            {{ title }}\n        </button>\n        <div [ngClass]=\"{ hidden: !show }\">\n            <div class=\"options\">\n                <button class=\"select-all\" (click)=\"selectAll()\" *ngIf=\"!maxSelected\"\n                    [title]=\"labels('select.all')\">{{ labels('select.all') }}</button>\n                <button class=\"deselect-all\" (click)=\"deselectAll()\"\n                    [title]=\"labels('deselect.all')\">{{ labels('deselect.all') }}</button>\n            </div>\n            <div *ngIf=\"filter\" class=\"filter\">\n                <search-input (onChange)=\"search.input = $event\" [attr.placeholder]=\"labels('search')\"></search-input>\n            </div>\n            <ul>\n                <li *ngFor=\"let item of _comboModel | filter: getFilter() | orderBy: orderBy | store: self:'filteredComboModel'\"\n                    (click)=\"toggleItem(item)\"\n                    [ngClass]=\"{ selected: isSelected(item) }\"\n                    [attr.disabled]=\"isDisabled()\">\n                    {{ displayItem(item) }}\n                </li>\n            </ul>\n        </div>\n    ",
        styles: ["\n        :host {\n            position: relative;\n        }\n\n        :host > button {\n            min-width: 150px;\n        }\n\n        :host > div {\n            position: absolute;\n            z-index: 2;\n            left: 0px;\n            overflow: hidden;\n            background:white;\n            border: 2px solid black;\n        }\n\n        :host > div.hidden {\n            max-height: 0px;\n            border-width: 0px;\n        }\n\n        :host > div>div.options {\n        }\n\n        :host > div>div.options>* {\n            display: inline-block;\n            vertical-align: middle;\n        }\n\n        :host > div>div.options>button {\n        }\n        :host > div>div.options>button:hover {\n        }\n\n        :host > div>div.filter {\n            margin: 10px 0px;\n            width: 100%;\n            position: relative;\n        }\n\n        :host > div>div.filter input {\n            width: 100%;\n        }\n\n        :host > div>div.filter input:focus {\n        }\n\n        :host > div>ul {\n            list-style: none;\n            padding: 0px;\n            overflow-y: scroll;\n            max-height: 200px;\n        }\n\n        :host > div>ul>li {\n            white-space: nowrap;\n            cursor: pointer;\n        }\n\n        :host > div>ul>li.selected {\n        }\n\n        :host > div>ul>li:not(.selected):not([disabled]):hover {\n        }\n\n        :host > div>ul>li:not(.selected)[disabled=\"true\"] {\n            pointer-events: none;\n        }\n    "],
        host: {
            '(document:click)': 'onClick($event)',
        }
    }),
    __metadata("design:paramtypes", [ElementRef, Renderer,
        LabelsService])
], MultiCombo);
export { MultiCombo };
//# sourceMappingURL=multi-combo.js.map