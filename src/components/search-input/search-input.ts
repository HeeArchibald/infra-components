import { Component, Input, Output, EventEmitter, Renderer,
    ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core'
import { Subject }          from 'rxjs/Subject'
import { Observable }       from 'rxjs/Observable'
import { Subscription }     from 'rxjs/Subscription'

@Component({
    selector:'search-input',
    template: `
        <input type="search" #searchBox (input)="search(searchBox.value)"/>
    `
})
export class SearchInput implements OnInit, OnDestroy, AfterViewInit {

    constructor(private _elRef : ElementRef,
        private _renderer : Renderer){}

    /* Inputs / Outputs / View */

    @Input() private set delay(d : number) {
        this._delay = d
        this.observable = this.searchTerms
            .debounceTime(this.delay)
            .distinctUntilChanged()
        if(this.observer)
            this.observer.unsubscribe()
        this.observer = this.observable.subscribe(val => {
            this.onChange.emit(val)
        })
    }
    private get delay() {
        return this._delay
    }
    private _delay : number = 200

    @Output() private onChange : EventEmitter<string> = new EventEmitter<string>()

    @ViewChild("searchBox") private searchBox : ElementRef

    /* Internal logic */
    
    private searchTerms = new Subject<string>()
    private observable : Observable<string>
    private observer : Subscription

    ngOnInit() : void {
        if(!this.observable){
            this.observable = this.searchTerms
                .debounceTime(this.delay)
                .distinctUntilChanged()
            this.observer = this.observable.subscribe(val => {
                this.onChange.emit(val)
            })
        }
    }

    ngAfterViewInit() : void {
        let element = this._elRef.nativeElement
        if(element && this.searchBox) {
            for(let i = 0; i < element.attributes.length; i++){
                let attr = element.attributes[i]
                this._renderer.setElementAttribute(this.searchBox.nativeElement, attr.name, attr.value)
            }
        }
    }

    ngOnDestroy() : void {
        this.observer.unsubscribe()
    }

    search(str: string) {
        this.searchTerms.next(str)
    }

}
