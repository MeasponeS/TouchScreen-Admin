const devApiUrl = 'http://192.168.49.196:10003';

//正式环境变量,注意修改
const proApiUrl = 'https://hlwxtapi.hulian120.com';
//const proApiUrl = 'http://192.168.49.196:10003';

const nodeDevEnv = process.env.NODE_ENV=='development' ? true : false;

export default {
    nodeDevEnv:nodeDevEnv,
    apiUrl : nodeDevEnv ? devApiUrl : proApiUrl,
    apiPrefix : "",
    timeout:5000,
    cookiesExpires:7,
    countDown:60,//短信验证码倒计时
    tokenKey:'ACCESS_TOKEN',
    storageUserKey:'USER_STORAGE',
    storageOrgInfoKey:'ORGINFO_STORAGE',
    storageExamInfoKey:'EXAMINFO_STORAGE',//
    storageExamHistoryKey:'EXAMHISTORY_STORAGE',//
    storageMsgUnReadCountKey:'MSG_UNREAD_COUNT',
    requestRetry:4,
    requestRetryDelay:800,
    shortLength:6, // 密码最小长度
    nav:{
        index:'Home',
        blog:'Blog',
        register:'Projects',
        schedule:'Schedule',
        perfect:'Nest',
        contact:'Contact'
    },
}
