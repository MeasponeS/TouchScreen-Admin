<template>
    <div id="app">
        <Head class="header" activeUrl="setting" ></Head>
        <div class="main-body content">
            <div class="setting-header">
               系统设置

            </div>
            <div class="setting-body">
                <el-switch
                        v-model="value"
                        active-text="开"
                        active-color="deepskyblue"
                        inactive-color="#e9e9e9"
                        @change="switchChange"
                        inactive-text="关">
                </el-switch>
                无操作 <el-input v-model="minutes" type="number" @change="changeSetting" />分钟后进入“静止页”

                <el-button @click="submit">保存</el-button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    import {enableSetting,disableSetting,getSetting,setting} from "../../api/setting/setting";
    import {searchJson} from "../../utils/dataStorage";

	export default {
        name: 'app',
        data: function () {
            return {
				value: false,
				minutes: 0
            }
        },
        methods: {
			switchChange(value){
				let api = value ? enableSetting : disableSetting;
				api({
                    type: 'TOUCH_SCREEN',
                    key: 'NO_OPERATION_TIME_MINUTE'
                }).then(r=>{
					this.$message({
                        type: 'success',
                        message: r.message,center: true
                    })
				}).catch(_=>{})
			},
			changeSetting(e){

            },
            submit () {
				if (this.minutes < 0) {
		            this.$message.error({message: '分钟值不可小于零',center: true});
					this.minutes = 0;
		            return
				}
				setting({
                    type:'TOUCH_SCREEN',
					key: 'NO_OPERATION_TIME_MINUTE',
                    value: this.minutes
                }).then(r=>{
					this.$message({
                        type: 'success',
                        message: r.message,center: true
                    })
				}).catch(_=>{})
            }
        },
        mounted() {
			getSetting({searchJson: searchJson({type: 'TOUCH_SCREEN'})}).then(r=>{
				this.value = r.data[0]['flag'];
				this.minutes = r.data[0]['value']
			}).catch(_=>{})
        },
        beforeDestroy: function () {

        },
        components: {}
    }
</script>

