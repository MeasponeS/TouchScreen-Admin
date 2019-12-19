<template>
    <el-dialog
            :title="mode"
            :visible.sync="visible"
            width="30%"
            @open="open"
            :show-close="false"
            :close-on-click-modal="false"
            :before-close="handleClose">
        <ul class="operateBanner">
            <li >
                <span>标题：</span>
                <el-input placeholder="请输入标题" v-model="title" />
            </li>
            <li >
                <span>英文标题(或拼音)：</span>
                <el-input placeholder="请输入英文标题(或拼音)" v-model="en_title" />
            </li>
            <li >
                <span>简介：</span>
                <el-input placeholder="请输入图片简介" v-model="introduction" />
            </li>
            <li>
                <span>背景图片：</span>
                <Upload ref="upload" :img="row['background_image']" />
            </li>

            <li>
                <span>序号：</span>
                <el-input placeholder="请输入序号" type="number" v-model="sort" />
            </li>
            <li >
                <span>是否开启：</span>
                <el-switch
                        v-model="is_active"
                        active-color="deepskyblue"
                        inactive-color="#e9e9e9">
                </el-switch>
            </li>
        </ul>
        <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
	import {createSynopses,editeSynopses} from "../../../../api/index/synopses";
	import Upload from "../../../../components/Upload/Upload";
	export default {
		name: "OperateIntroduction",
		props: ['visible', 'mode', 'row'],
		data(){
			return {
				title: '',
				en_title: '',
				introduction: '',
				sort: '',
				is_active: false
			}
		},
		mounted() {

		},
		methods: {
			open(){
				this.title = this.row.title;
				this.en_title = this.row.en_title;
				this.introduction = this.row.introduction;
				this.sort = this.row.sort;
				this['is_active'] = this.row['is_active'];
			},
			closeDialog() {
				this.$emit('close');
				this.clearImg();
			},
			clearImg () {
				this.$refs.upload && this.$refs.upload.clearImg()
			},
			handleClose () {

			},
			submit(){
				if (!this['title']) {
					this.$message.error({message:'请填写标题',center: true});
					return
				}
				if (!this['en_title']) {
					this.$message.error({message: '请填写英文标题(或拼音)',center: true});
					return
				}
				if (!this['introduction']) {
					this.$message.error({message: '请填写片简介',center: true});
					return
				}

                if (!this.$refs.upload.img) {
                    this.$message.error({message: '请上传图片',center: true});
                    return
                }

				let api = this.mode === '新建' ? createSynopses : editeSynopses;
				let id = this.mode === '新建'? '': this.row.id ;
                this.handleData(api,id);
			},
			handleData(api,id) {
				api({
					title: this.title,
					en_title: this['en_title'],
					background_image: this.$refs.upload.img,
					introduction: this['introduction'],
					is_active: this['is_active'],
					sort: this.sort,
				},id).then(r=>{
					this.$message({
						type: 'success',
						message: r.message,
                        center: true
					});
					this.closeDialog();
					this.$emit('refresh')
				}).catch(_=>{})
			}
		},
		components: {Upload}
	}
</script>

<style scoped lang="scss">
    .operateBanner{
        li{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 10px;
            span{
                display: block;
                width: 70px;
            }
            .el-input,.el-textarea{
                width: 300px!important;
                margin-left: 30px;
            }
            .el-switch{
                margin-left: 30px;
            }
        }
    }
</style>
