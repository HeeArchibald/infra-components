import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: "flattenObjArray" })
export class FlattenObjectArrayPipe {

    transform(array: Array<Object>, onlyProps?: Array<String>) {
        if(!array){
            return []
        }
        if(onlyProps.length < 1){
            return array
        }

        let flattenedArray = Array.from(array)

        let flatten = array => {
            array.forEach(item => {
                for(let prop in item){
                    let val = item[prop]
                    if(val instanceof Array &&
                            !onlyProps ||
                            onlyProps.indexOf(prop) > -1){
                        flattenedArray = flattenedArray.concat(val)
                        flatten(val)
                    }
                }
            })
        }
        flatten(array)

        return flattenedArray

    }

}
