import { Component, Input, Output, EventEmitter,
    ViewChild, AfterViewChecked, OnInit, ChangeDetectorRef } from '@angular/core'

@Component({
    selector: 'item-tree',
    template: `
    <ul [ngClass]="{ flattened: isFlattened() }">
        <li *ngFor="let item of (items | flattenObjArray: flatten | filter: filter | orderBy: order:reverse)"
            [ngClass]="{ selected: isSelected(item), parent: hasChildren(item), root: _depth === 0 }">
            <a href="javascript:void(0)" (click)="selectItem(item)">{{ display(item) }}</a>
            <item-tree
                [items]="getChildren(item)"
                [children]="childrenProperty"
                [display]="displayProperty"
                [filter]="filter"
                [order]="order"
                [reverse]="reverse"
                [lastSelected]="_lastSelectedItem"
                (onSelect)="bubbleSelect($event)"
                *ngIf="!isFlattened() &&
                    getChildren(item) &&
                    isSelected(item)"></item-tree>
        </li>
    </ul>
    `,
    styles: []
})
export class ItemTree<T> implements AfterViewChecked, OnInit {

    constructor(private _changeRef: ChangeDetectorRef){}

    /**** Inputs ****/
    
    //Items
    @Input() private items: Array<T> = []

    // Property containing the list of child objects.
    @Input("children") 
    private childrenProperty: string = "children"
    // Property to display in the list 
    @Input("display") 
    private displayProperty: string = "label"
    // Filter pipe argument 
    @Input() private filter: (Object | string | Function) = ""
    // OrderBy pipe argument
    @Input() private order: (Array<any> | string | Function) = []
    // Reverse the order pipe
    @Input() private reverse: boolean = false
    // Flatten the tree on the specified properties
    @Input()
    set flatten(flattenProps: Array<String>) {
        if(!this.isFlattened() && flattenProps.length > 0) {
            this._selectedItem = this._lastSelectedItem
        } else if(this.isFlattened && flattenProps.length < 1) {
            this.flagIfParent()
        }
        this._flattenProps = flattenProps
    }
    get flatten() {
        return this._flattenProps
    }
    private _flattenProps = []

    /**** Outputs ****/

    @Output() private onSelect: EventEmitter<T> = new EventEmitter<T>()

    /**** View ****/

    @ViewChild(ItemTree)
    private childItemTree: ItemTree<T>

    /**** Internal Logic ****/

    @Input("lastSelected") private _lastSelectedItem : T
    private _selectedItem : T
    private _depth = 0

    ngAfterViewChecked() : void {
        if(this.childItemTree){
            this.childItemTree._depth = this._depth + 1
        }
    }

    ngOnInit(){
        this.flagIfParent()
    }

    private selectItem(item: T) {
        this._selectedItem = item
        if(this.childItemTree)
            delete this.childItemTree._selectedItem
        this.bubbleSelect(item)
    }

    private bubbleSelect(item: T) {
        this._lastSelectedItem = item
        this.onSelect.emit(item)
    }

    private isSelected(item) {
        return this._selectedItem === item
    }

    private display(item) {
        return item[this.displayProperty]
    }

    private getChildren(item) {
        return item[this.childrenProperty] || []
    }

    private hasChildren(item) {
        return this.getChildren(item).length > 0
    }

    private isFlattened() {
        return this._flattenProps.length
    }

    private flagIfParent() {
        if(!this._lastSelectedItem){
            return
        }

        let findSubItem = (item, target) => {
            if(item === target)
                return true
            if(this.hasChildren(item)){
                return this.getChildren(item).find(subItem => {
                     return findSubItem(subItem, target)
                 })
            }
            return false
        }

        for(let i in this.items) {
            let item = this.items[i]

            if(item === this._lastSelectedItem ||
                    findSubItem(item, this._lastSelectedItem)){
                this._selectedItem = item
                break;
            }
        }

        setTimeout(() => {this._changeRef.detectChanges()}, 1)
    }

}
