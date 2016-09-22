import {
    NgModule,
    Component,
    ComponentRef,
    Directive,
    Input,
    ElementRef,
    ViewContainerRef,
    TemplateRef,
    Type,
    ReflectiveInjector,
    Compiler } from '@angular/core'

import { CommonModule } from '@angular/common'
import { InfraComponentsModule } from '../infracomponents.module'
import { DynamicModuleImports } from '../services/dynamicModuleImports'

@Directive({
    selector: 'dynamic-template'
})
export class DynamicTemplate {

    constructor(
        private elementRef: ElementRef,
        private viewContainer: ViewContainerRef,
        private compiler: Compiler,
        private dynamicModuleImports: DynamicModuleImports
    ){}

    private _html: string = ""
    private _selector = "dynamic-view"

    private _createDynamicComponent(): Type<any> {
        const metadata = {
            selector: this._selector,
            template: this._html,
            inputs: ['template']
        }
        class _cmp_{}
        _cmp_.prototype = this.context
        return Component(metadata)(_cmp_)
    }

    private _createDynamicModule(componentType: Type<any>) {
        class _mod_{}
        return NgModule({
            imports: [CommonModule, InfraComponentsModule ]
                .concat(this.dynamicModuleImports.imports),
            declarations: [componentType],
            providers: []
        })(_mod_)
    }

    @Input() private context: Object

    @Input("template") 
    set templateContents(html: string) {
        if (html) {
            this._html = html
            const cmpType = this._createDynamicComponent()
            const moduleType = this._createDynamicModule(cmpType)
            const injector = ReflectiveInjector.fromResolvedProviders([], this.viewContainer.parentInjector)

            this.compiler.compileModuleAndAllComponentsAsync<any>(moduleType)
                .then(factory => {
                    let cmpFactory: any
                    for (let i = factory.componentFactories.length - 1; i >= 0; i--) {
                        if (factory.componentFactories[i].selector === this._selector) {
                            cmpFactory = factory.componentFactories[i]
                            break;
                        }
                    }
                    return cmpFactory;
                })
                .then(cmpFactory => {
                    if (cmpFactory) {
                        this.viewContainer.clear()
                        this.viewContainer.createComponent(cmpFactory, 0, injector)
                    }
                });
        } else {
            this._html = ""
            this.viewContainer.clear()
        }
    }

}
