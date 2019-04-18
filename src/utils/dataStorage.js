import Storage from 'good-storage'
import Cookies from 'js-cookie'
import Config from '../config/app.js'
import {initUrlParams} from './app.js'

/**
 *
 * @param key
 * @returns {*}
 */
export function getUserInfo(key = null){
    let userInfo = Storage.get(Config.storageUserKey);
    if(key)return userInfo.hasOwnProperty(key) ? userInfo[key] : null;
    return userInfo;
}

/**
 *
 * @param user
 * @returns {*}
 */
export function saveUserInfo(user){
    Storage.set(Config.storageUserKey,user);
    return user;
}

/**
 *
 * @param key
 * @returns {*}
 */
export function getUrlInfo(key = null){
    if(!window.URlPARAMS)initUrlParams();
    if(key)return window.URlPARAMS.hasOwnProperty(key) ? window.URlPARAMS[key] : null;
    return window.URlPARAMS;
}


/**
 *
 * @param orgInfo
 * @returns {*}
 */
export function saveOrgInfo(orgInfo){
    return Storage.session.set(Config.storageOrgInfoKey,orgInfo)
}

/**
 *
 * @returns {*}
 */
export function getOrgInfo(){
    return Storage.session.get(Config.storageOrgInfoKey)
}

/**
 *
 * @returns {*}
 */
export function getToken() {
    return Cookies.get(Config.tokenKey)
}

/**
 *
 * @param token
 * @returns {*}
 */
export function setToken(token) {
    return Cookies.set(Config.tokenKey, token ,{ expires: Config.cookiesExpires })
}

/**
 *
 * @returns {*}
 */
export function removeToken() {
    return Cookies.remove(Config.tokenKey)
}


export function saveMsgCount(count) {
    Storage.set(Config.storageMsgUnReadCountKey,count);
    return count;
}

export function decrMsg() {
    let count = Storage.get(Config.storageMsgUnReadCountKey);
    if(count <= 0){
        Storage.set(Config.storageMsgUnReadCountKey,0);
        return 0;
    }
    count --;

    Storage.set(Config.storageMsgUnReadCountKey,count);
    return count;

}
export function incrMsg() {
    let count = Storage.get(Config.storageMsgUnReadCountKey);
    count ++;
    Storage.set(Config.storageMsgUnReadCountKey,count);
    return count;
}

export function getMsgCount() {
    return Storage.get(Config.storageMsgUnReadCountKey);
}

export function isLogin() {
    return getToken() && getUserInfo()
}
