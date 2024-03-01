import {isEmpty} from "@/unit/Check";

export default {
    /**
     * 得到一个会话存储的值
     * @param key
     * @param defaultValue 默认值
     * @param parse 是否解析
     * @returns {string|*}
     */
    get(key, defaultValue, parse = true) {
        let value = sessionStorage.getItem(key)
        if (isEmpty(value) || value === "undefined") {
            return defaultValue
        }
        return parse ? JSON.parse(value) : value
    },
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
    }
}
