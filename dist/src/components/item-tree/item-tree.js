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
var ItemTree = ItemTree_1 = (function () {
    function ItemTree(_changeRef) {
        this._changeRef = _changeRef;
        this.items = [];
        this.childrenProperty = "children";
        this.displayProperty = "label";
        this.filter = "";
        this.order = [];
        this.reverse = false;
        this._flattenProps = [];
        this.disableOpener = false;
        this.onSelect = new EventEmitter();
        this._depth = 0;
        this.unfolded = [];
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
    ItemTree.prototype.ngOnInit = function () {
        this.flagIfParent();
    };
    ItemTree.prototype.selectItem = function (item) {
        this._selectedItem = item;
        if (this.childItemTree)
            delete this.childItemTree._selectedItem;
        var idx = this.unfolded.indexOf(item);
        if (!this.disableOpener && idx < 0) {
            this.unfolded.push(item);
        }
        this.bubbleSelect(item);
    };
    ItemTree.prototype.bubbleSelect = function (item) {
        this._lastSelectedItem = item;
        this.onSelect.emit(item);
    };
    ItemTree.prototype.isSelected = function (item) {
        return (this.disableOpener ? this._selectedItem : this._lastSelectedItem) === item;
    };
    ItemTree.prototype.toggleFold = function (event, item) {
        event.stopPropagation();
        var idx = this.unfolded.indexOf(item);
        if (idx < 0) {
            this.unfolded.push(item);
        }
        else {
            this.unfolded.splice(idx, 1);
        }
    };
    ItemTree.prototype.isFolded = function (item) {
        return this.disableOpener ? !this.isSelected(item) : this.unfolded.indexOf(item) < 0;
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
                this.unfolded = [item];
                break;
            }
        }
        this._changeRef.markForCheck();
    };
    return ItemTree;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], ItemTree.prototype, "items", void 0);
__decorate([
    Input("children"),
    __metadata("design:type", String)
], ItemTree.prototype, "childrenProperty", void 0);
__decorate([
    Input("display"),
    __metadata("design:type", String)
], ItemTree.prototype, "displayProperty", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ItemTree.prototype, "filter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ItemTree.prototype, "order", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ItemTree.prototype, "reverse", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], ItemTree.prototype, "flatten", null);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ItemTree.prototype, "disableOpener", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ItemTree.prototype, "onSelect", void 0);
__decorate([
    ViewChild(ItemTree_1),
    __metadata("design:type", ItemTree)
], ItemTree.prototype, "childItemTree", void 0);
__decorate([
    Input("lastSelected"),
    __metadata("design:type", Object)
], ItemTree.prototype, "_lastSelectedItem", void 0);
__decorate([
    Input("depth"),
    __metadata("design:type", Number)
], ItemTree.prototype, "_depth", void 0);
ItemTree = ItemTree_1 = __decorate([
    Component({
        selector: 'item-tree',
        template: "\n    <ul [ngClass]=\"{ flattened: isFlattened() }\">\n        <li *ngFor=\"let item of (items | flattenObjArray: flatten | filter: filter | orderBy: order:reverse)\"\n            [ngClass]=\"{ selected: isSelected(item), unfolded: !isFolded(item), parent: hasChildren(item), root: _depth === 0 }\">\n            <a href=\"javascript:void(0)\" (click)=\"selectItem(item)\">\n                <i class=\"opener\" (click)=\"toggleFold($event, item)\"\n                    *ngIf=\"!isFlattened() && hasChildren(item) && !disableOpener\"></i>\n                {{ display(item) }}\n            </a>\n            <item-tree\n                [items]=\"getChildren(item)\"\n                [children]=\"childrenProperty\"\n                [display]=\"displayProperty\"\n                [filter]=\"filter\"\n                [order]=\"order\"\n                [reverse]=\"reverse\"\n                [lastSelected]=\"_lastSelectedItem\"\n                [depth]=\"depth + 1\"\n                [disableOpener]=\"disableOpener\"\n                (onSelect)=\"bubbleSelect($event)\"\n                *ngIf=\"!isFlattened() && hasChildren(item) && !isFolded(item)\">\n            </item-tree>\n        </li>\n    </ul>\n    ",
        styles: []
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef])
], ItemTree);
export { ItemTree };
var ItemTree_1;
//# sourceMappingURL=item-tree.js.map