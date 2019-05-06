<template>
    <div id="app">
        <Head class="header" activeUrl="contact" ></Head>

        <div class="content">
            To be continued...
            <div class="littleBox">
                <el-popover
                    placement="top-start"
                    title="Secret Admirer"
                    width="300"
                    trigger="hover"
                    >
                    <div class="wx">
                        <img src="./img/wx.png" class="left" alt="">
                        <div class="right">
                            <img src="./img/wv.png" alt="">
                        </div>

                    </div>
                    <div class="wb">
                        <img src="./img/weibo.png" alt="">
                        <a href="https://www.weibo.com/5430551179/profile?topnav=1&wvr=6" target="_blank">@张张张小黑_</a>
                    </div>
                    <div class="wb">
                        <img src="./img/email.png" alt="">
                        <span>MeasponeS@gmail.com</span>
                    </div>
                    <div class="wb">
                        <img src="./img/github.png" alt="">
                        <a href="https://github.com/MeasponeS" target="_blank">@MeasponeS</a>
                    </div>
                    <el-button slot="reference">Contact Me</el-button>
                </el-popover>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data: function () {
            return {

            }
        },
        methods: {

        },
        mounted() {

        },
        beforeDestroy: function () {

        },
        components: {}
    }
</script>


