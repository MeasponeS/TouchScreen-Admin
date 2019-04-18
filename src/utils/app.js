/**
 * url参数转换为js对象
 * @param key
 * @returns {*}
 */
export function currentUrlToParams(key = null) {
    let paramsUrl = (window.location.href).split('?');
    if(paramsUrl.length<2)return key ? null : {};
    let paramsArr = paramsUrl[1].split('&');
    let paramsData = {}
    paramsArr.forEach(r=>{
        let data = r.split('=')
        paramsData[data[0]] = data[1]
    })
    if(key)return paramsData.hasOwnProperty(key) ? paramsData[key] : null;
    return paramsData;
}

/**
 * 初始化url参数
 */
export function initUrlParams() {
    window.URlPARAMS = currentUrlToParams();
}

/**
 * 数据克隆
 * @param obj
 * @returns {any}
 */
export function clone(obj) {
    let strData = JSON.stringify(obj)
    return JSON.parse(strData);
}

/**
 * 根据数组对象里面的key排序
 * @param key
 * @param desc   true 倒序
 * @returns {function(*, *): number}
 */
export function objSort(key,desc) {
    return function(a,b){
        //return desc ? ~~(parseInt(a[key]) < parseInt(b[key])) : ~~(parseInt(a[key]) > parseInt(b[key]));解决简单的json数组还行，但是遇到复杂重复比较多的数就不行了
        return desc ? ((parseInt(a[key]) < parseInt(b[key]))?1:((parseInt(a[key]) > parseInt(b[key]))?-1:0)):((parseInt(a[key]) < parseInt(b[key]))?-1:((parseInt(a[key]) > parseInt(b[key]))?1:0))  //杠杠的，注意括号就是！

    }
}

