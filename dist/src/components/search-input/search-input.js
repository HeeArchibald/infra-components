"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var SearchInput = (function () {
    function SearchInput(_elRef, _renderer) {
        this._elRef = _elRef;
        this._renderer = _renderer;
        this._delay = 200;
        this.onChange = new core_1.EventEmitter();
        this.searchTerms = new Subject_1.Subject();
    }
    Object.defineProperty(SearchInput.prototype, "delay", {
        get: function () {
            return this._delay;
        },
        set: function (d) {
            var _this = this;
            this._delay = d;
            this.observable = this.searchTerms
                .debounceTime(this.delay)
                .distinctUntilChanged();
            if (this.observer)
                this.observer.unsubscribe();
            this.observer = this.observable.subscribe(function (val) {
                _this.onChange.emit(val);
            });
        },
        enumerable: true,
        configurable: true
    });
    SearchInput.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.observable) {
            this.observable = this.searchTerms
                .debounceTime(this.delay)
                .distinctUntilChanged();
            this.observer = this.observable.subscribe(function (val) {
                _this.onChange.emit(val);
            });
        }
    };
    SearchInput.prototype.ngAfterViewInit = function () {
        var element = this._elRef.nativeElement;
        if (element && this.searchBox) {
            for (var i = 0; i < element.attributes.length; i++) {
                var attr = element.attributes[i];
                this._renderer.setElementAttribute(this.searchBox.nativeElement, attr.name, attr.value);
            }
        }
    };
    SearchInput.prototype.ngOnDestroy = function () {
        this.observer.unsubscribe();
    };
    SearchInput.prototype.search = function (str) {
        this.searchTerms.next(str);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], SearchInput.prototype, "delay", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], SearchInput.prototype, "onChange", void 0);
    __decorate([
        core_1.ViewChild("searchBox"), 
        __metadata('design:type', core_1.ElementRef)
    ], SearchInput.prototype, "searchBox", void 0);
    SearchInput = __decorate([
        core_1.Component({
            selector: 'search-input',
            template: "\n        <input type=\"search\" #searchBox (input)=\"search(searchBox.value)\"/>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], SearchInput);
    return SearchInput;
}());
exports.SearchInput = SearchInput;
//# sourceMappingURL=search-input.js.map