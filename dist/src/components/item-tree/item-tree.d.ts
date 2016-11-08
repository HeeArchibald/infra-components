/// <reference types="core-js" />
import { OnInit, ChangeDetectorRef } from '@angular/core';
export declare class ItemTree<T> implements OnInit {
    private _changeRef;
    constructor(_changeRef: ChangeDetectorRef);
    private items;
    private childrenProperty;
    private displayProperty;
    private filter;
    private order;
    private reverse;
    flatten: Array<String>;
    private _flattenProps;
    private disableOpener;
    private onSelect;
    private childItemTree;
    private _lastSelectedItem;
    private _selectedItem;
    private _depth;
    private unfolded;
    ngOnInit(): void;
    private selectItem(item);
    private bubbleSelect(item);
    private isSelected(item);
    private toggleFold(event, item);
    private isFolded(item);
    private display(item);
    private getChildren(item);
    private hasChildren(item);
    private isFlattened();
    private flagIfParent();
}
