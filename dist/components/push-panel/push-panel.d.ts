import { ElementRef } from '@angular/core';
export declare class PushPanel {
    private _eref;
    constructor(_eref: ElementRef);
    private toggle;
    _opened: boolean;
    private opener;
    private onClose;
    private inside;
    private onClick(event);
}
