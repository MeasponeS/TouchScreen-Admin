<template>
    <div id="app">
        <Head class="header headerNav" activeUrl="schedule" v-if="showNav" ></Head>
        <div class="content">
            <div class="moon" @click="showNav = !showNav">
                <img src="./img/little_moon.png" alt="">
            </div>

            <div class="focus">
                <h3>Hey,what's your main focus for today?</h3>
                <input type="text" v-model="todoMatter" @keyup="addTodo($event)">
            </div>
            <div class="todoBox" v-if="todoList.length > 0">
                <h3>TodoList</h3>
                <div class="checkGroup">
                    <Checkbox v-for="item in todoList">{{item}}
                    </Checkbox>
                </div>

            </div>
        </div>
        <!--<audio autoplay loop src="http://www.ytmp3.cn/down/47154.mp3"></audio>-->
        <!--<Footer></Footer>-->
    </div>
</template>

<script>
    import {Checkbox,CheckboxGroup} from 'element-ui'
    export default {
        name: 'app',
        data: function () {
            return {
                showNav:false,
                todoList:[],
                todoMatter:""
            }
        },
        methods: {
            addTodo(e){
                // 按下enter添加列表
                if(e.keyCode === 13){
                    if(this.todoMatter == "") return;
                    this.todoList.unshift(this.todoMatter)
                    this.todoMatter = ""
                }
            }
        },
        mounted() {

        },
        beforeDestroy: function () {

        },
        components: {CheckboxGroup,Checkbox}
    }
</script>

