<template>
    <el-dialog
        :title="mode"
        :visible.sync="visible"
        width="30%"
        :close-on-click-modal="false"
        @open="open"
        :show-close="false"
        :before-close="handleClose">
            <ul class="operateVenue">
                <li>
                    <span>名称：</span>
                    <el-input placeholder="请输入名称" v-model="title" />
                </li>
                <li>
                    <span>文案：</span>
                    <el-input type="textarea" placeholder="请输入文案" v-model="brief_intro" />
                </li>
                <li>
                    <span>图片：</span>
                    <Upload ref="upload" :img="row['image']" />
                </li>
                <li>
                    <span>序号：</span>
                    <el-input placeholder="请输入序号" v-model="sort" />
                </li>
                <li>
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
    import Upload from "../../../components/Upload/Upload";
	import {createFeature,editFeatures} from "../../../api/feature";
	export default {
		name: "OperateModule",
        props: ['visible', 'mode', 'row'],
        data(){
		    return {
				title: '',
				brief_intro: '',
				sort: '',
				is_active: false
            }
        },
        mounted() {

		},
		methods: {
			open(){
				this.title = this.row.title;
				this.brief_intro = this.row.brief_intro;
				this.sort = this.row.sort;
				this.is_active = this.row.is_active
            },
			closeDialog() {
				this.clearImg();
                this.$emit('close')
            },
			clearImg () {
				this.$refs.upload.clearImg()
			},
			handleClose () {

            },
			submit(){
				if (!this.title) {
					this.$message.error({message: '请填写名称',center: true});
					return
				}
				if (!this.brief_intro) {
					this.$message.error({message: '请填写文案',center: true});
					return
				}
				if (!this.sort) {
					this.$message.error({message: '请填写序号',center: true});
					return
				}
				if (!this.$refs.upload.img) {
					this.$message.error({message: '请上传图片',center: true});
					return
				}
				let api = this.mode === '新建' ? createFeature : editFeatures;
				let id = this.mode === '新建' ? '' : this.row.id;
				this.handleData (api, id , this.title, this.brief_intro, this.sort,this.$refs.upload.img,this.is_active);
			},
			handleData (api, id, title,brief_intro, sort, img,isActive) {
				api({
					title,
					brief_intro,
					sort,
					image: img,
                    is_active:isActive
				}, id).then(r=>{
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
    .operateVenue{
        li{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 10px;
            .el-input,.el-textarea{
                width: 300px!important;
                margin-left: 30px;
            }
        }
    }
</style>
