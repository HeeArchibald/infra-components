import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core'

@Component({
    selector: 'side-panel',
    template: `<div [ngClass]="{ opened: _opened }"><ng-content></ng-content></div>`,
    styles: [`
        div {
            position: fixed;
            z-index: 10;
            overflow-x: hidden;
            overflow-y: scroll;
            height: 100%;
            top: 0px;
            left: -30%;
            width: 30%;
            transition: transform 0.25s;
        }
        div.opened {
            transform: translateX(100%);
        }
    `],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class SidePanel{
    private _opened: boolean;

    constructor(private _eref: ElementRef){}

    @Input() private set toggle(toggle: boolean){
        this._opened = toggle
    }
    @Input() private opener
    @Output() private onClose = new EventEmitter<boolean>();

    private onClick(event) {
        let checkOpener = this.opener &&
            (this.opener.contains && this.opener.contains(event.target)) ||
            (this.opener.nativeElement && this.opener.nativeElement.contains(event.target))

        if (this._opened &&
            !this._eref.nativeElement.contains(event.target) &&
            !checkOpener){
            this._opened = false
            this.onClose.emit()
        }
        return true
    }

}
