<template>
    <el-dialog
            :title="mode"
            :visible.sync="visible"
            width="30%"
            @open="open"
            :close-on-click-modal="false"
            :show-close="false"
            :before-close="handleClose">
        <ul class="operateBanner">
            <li v-if="mode === '新建'">
                <span>轮播图片：</span>
                <Upload ref="upload" :img1="row['image_url']" />
            </li>
            <li  v-if="mode === '新建'">
                <span>图片简介：</span>
                <el-input placeholder="请输入图片简介" v-model="brief_intro" />
            </li>
            <li>
                <span>序号：</span>
                <el-input placeholder="请输入序号" type="number" v-model="sort" />
            </li>
            <li  v-if="mode === '新建'">
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
	import {createBanner,sortBanner} from "../../../../api/index/banner";
	import Upload from "../../../../components/Upload/Upload";
	export default {
		name: "OperateBanner",
		props: ['visible', 'mode', 'row'],
		data(){
			return {
				name: '',
				brief_intro: '',
				sort: '',
				is_active: false
			}
		},
		mounted() {

		},
		methods: {
			open(){
				this.brief_intro = this.row.brief_intro;
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
				if (this.mode === '新建') {
					if (!this.$refs.upload.img) {
						this.$message.error({message: '请上传图片',center: true});
						return
					}
					if (!this['brief_intro']) {
						this.$message.error({message: '请填写图片简介',center: true});
						return
					}
                }
				let api = this.mode === '新建' ? createBanner : sortBanner;
				let id = this.mode === '新建'? '': this.row.id ;
				if (this.mode === '新建') {
					this.handleData(api,id, this.$refs.upload.img, this['brief_intro'], this['is_active'], this.sort);
                } else {
					this.handleData(api,id, '', this['brief_intro'], this['is_active'], this.sort);
                }

			},
			handleData(api,id, img, desc, is_active, sort) {
				api({
					image_url: img,
					brief_intro: desc,
					is_active: is_active,
                    sort
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
