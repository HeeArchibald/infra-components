import { Component, Input, OnInit,
    Output, EventEmitter, Renderer,
    ElementRef } from '@angular/core'
import { LabelsService } from '../../services'

@Component({
    selector:'multi-combo',
    template: `
    <button (click)="toggleVisibility()"
        [ngClass]="{ opened: show }"
        [disabled]="disabled">
        {{ title }}
    </button>
    <div [ngClass]="{ hidden: !show }">
        <div class="options">
            <button class="select-all" (click)="selectAll()" *ngIf="!max" 
                [title]="labels('select.all')">{{ labels('select.all') }}</button>
            <button class="deselect-all" (click)="deselectAll()" 
                [title]="labels('deselect.all')">{{ labels('deselect.all') }}</button>
        </div>
        <div *ngIf="filter" class="filter">
            <search-input (onChange)="search.input = $event" [attr.placeholder]="labels('search')"></search-input>
        </div>
        <ul>
            <li *ngFor="let item of _comboModel | filter: getFilter() | orderBy: orderBy | store: self:'filteredComboModel'"
                (click)="toggleItem(item)"
                [ngClass]="{ selected: isSelected(item) }"
                [attr.disabled]="isDisabled()">
                {{ displayItem(item) }}
            </li>
        </ul>
    </div>
    `,
    styles: [`
    :host {
        position: relative;
    }

    :host > button {
        min-width: 150px;
    }

    :host > div {
        position: absolute;
        z-index: 2;
        left: 0px;
        overflow: hidden;
        background:white;
        border: 2px solid black;
    }

    :host > div.hidden {
        max-height: 0px;
        border-width: 0px;
    }

    :host > div>div.options {
    }

    :host > div>div.options>* {
        display: inline-block;
        vertical-align: middle;
    }

    :host > div>div.options>button {
    }
    :host > div>div.options>button:hover {
    }

    :host > div>div.filter {
        margin: 10px 0px;
        width: 100%;
        position: relative;
    }

    :host > div>div.filter input {
        width: 100%;
    }

    :host > div>div.filter input:focus {
    }

    :host > div>ul {
        list-style: none;
        padding: 0px;
        overflow-y: scroll;
        max-height: 200px;
    }

    :host > div>ul>li {
        white-space: nowrap;
        cursor: pointer;
    }

    :host > div>ul>li.selected {
    }

    :host > div>ul>li:not(.selected):not([disabled]):hover {
    }

    :host > div>ul>li:not(.selected)[disabled="true"] {
        pointer-events: none;
    }`],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class MultiCombo {

    constructor(private _eref: ElementRef, private _renderer: Renderer, 
        private _labelsService: LabelsService){}
    private self = this
    private labels(label){
        return this._labelsService.getLabel(label)
    }

    /**** Inputs ****/
    @Input()
    private set comboModel(model){
        this._comboModel = model

        if (!model) {
            this.filteredModel = []
            return
        }

        for (let i = 0; i < this.filteredModel.length; i++) {
            var idx = model.indexOf(this.filteredModel[i])
            if (idx < 0) {
                this.filteredModel.splice(idx, 1)
                i--
            }
        }
    }
    private _comboModel = []

    @Input("outputModel") private filteredModel = []

    @Input() private title: string = "Select"
    @Input() private display: string
    @Input() private filter: string
    @Input() private orderBy: (string | Array<(string | Function)> | Function)
    @Input() private reverse: boolean = false
    @Input("max") private maxSelected: number
    @Input() private disabled: boolean = false

     /**** Outputs ****/

    @Output() private onSelectItem = new EventEmitter<any>()
    @Output() private onDeselectItem = new EventEmitter<any>()
    @Output("outputModelChange") private filteredModelChange = new EventEmitter<any>()
    @Output() private onOpen = new EventEmitter<any>()
    @Output() private onClose = new EventEmitter<any>()

    /**** Internal logic ****/

    private filteredComboModel = []

    private search = {
        input: '',
        reset: function() {
            this.input = ""
        }
    }

    private show = false
    private toggleVisibility() {
        this.show = !this.show
        if(this.show) {
            this.search.reset()
            this.onOpen.emit()
        } else {
             this.onClose.emit()
        }
    }

    private isSelected(item) {
        return this.filteredModel.indexOf(item) >= 0
    }

    private isDisabled() {
        return this.maxSelected &&
            this.maxSelected <= this.filteredModel.length
    }

    private toggleItem(item) {
        let idx = this.filteredModel.indexOf(item)
        if (idx >= 0) {
            this.filteredModel.splice(idx, 1);
            this.onDeselectItem.emit(item)
        } else if (!this.maxSelected ||
                this.filteredModel.length < this.maxSelected) {
            this.filteredModel.push(item);
            this.onSelectItem.emit(item)
        }
        this.filteredModelChange.emit(this.filteredModel)
    }

    private selectAll() {
        this.filteredModel = []
        for (let i = 0; i < this.filteredComboModel.length; i++) {
            this.filteredModel.push(this.filteredComboModel[i])
        }
        this.filteredModelChange.emit(this.filteredModel)
    }

    private deselectAll() {
        this.filteredModel = []
        this.filteredModelChange.emit(this.filteredModel)
    }

    private displayItem(item) {
        return item instanceof Object ?
            this.display ?
                item[this.display] :
                item.toString() :
            item
    }

    private onClick(event) {
        if (this.show && !this._eref.nativeElement.contains(event.target)) {
            this.toggleVisibility()
        }
        return true
    }

    private getFilter() {
        if(!this.filter)
            return ""
        let filter = {}
        filter[this.filter] = this.search.input
        return filter
    }

}
