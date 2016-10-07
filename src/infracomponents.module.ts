import './rxjs-extensions'

import { NgModule, ModuleWithProviders } from '@angular/core'
import * as deps from './module.dependencies'
import { DynamicModuleImports, LabelsService } from './services'

@NgModule({
    imports: deps.imports,
    declarations: deps.declarations,
    providers: [],
    exports: deps.exportList
})
export class InfraComponentsModule {
    static forRoot(providers): ModuleWithProviders {
        let usedProviders = [ 
            providers['DynamicModuleImports'] || DynamicModuleImports, 
            providers['LabelsService'] ||  LabelsService
        ]
        return {
            ngModule: InfraComponentsModule,
            providers: usedProviders
        };
    }
 }