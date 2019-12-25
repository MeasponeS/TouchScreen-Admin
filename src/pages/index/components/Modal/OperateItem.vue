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
                <span>标语：</span>
                <el-input placeholder="请输入标语"  maxlength="30"
                          show-word-limit v-model="slogan" />
            </li>
            <li >
                <span>LOGO：</span>
                <Upload ref="upload" :img1="row['logo']" />
            </li>
            <li >
                <span>简介：</span>
                <el-input  type="textarea" :rows="4" placeholder="请输入简介" v-model="introduction" />
            </li>
        </ul>
        <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
    import {createSynopsesItem,editSynopsesItem} from "../../../../api/index/synopsesItems";
	import Upload from "../../../../components/Upload/Upload";
	export default {
		name: "OperateItem",
		props: ['visible', 'mode', 'row','id'],
		data(){
			return {
				title: '',
				introduction: '',
				slogan:''
			}
		},
		mounted() {

		},
		methods: {
			open(){
				this.title = this.row.title;
				this.slogan = this.row.slogan;
				this.introduction = this.row.introduction;
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
				if (!this['slogan']) {
					this.$message.error({message:'请填写标语',center: true});
					return
				}
				if (!this.$refs.upload.img) {
					this.$message.error({message: '请上传LOGO',center: true});
					return
				}
				if (!this['introduction']) {
					this.$message.error({message: '请填写片简介',center: true});
					return
				}
				let api = this.mode === '新建' ? createSynopsesItem : editSynopsesItem;
				let id = this.mode === '新建'? this.id: this.row.id ;
                this.handleData(api,id);
			},
			handleData(api,id) {
				api({
					title: this.title,
                    slogan: this.slogan,
					logo: this.$refs.upload.img,
					introduction: this['introduction'],
				},id).then(r=>{
					this.$message({
						type: 'success',
						message: r.message,center: true
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
