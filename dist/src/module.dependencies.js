"use strict";
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var index_1 = require('./components/index');
var index_2 = require('./directives/index');
var index_3 = require('./pipes/index');
var dynamicModuleImports_1 = require('./services/dynamicModuleImports');
exports.imports = [
    common_1.CommonModule,
    forms_1.FormsModule
];
exports.declarations = [
    index_1.UxPortal,
    index_1.SidePanel,
    index_1.PushPanel,
    index_1.ItemTree,
    index_1.SearchInput,
    index_1.MultiCombo,
    index_1.LightBox,
    index_3.FilterPipe,
    index_3.OrderPipe,
    index_3.StorePipe,
    index_3.FlattenObjectArrayPipe,
    index_2.DynamicTemplate,
    index_2.Tooltip
];
exports.providers = [
    dynamicModuleImports_1.DynamicModuleImports
];
exports.exportList = exports.declarations;
//# sourceMappingURL=module.dependencies.js.map