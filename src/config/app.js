const devApiUrl = 'http://qstour.klsfood.cn/';

//正式环境变量,注意修改
const proApiUrl = 'http://qstour.klsfood.cn/';

const nodeDevEnv = process.env.NODE_ENV=='development' ? true : false;

export default {
    nodeDevEnv:nodeDevEnv,
    apiUrl : nodeDevEnv ? devApiUrl : proApiUrl,
    apiPrefix : "",
    timeout:5000,
    cookiesExpires:7,
    countDown:60,//短信验证码倒计时
    tokenKey:'ACCESS_TOKEN',
    requestRetry:4,
    requestRetryDelay:800,
    shortLength:6, // 密码最小长度
    nav:{
        index:'首页',
        operation: '场馆管理',
        feature: '基地特色',
        setting:'设置',
        userCenter:'管理员中心'
    },
}
