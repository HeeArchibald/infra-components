import { Renderer, ElementRef, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
export declare class SearchInput implements OnInit, OnDestroy, AfterViewInit {
    private _elRef;
    private _renderer;
    constructor(_elRef: ElementRef, _renderer: Renderer);
    private delay;
    private _delay;
    private onChange;
    private searchBox;
    private searchTerms;
    private observable;
    private observer;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    search(str: string): void;
}
