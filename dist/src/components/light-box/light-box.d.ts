import { ElementRef, EventEmitter, Renderer } from '@angular/core';
export declare class LightBox {
    private renderer;
    private host;
    constructor(renderer: Renderer, host: ElementRef);
    show: boolean;
    private _show;
    onClose: EventEmitter<any>;
    section: ElementRef;
    overlay: ElementRef;
    private timer;
    onClick(event: MouseEvent): void;
}
