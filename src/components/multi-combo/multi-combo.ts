import { Component, Input, OnInit,
    Output, EventEmitter, Renderer,
    ElementRef } from '@angular/core'
import { LabelsService } from '../../services'

@Component({
    selector:'multi-combo',
    templateUrl: './multi-combo.html',
    styleUrls: ['./multi-combo.css'],
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
