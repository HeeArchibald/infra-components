import './rxjs-extensions'

import { ModuleWithProviders, NgModule, Provider } from '@angular/core'
import * as deps from './module.dependencies'
import { DynamicModuleImports, LabelsService } from './services'

@NgModule({
    imports: deps.imports,
    declarations: deps.declarations,
    providers: [],
    exports: deps.exportList
})
export class InfraComponentsModule {

    static forRoot(labelsProvider: Provider): ModuleWithProviders {
        return {
            ngModule: InfraComponentsModule,
            providers: [
                DynamicModuleImports,
                labelsProvider || LabelsService
            ]
        };
    }

     static forChild() : ModuleWithProviders {
        return {
            ngModule: InfraComponentsModule,
            providers: []
        }
    }
 }