import { CommonModule }    from '@angular/common'
import { FormsModule }     from '@angular/forms'

import { UxPortal, SidePanel, PushPanel, ItemTree,
    SearchInput, MultiCombo, LightBox, Tooltip} from './components/index'
import { DynamicTemplate }  from './directives/index'
import { FilterPipe, OrderPipe,
    FlattenObjectArrayPipe, StorePipe } from './pipes/index'
import { DynamicModuleImports } from './services/dynamicModuleImports'

export let imports = [
    CommonModule,
    FormsModule
]
export let declarations = [
    UxPortal,
    SidePanel,
    PushPanel,
    ItemTree,
    SearchInput,
    MultiCombo,
    LightBox,
    FilterPipe,
    OrderPipe,
    StorePipe,
    FlattenObjectArrayPipe,
    DynamicTemplate,
    Tooltip
]

export let providers = [
    DynamicModuleImports
]

export let exportList = declarations
