<template>
    <div id="app">
        <Head class="header" activeUrl="index" ></Head>
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
                <BannerSetting v-if="activeTab === 'banner'"/>
                <IntroductionSetting v-if="activeTab === 'introduction' && showSynopses" @items="items" />
                <SynopsesItems v-if="showItems" @back="changeSide" :id="pId" />
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    import BannerSetting from "./components/BannerSetting";
    import IntroductionSetting from "./components/IntroductionSetting";
    import SynopsesItems from "./components/SynopsesItems";
    export default {
        name: 'app',
        data: function () {
            return {
            	list: [
                    {key: 'banner', name: '轮播图设置'},
                    {key: 'introduction', name: '公司简介设置'},
                ],
                activeTab: 'banner',
				showItems: false,
                showSynopses: true,
				pId: ''
            }
        },
        methods: {
            changeSide(key){
                this.activeTab = key;
				this.showSynopses = true;
				this.showItems = false;
            },
			items (id) {
            	this.showSynopses = false;
            	this.showItems = true;
            	this.pId = id;
            }
        },
        mounted() {

        },
        beforeDestroy: function () {

        },
        components: {BannerSetting, IntroductionSetting,SynopsesItems}
    }
</script>

