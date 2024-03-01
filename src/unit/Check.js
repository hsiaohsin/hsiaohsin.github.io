/**
 * 是否是空
 * @param value
 * @returns {boolean}
 */
function  isEmpty(value) {
    if (value === undefined || value === null) return true;
    let type = typeof value
    if (type === 'string') return value.trim().length === 0; // 字符串
    if (type === 'number' || type === 'boolean') return false; // 数字，布尔
    return Object.keys(value).length === 0 // 对象，数组
}
export {
    isEmpty
}
