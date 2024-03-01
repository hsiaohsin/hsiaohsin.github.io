// 浏览器辅助方法

/**
 * 浏览器最大化最小化，isMax代表是否最大化
 * @param isMax
 */
function windowMaxMin(isMax) {
    const docElm = document.documentElement;
    if(isMax){
        // 浏览器兼容
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
    }else{
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

/**
 * ie浏览器判断
 * @returns {boolean}
 */
function  isIE(){
    let userAgent = navigator.userAgent
    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    return isIE || isIE11
}
export {
    windowMaxMin,isIE
}
