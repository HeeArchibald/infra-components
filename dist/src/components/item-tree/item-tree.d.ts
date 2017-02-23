import { EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
export declare class ItemTree<T> implements OnInit {
    private _changeRef;
    constructor(_changeRef: ChangeDetectorRef);
    items: Array<any>;
    childrenProperty: string;
    displayProperty: string;
    filter: (Object | string | Function);
    order: (Array<any> | string | Function);
    reverse: any;
    flatten: Array<String>;
    private _flattenProps;
    disableOpener: boolean;
    onSelect: EventEmitter<T>;
    childItemTree: ItemTree<T>;
    _lastSelectedItem: T;
    private _selectedItem;
    _depth: number;
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
    isFlattened(): number;
    private flagIfParent();
}
