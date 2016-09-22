import './rxjs-extensions'

import { NgModule, ModuleWithProviders } from '@angular/core'
import * as deps    from './module.dependencies'
import { DynamicModuleImports, LabelsService } from './services'

@NgModule({
    imports: deps.imports,
    declarations: deps.declarations,
    providers: deps.providers,
    exports: deps.exportList
})
export class InfraComponentsModule {
    static forRoot(providers): ModuleWithProviders {
        return {
            ngModule: InfraComponentsModule,
            providers: providers
        };
    }
 }