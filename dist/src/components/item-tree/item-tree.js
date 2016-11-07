var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
export var ItemTree = (function () {
    function ItemTree(_changeRef) {
        this._changeRef = _changeRef;
        this.items = [];
        this.childrenProperty = "children";
        this.displayProperty = "label";
        this.filter = "";
        this.order = [];
        this.reverse = false;
        this._flattenProps = [];
        this.onSelect = new EventEmitter();
        this._depth = 0;
    }
    Object.defineProperty(ItemTree.prototype, "flatten", {
        get: function () {
            return this._flattenProps;
        },
        set: function (flattenProps) {
            if (!this.isFlattened() && flattenProps.length > 0) {
                this._selectedItem = this._lastSelectedItem;
            }
            else if (this.isFlattened && flattenProps.length < 1) {
                this.flagIfParent();
            }
            this._flattenProps = flattenProps;
        },
        enumerable: true,
        configurable: true
    });
    ItemTree.prototype.ngAfterViewChecked = function () {
        if (this.childItemTree) {
            this.childItemTree._depth = this._depth + 1;
        }
    };
    ItemTree.prototype.ngOnInit = function () {
        this.flagIfParent();
    };
    ItemTree.prototype.selectItem = function (item) {
        this._selectedItem = item;
        if (this.childItemTree)
            delete this.childItemTree._selectedItem;
        this.bubbleSelect(item);
    };
    ItemTree.prototype.bubbleSelect = function (item) {
        this._lastSelectedItem = item;
        this.onSelect.emit(item);
    };
    ItemTree.prototype.isSelected = function (item) {
        return this._selectedItem === item;
    };
    ItemTree.prototype.display = function (item) {
        return item[this.displayProperty];
    };
    ItemTree.prototype.getChildren = function (item) {
        return item[this.childrenProperty] || [];
    };
    ItemTree.prototype.hasChildren = function (item) {
        return this.getChildren(item).length > 0;
    };
    ItemTree.prototype.isFlattened = function () {
        return this._flattenProps.length;
    };
    ItemTree.prototype.flagIfParent = function () {
        var _this = this;
        if (!this._lastSelectedItem) {
            return;
        }
        var findSubItem = function (item, target) {
            if (item === target)
                return true;
            if (_this.hasChildren(item)) {
                return _this.getChildren(item).find(function (subItem) {
                    return findSubItem(subItem, target);
                });
            }
            return false;
        };
        for (var i in this.items) {
            var item = this.items[i];
            if (item === this._lastSelectedItem ||
                findSubItem(item, this._lastSelectedItem)) {
                this._selectedItem = item;
                break;
            }
        }
        setTimeout(function () { _this._changeRef.detectChanges(); }, 1);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], ItemTree.prototype, "items", void 0);
    __decorate([
        Input("children"), 
        __metadata('design:type', String)
    ], ItemTree.prototype, "childrenProperty", void 0);
    __decorate([
        Input("display"), 
        __metadata('design:type', String)
    ], ItemTree.prototype, "displayProperty", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ItemTree.prototype, "filter", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ItemTree.prototype, "order", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], ItemTree.prototype, "reverse", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], ItemTree.prototype, "flatten", null);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], ItemTree.prototype, "onSelect", void 0);
    __decorate([
        ViewChild(ItemTree), 
        __metadata('design:type', ItemTree)
    ], ItemTree.prototype, "childItemTree", void 0);
    __decorate([
        Input("lastSelected"), 
        __metadata('design:type', Object)
    ], ItemTree.prototype, "_lastSelectedItem", void 0);
    ItemTree = __decorate([
        Component({
            selector: 'item-tree',
            template: "\n    <ul [ngClass]=\"{ flattened: isFlattened() }\">\n        <li *ngFor=\"let item of (items | flattenObjArray: flatten | filter: filter | orderBy: order:reverse)\"\n            [ngClass]=\"{ selected: isSelected(item), parent: hasChildren(item), root: _depth === 0 }\">\n            <a href=\"javascript:void(0)\" (click)=\"selectItem(item)\">{{ display(item) }}</a>\n            <item-tree\n                [items]=\"getChildren(item)\"\n                [children]=\"childrenProperty\"\n                [display]=\"displayProperty\"\n                [filter]=\"filter\"\n                [order]=\"order\"\n                [reverse]=\"reverse\"\n                [lastSelected]=\"_lastSelectedItem\"\n                (onSelect)=\"bubbleSelect($event)\"\n                *ngIf=\"!isFlattened() &&\n                    getChildren(item) &&\n                    isSelected(item)\"></item-tree>\n        </li>\n    </ul>\n    ",
            styles: []
        }), 
        __metadata('design:paramtypes', [ChangeDetectorRef])
    ], ItemTree);
    return ItemTree;
}());
//# sourceMappingURL=item-tree.js.map