import { Renderer, ElementRef } from '@angular/core';
export declare class Tooltip {
    private ref;
    private renderer;
    constructor(ref: ElementRef, renderer: Renderer);
    private tooltipContents;
    private position;
    private offset;
    private tooltipElt;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onTransitionEnd: () => void;
    private getPosition(elt, tip, pos);
    ngOnDestroy(): void;
}
