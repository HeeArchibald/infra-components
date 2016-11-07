import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UxPortal, SidePanel, PushPanel, ItemTree, SearchInput, MultiCombo, LightBox, Tooltip } from './components/index';
import { DynamicTemplate } from './directives/index';
import { FilterPipe, OrderPipe, FlattenObjectArrayPipe, StorePipe } from './pipes/index';
export var imports = [
    CommonModule,
    FormsModule
];
export var declarations = [
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
];
export var exportList = declarations;
//# sourceMappingURL=module.dependencies.js.map