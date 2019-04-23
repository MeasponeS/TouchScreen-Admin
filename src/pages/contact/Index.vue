<template>
    <div id="app">
        <Head class="header" activeUrl="contact" ></Head>

        <div class="content">
            To to continue...
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
            window.addEventListener('scroll',this.handleScroll)
        },
        beforeDestroy: function () {

        },
        components: {}
    }
</script>


