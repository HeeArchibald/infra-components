import { 
    Component, Input, Renderer, 
    ContentChildren, AfterContentInit, QueryList, 
    ElementRef,
    OnDestroy } from '@angular/core'
import { LabelsService } from '../../services'


@Component({
    selector : 'step',
    template: `<ng-content></ng-content>`,
    styles: [`
        :host {
            display: none;
            overflow: auto;
            padding : 1em;
        }
        :host.active {
            display: block;
        }
    `]
})
export class Step {
    @Input() name:string; 
    @Input() isActived:boolean; 
    hasError:boolean = false;
    isFinished:boolean = false;

    public test() : string {
        return "TEST !! " + name; 
    } 
}

@Component({
    selector: 'wizard',
    template: `
        <nav class="steps-progress-menu">
            <ul>
                <li *ngFor="let step of steps" 
                    [class.active]="step.isActived"
                    [class.finish]="step.isFinished">
                    {{step.name}}
                </li>
            </ul>
        </nav>
        <section class="steps-content">
            <ng-content select="step"></ng-content>
            <nav class="steps-nav-button">
                <button class="cancel" (click)="cancel()" [title]="labels('cancel')">
                    {{ labels('cancel') }}
                </button>
                <button class="previous" (click)="previousStep();" 
                    *ngIf="activeStep > 0" 
                    [title]="labels('previous')">
                    {{ labels('previous') }}
                </button>
                <button class="next" (click)="nextStep();" 
                    *ngIf="activeStep < steps.length - 1" ng-disabled="!canDoNext()"
                    [title]="labels('next')">
                    {{ labels('next') }}
                </button>
                <button class="finish" 
                    *ngIf="activeStep === steps.length - 1" 
                    (click)="finish()" ng-disabled="!canDoFinish()"
                    [title]="labels('finish')">
                    {{ labels('finish') }}
                </button>
            </nav>
        </section>
    `,
    styles: [`
        :host {
            display: block;
            overflow: auto;
            background-color: #ccc;
        }
        section.steps-content {
            float: right;
            width: 75%;
            background: #fff;
        }
        nav.steps-progress-menu {
            float: left;
            width: 24%;
            background-color: transparent;
        }
        nav.steps-progress-menu ul li {
            list-style-type: none;
            padding: 7px;
        }
        nav.steps-progress-menu ul li.active,
        nav.steps-progress-menu ul li.finish {
            font-weight: bold;
        }
        nav.steps-progress-menu ul li.finish {
            color: green;
        }
        nav.steps-nav-button {
            text-align : right;
        }
    `]
})
export class Wizard  implements AfterContentInit, OnDestroy {

    constructor(
            private labelsService: LabelsService,
            private renderer : Renderer,
            private ref : ElementRef)
    {}
    
    @ContentChildren(Step) steps: QueryList<Step>;
    private activeStep:number = 0;

    ngAfterContentInit() {
        if (this.steps.length == 0) 
            throw new Error("<wizard> component musts nest at least 1 <step> compoent")
    }

    ngOnDestroy() : void {
    }

    private labels(label){
        return this.labelsService.getLabel(label)
    }

    private cancel() {}

    private previousStep() {
        if (this.activeStep > 0) {
            this.steps.toArray()[this.activeStep].isActived = false;
            this.steps.toArray()[this.activeStep -1].isActived = true;
            this.activeStep--;
        } 
    }

    private nextStep() {
        if (this.activeStep < this.steps.length -1) {
            this.steps.toArray()[this.activeStep].isActived = false;
            this.steps.toArray()[this.activeStep + 1].isActived = true;
            this.activeStep++;
        }
    }

    private canDoNext():boolean {
        return true;
    }

    private finish() {}

    private canDoFinish():boolean {
        return true;
    }

}
