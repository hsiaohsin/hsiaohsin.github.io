
import {isEmpty} from "@/unit/Check";

export default {
    /**
     * 得到一个本地存储的值
     * @param key
     * @param defaultValue 默认值
     * @param parse 是否解析
     * @returns {string|*}
     */
    get(key,defaultValue,parse = true) {
        let value = localStorage.getItem(key)
        if(isEmpty(value) || value === "undefined"){
            return defaultValue
        }
        return parse ? JSON.parse(value):value
    },
    set(key, value) {
        localStorage.setItem(key,JSON.stringify(value))
    },
   /* gets(keys = []){
        const obj = {}
        keys.forEach(i=>{
            obj[i] = this.get(i)
        })
        return obj
    },*/
    /*sets(obj) {
        for(let key in obj){
            this.set(key,obj[key])
        }
    },
    has(key){
        let value = localStorage.getItem(key)
        return !isEmpty(value) && value !== "undefined"
    },
    clear(){
        localStorage.clear()
    },
    remove(key){
        localStorage.removeItem(key)
    },
    removes(keys = []){
        keys.forEach(key=>{
            localStorage.removeItem(key)
        })
    }*/
}
