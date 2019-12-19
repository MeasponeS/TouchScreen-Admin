<template>
    <div id="app">
        <Head class="header" activeUrl="userCenter" ></Head>
        <div class="main-body content">
            <ul class="sideNav">
                <li
                        v-for="item in list "
                        :key="item.key"
                        @click="changeSide(item.key)"
                        :class="item.key === activeTab ? 'activeTab' : ''"
                >
                    {{item.name}}
                </li>
            </ul>
            <div class="main-container">
                <Operator v-if="activeTab === 'operator'"/>
                <User v-else />
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import User from "./components/User";
import Operator from "./components/Operator";
export default {
    data() {
          return {
			  list: [
				  {key: 'operator', name: '管理员设置设置'},
				  {key: 'user', name: '修改密码'}
			  ],
			  activeTab: 'operator'
          }
    },
    mounted() {


    },
    computed: {

    },
    methods: {
		changeSide(key){
			this.activeTab = key;
		}
    },
    components:{
		User, Operator
    }
}
</script>

