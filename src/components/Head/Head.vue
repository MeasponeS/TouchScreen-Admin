<template>
    <div class="head-warp">
        <div class="head ">
            <div class="container" >
                <div class="left">
                    <img class="logo" src="./img/logo.jpg" alt="">
                    <div class="company">
                        <p>轻松研学趣青松</p>
                        <span>安徽省青松集团</span>
                    </div>
                </div>
                <ul class="nav">
                    <li v-for="(title,url) in nav">
                        <a :class="{active:activeUrl == url}" :href="url == 'blog'?'./'+ url:'./'+url +'.html'">{{ title }}</a>
                    </li>
                    <li class="logout">
                        <el-button @click="logout">退出登录</el-button>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
    import Config from '../../config/app.js'
	import {logout} from "../../api/login";

	export default {
        name: 'Head',
        props: {
            activeUrl: {
                type: String,
                default: '',
            },
        },
        data: function () {
            return {
                nav: Config.nav,
            }
        },
        methods: {
			logout() {
				this.$confirm('此操作将退出登录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showClose: false
				}).then(() => {
					logout({}).then(r=>{
						this.$message({
							type: 'success',
							message: '退出登录成功',
                            center: true
						});
						setTimeout(()=>{
							window.location.href = './login.html'
                        },2000)
					}).catch(_=>{})
				}).catch(() => {

				});
            }
        },
        mounted(){

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "../../assets/css/var.scss";
    .head-warp{
        width: 100%;
        height: 100px;
    }
    .head {
        z-index: 99;
        height: 100px;
        position:fixed ;
        left: 0;
        top: 0;
        width: 100%;
        background-color: #fff;
        box-shadow:-2px 3px 5px 0px rgba(174,174,174,0.14);
        .container {
            width: 100%;
            display: flex;
            height: 100%;
            justify-content: space-between;
            align-items: center;
            .left{
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .logo {
                /*width: 41px;*/
                height: 70px;
            }

            .company {
                display: inline-block;
                width: 250px;

                p {
                    font-size: 16px;
                    color: deepskyblue;
                    margin: 0 0 6px 0;
                    font-family: FontTwo;
                }

                span {
                    font-size: 20px;
                    font-family: FontThree;
                }
            }

            .nav {
                width: 1000px;
                // padding-left: 90px;
                list-style-type: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
                li {
                    float: left;
                    position: relative;

                    a {
                        font-size: 16px;
                        padding-bottom: 10px;
                        &:hover, &.active {
                            color: $--color-primary;
                            border-bottom: 2px solid $--color-primary;
                        }
                    }
                }
                .logout{
                    width: 200px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-left: 1px solid #e9e9e9;
                }
            }
        }
    }

</style>
