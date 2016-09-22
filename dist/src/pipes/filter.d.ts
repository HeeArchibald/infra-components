import { PipeTransform } from '@angular/core';
export declare class FilterPipe implements PipeTransform {
    private _filterString(value, filter, arrayRef);
    private _filterObject(value, filter, arrayRef);
    private _filterFunction(value, filter, arrayRef);
    transform(array: Array<string | Object>, by: (string | Object | Function)): any[];
}
