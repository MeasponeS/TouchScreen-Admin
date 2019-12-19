<template>
    <div id="app">
        <div class="loginContent">
            <div class="loginBox">
                <div class="title">青松研学游</div>
                <div class="main">
                    <div class="account">
                        <i class="iconfont">&#xe7ae;</i>
                        <el-input placeholder="请输入账户" v-model="account" />
                    </div>
                    <div class="password">
                        <i class="iconfont">&#xe7c9;</i>
                        <el-input  placeholder="请输入密码" v-model="password" />
                    </div>

                </div>
                <div class="login">
                    <el-button @click="submit">登录</el-button>
                </div>
            </div>
            <div class="company">
                Copyright © 2019 安徽京抖云数据科技有限公司
            </div>
        </div>
    </div>  
</template>

<script>
import {getPublic, login} from "../../api/login";
import {setToken} from "../../utils/dataStorage";
import md5 from 'js-md5'
export default {
    data() {
          return {
              account: '18056047515',
              password: '123456',
              publicKey: ''
          }
    },
    mounted() {
		getPublic({}).then(r=>{
			this.publicKey = r.data.public_key;
		}).catch(_=>{})

    },
    computed: {

    },
    methods: {
		submit(){
			if (!this.account || !this.password) {
				this.$message.error({message: '请输入用户名或密码',center: true});
				return;
            }
			let password = md5(this.password + this.publicKey);
			login({mobile:this.account,password: password}).then(res => {
				console.log(res);
				setToken('bearer '+res.data.token);
				this.$message({
					message: '登陆成功',
					type: 'success',center: true
				});
				setTimeout(() =>{ window.location.href = './home.html'},500); // 跳转到主页,用setTimeout是为了等待上一句设置用户信息完成} else {message.error(res.message);}}).finally(err => {this.setState({ loading: false });});
			})

        }
    },
    components:{

    }
}
</script>

