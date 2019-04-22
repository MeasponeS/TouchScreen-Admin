<template>
    <div id="app">
        <Head class="header" activeUrl="index" ></Head>
        <div class=" content">
            <css-doodle id="doodle" @click="update">
                :doodle {
                @grid: 8x1 / 50vmin;
                }

                @size: calc(100% - @i() * 3%);
                @place-cell: center;
                @shape: heart;
                overflow: hidden;

                :after {
                content: '';
                @size: calc(100% - 5px);
                @shape: heart;
                background: var(--bg);
                z-index: 1;
                }

                :before {
                content: '';
                position: absolute;
                @size: 200%;
                background: conic-gradient(
                @pd(#78E7D4, #E3383F, #EFF4DD, #F2A341) @p(10%, 40%),
                transparent 0
                );
                animation: cycle @r(3s, 5s, .1) linear infinite;
                animation-delay: -@r(8s);
                z-index: 0;
                }

                @keyframes cycle {
                to { transform: rotate(1turn); }
                }
            </css-doodle>
            <audio autoplay loop src="http://www.ytmp3.cn/down/46144.mp3"></audio>
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
            handleScroll(){
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let oneSize = 801/1980;

                if(scrollTop >= document.body.clientWidth * oneSize - 100){
                    this.type = 1
                } else {
                    this.type = 2
                }
            },
            update(){
                doodle.update();
            }
        },
        mounted() {
            window.addEventListener('scroll',this.handleScroll)
        },
        beforeDestroy: function () {

        },
        components: {}
    }
</script>

