import Axios from 'axios'
import Config from '../config/app.js'
import {getToken,removeToken} from '../utils/dataStorage.js'
import {Message} from "element-ui";

const service = Axios.create({
    baseURL: Config.apiUrl + '/' + Config.apiPrefix,
    headers: {
        'Accept': '*/*'
    },
    timeout: Config.timeout
});
service.defaults.retry = Config.requestRetry;
service.defaults.retryDelay = Config.requestRetryDelay;

service.interceptors.request.use(
    config => {
        // if(!config.closeLoading){
        //     window.loadingInstance = Loading.service();
        // }
        config.headers['Authorization'] = getToken();
        //let noParameters = config.url.indexOf('?')  == -1;
        // //
        //config.url = noParameters ? config.url+'?access_token=' + getToken(): config.url+'&access_token='+ getToken();
        
        return config
    },
    error => {
        Promise.reject(error)
    }
);



service.interceptors.response.use(
    
    response => {//Grade
        return response.data;
    },
    error => {
        
        const { response } = error;
        if(!response || !response.status) return;
        Message.error(response.data.message);
        console.log(response.data,"______");
        if(response.status === 401 || response.data['status_code'] === 500){
            removeToken();
            Message.info('登录状态失效,即将跳转至登录页');
            setTimeout(()=>{
                window.location.href = './login.html'
            },2000);
        }
        return Promise.reject(error)//千万不能去掉，，，否则请求超时会进入到then方法，导致逻辑错误。
    }
);

export default service
