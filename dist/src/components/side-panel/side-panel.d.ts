import { ElementRef } from '@angular/core';
export declare class SidePanel {
    private _eref;
    private _opened;
    constructor(_eref: ElementRef);
    private toggle;
    private opener;
    private onClose;
    private onClick(event);
}
