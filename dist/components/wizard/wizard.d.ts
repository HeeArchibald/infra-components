import { Renderer, AfterContentInit, QueryList, ElementRef, OnDestroy } from '@angular/core';
import { LabelsService } from '../../services';
export declare class Step {
    name: string;
    isActived: boolean;
    hasError: boolean;
    isFinished: boolean;
    test(): string;
}
export declare class Wizard implements AfterContentInit, OnDestroy {
    private labelsService;
    private renderer;
    private ref;
    constructor(labelsService: LabelsService, renderer: Renderer, ref: ElementRef);
    steps: QueryList<Step>;
    private activeStep;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private labels(label);
    private cancel();
    private previousStep();
    private nextStep();
    private canDoNext();
    private finish();
    private canDoFinish();
}
