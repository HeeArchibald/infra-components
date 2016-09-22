import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {

    private _filterString(value, filter, arrayRef: Array<String>) {
        if(typeof value === "string" &&
                typeof filter === "string" &&
                filter.trim() &&
                value.match(new RegExp(filter, 'i'))){
            arrayRef.push(value)
            return true
        }
        return false
    }

    private _filterObject(value, filter, arrayRef: Array<Object>) {
         if (typeof value == "object" &&
                typeof filter === "object") {
            let check = true
            for(let property in filter){
                if(value[property] && typeof value[property] === "string") {
                    if(!(<string> value[property]).match(new RegExp(filter[property], 'i'))) {
                        check = false
                        break;
                    }
                }
            }
            if(check){
                arrayRef.push(value)
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
                this._filterObject(item, by, filteredArray) ||
                    this._filterFunction(item, by, filteredArray) ||
                        (filteredArray = array)
        })

        return filteredArray
    }

}
