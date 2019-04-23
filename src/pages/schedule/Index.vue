<template>
    <div id="app">
        <Head class="header headerNav" activeUrl="schedule" v-if="showNav" ></Head>
        <div class="content">
            <div class="moon" @click="showNav = !showNav">
                <img src="./img/little_moon.png" alt="">
            </div>

            <div class="focus">
                <h3>Hey,what's your focus today?</h3>
                <input type="text">
            </div>
        </div>
        <!--<Footer></Footer>-->
    </div>
</template>

<script>
    import {Carousel,CarouselItem} from 'element-ui'
    export default {
        name: 'app',
        data: function () {
            return {
                showNav:false
            }
        },
        methods: {

        },
        mounted() {

        },
        beforeDestroy: function () {

        },
        components: {Carousel,CarouselItem}
    }
</script>

