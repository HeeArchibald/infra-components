import { CommonModule } from '@angular/common';
import { UxPortal, SidePanel, PushPanel, ItemTree, SearchInput, MultiCombo, LightBox } from './components/index';
import { DynamicTemplate, Tooltip } from './directives/index';
import { DynamicModuleImports } from './services/dynamicModuleImports';
export declare let imports: typeof CommonModule[];
export declare let declarations: (typeof UxPortal | typeof SidePanel | typeof PushPanel | typeof ItemTree | typeof SearchInput | typeof MultiCombo | typeof LightBox | typeof DynamicTemplate | typeof Tooltip)[];
export declare let providers: typeof DynamicModuleImports[];
export declare let exportList: (typeof UxPortal | typeof SidePanel | typeof PushPanel | typeof ItemTree | typeof SearchInput | typeof MultiCombo | typeof LightBox | typeof DynamicTemplate | typeof Tooltip)[];
