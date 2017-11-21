import { ChangeDetectorRef } from '@angular/core';
import { ElementRef, EventEmitter, Renderer } from '@angular/core';
export declare class LightBox {
    private cdRef;
    private renderer;
    private host;
    constructor(cdRef: ChangeDetectorRef, renderer: Renderer, host: ElementRef);
    show: boolean;
    _show: boolean;
    onClose: EventEmitter<any>;
    section: ElementRef;
    overlay: ElementRef;
    private timer;
    onClick(event: MouseEvent): void;
    private close();
}
