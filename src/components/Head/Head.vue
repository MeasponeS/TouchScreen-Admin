<template>
    <div class="head-warp">
        <div class="head ">
            <div class="container" >
                <img class="logo" src="./img/logo.jpg" alt="">
                <div class="company">
                    <p>Welcome</p>
                    <span>MeasponeS</span>
                </div>
                <ul class="nav">
                    <li v-for="(title,url) in nav">
                        <a :class="{active:activeUrl == url}" :href="'./'+ url +'.html'">{{ title }}</a>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
    import Config from '../../config/app.js'
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

        },
        mounted(){
            console.log(this.nav);
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
            display: flex;
            height: 100%;
            align-items: center;

            .logo {
                /*width: 41px;*/
                height: 70px;
            }

            .company {
                display: inline-block;
                min-width: 188px;
                margin-left: 10px;

                p {
                    font-size: 16px;
                    color: deepskyblue;
                    margin: 0 0 6px 0;
                }

                span {
                    font-size: 20px;
                }
            }

            .nav {
                flex: 1;
                // padding-left: 90px;
                list-style-type: none;
                display: flex;
                justify-content: space-around;
                align-items: center;
                li {
                    float: left;
                    margin-right: 46px;
                    position: relative;

                    a {
                        font-size: 18px;

                        &:hover, &.active {
                            color: $--color-primary;
                            border-bottom: 2px solid $--color-primary;
                        }
                    }

                    .msg-count {
                        font-size: 12px;
                        display: flex;
                        position: absolute;
                        top: -12px;
                        right: -20px;
                        align-items: center;
                        justify-content: center;
                        width: 20px;
                        height: 20px;
                        font-weight: normal;
                        border-radius: 50%;
                        background: #FF5555;
                        color: #fff;
                    }
                }
            }
        }
    }

</style>
