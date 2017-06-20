import { CommonModule }    from '@angular/common'
import { FormsModule }     from '@angular/forms'

import { UxPortal, SidePanel, PushPanel, ItemTree,
    SearchInput, MultiCombo, LightBox, Tooltip, Wizard, Step} from './components/index'
import { DynamicTemplate }  from './directives/index'
import { FilterPipe, OrderPipe, LimitPipe,
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
    LimitPipe,
    FlattenObjectArrayPipe,
    DynamicTemplate,
    Tooltip,
    Wizard,
    Step
]

export let exportList = declarations
