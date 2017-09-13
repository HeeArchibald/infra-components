import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'filter', pure: false})
export class FilterPipe implements PipeTransform {

    private stringFullCompare(str1: string, str2: string) : boolean {
        return str1.match(new RegExp(str2, 'i')) !== null
    }

    private _filterString(value, filter, arrayRef: Array<String>) {
        if(typeof value === "string" &&
                typeof filter === "string" &&
                filter.trim() &&
                this.stringFullCompare(value, filter)) {
            arrayRef.push(value)
            return true
        }
        return false
    }

    private _filterObject(value, filter, objectRef, arrayRef: Array<Object>) {
         if (typeof value == "object" && typeof filter === "object") {
            let check = true
            for(let property in filter) {
                if(!check)
                    break;

                let filterValue = filter[property]
                let checkedValue = value[property]

                if(typeof filterValue === "string" && typeof checkedValue === "string") {
                    check = this.stringFullCompare(checkedValue, filterValue)
                } else if(filterValue instanceof Array && typeof checkedValue === "string") {
                    for(let i = 0; i < filterValue.length; i++) {
                        check = this.stringFullCompare(checkedValue, filterValue[i])
                        if(check) break;
                    }
                } else if(filterValue instanceof Function) {
                    check = filterValue(checkedValue)
                } else if (filterValue instanceof Object) {
                    return this._filterObject(checkedValue, filterValue, objectRef, arrayRef);
                } 
            }
            if(check){
                arrayRef.push(objectRef)
            }
            return true
        }
        return false
    }

    private _filterFunction(value, filter, arrayRef: Array<any>) {
            if(typeof filter === "function"){
                if(filter(value)){
                    arrayRef.push(value)
                }
                return true
            }
            return false
    }

    transform(array: Array<string | Object>, by: (string | Object | Function)) {
        if(!array || !by){
            return array
        }

        let filteredArray = []

        array.forEach(item => {
            this._filterString(item, by, filteredArray) ||
                this._filterObject(item, by, item, filteredArray) ||
                    this._filterFunction(item, by, filteredArray)
        })

        return filteredArray
    }

}
