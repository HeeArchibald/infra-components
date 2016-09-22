import { AfterViewChecked, OnInit, ChangeDetectorRef } from '@angular/core';
export declare class ItemTree<T> implements AfterViewChecked, OnInit {
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
    private onSelect;
    private childItemTree;
    private _lastSelectedItem;
    private _selectedItem;
    private _depth;
    ngAfterViewChecked(): void;
    ngOnInit(): void;
    private selectItem(item);
    private bubbleSelect(item);
    private isSelected(item);
    private display(item);
    private getChildren(item);
    private hasChildren(item);
    private isFlattened();
    private flagIfParent();
}
