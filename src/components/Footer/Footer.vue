<template>
    <div class="footer">
        <div class="container">
            <div>
                <span>Copyright © 2019 Littleduoduo.cn. All Rights Reserved. 京ICP备19015704-1 </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .footer{
        height: 60px;
        width: 100%;
        background-color: #fff;
        box-shadow:0 0 6px 0 rgba(174,174,174,0.14);
        .container{
            height: 100%;
            color: #999;
            text-align: center;
            display: flex;
            font-size: 14px;
            justify-content: center;
            line-height:60px;
            align-items: center;
        }
    }
</style>
