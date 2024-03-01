/**
 * 整随范围整数
 * @param min
 * @param max
 * @returns {number}
 */
function random(min,max) {
    // 如果只传入一个值,则是[0-start]
    if(max === undefined){
        return Math.floor(Math.random()*(min+1));
    }
    return Math.floor(Math.random()*(max-min+1)+min);
}

/**
 * 序列数字，类似python，但包括头尾
 * @param min
 * @param max
 * @param step
 * @returns {Array}
 */
function range(min,max,step = 1) {
    // 如果只传入一个值,则是0-start
    let arr = []
    let index = 0;
    if(max === undefined){
        max = min;
        min = 0
    }
    for (let i = min; i <= max; i = i+step) {
        arr[index++] = i
    }
    return arr;
}

/**
 * 序列字母
 * @param min
 * @param max
 * @returns {string[]}
 */
function rangeStr(min,max){
    // 通过字母的ASCII码字符获取对应的十进制范围
    let arr = range(min.charCodeAt(),max.charCodeAt())
    // 根据数字范围生成ASCII码字符
    return arr.map(i=>String.fromCharCode(i))
}
/**
 * 从集合中获取随机数
 * @param arr
 * @param count
 * @returns {Array}
 */
function randomForArr(arr,count = 1){
    let _arr = [...arr] // 浅拷贝数组
    let items = []
    for (let i = 0; i < count; i++) {
        if(_arr.length>0){
            let rand = Math.floor(Math.random()*_arr.length)
            items.push(_arr[rand])
            _arr.splice(rand,1)
        }else{
            break
        }
    }
    items.sort((a,b)=>a.index-b.index)
    return items
}
export {
    random,range,rangeStr,randomForArr
}
