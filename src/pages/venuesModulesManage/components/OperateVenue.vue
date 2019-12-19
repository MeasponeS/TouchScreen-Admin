<template>
    <el-dialog
        :title="mode"
        :visible.sync="visible"
        width="30%"
        @open="open"
        :close-on-click-modal="false"
        :show-close="false"
        :before-close="handleClose">
            <ul class="operateVenue">
                <li>
                    <span>名称：</span>
                    <el-input placeholder="请输入名称" v-model="title" />
                </li>
                <li>
                    <span>标语：</span>
                    <el-input placeholder="请输入标语" v-model="slogan" />
                </li>
                <li>
                    <span>简介：</span>
                    <el-input type="textarea" placeholder="请输入简介" v-model="desc" />
                </li>
                <li>
                    <span>平面图</span>
                    <Upload ref="upload" :img="row['planar_graph']" />
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
    import {createVenues,editVenues} from "../../../api/venuesManage/venues";

	export default {
		name: "OperateVenue",
        props: ['visible', 'mode', 'row'],
        data(){
		    return {
				title: '',
				desc: '',
				slogan:''
            }
        },
        mounted() {
		},
		methods: {
			open(){
				this.title = this.row.title;
				this.desc = this.row.desc;
				this.slogan = this.row.slogan;
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
					this.$message.error({message: '请填写场馆名称',center: true});
					return
                }
				if (!this.desc) {
					this.$message.error({message:'请填写场馆描述',center: true});
					return
				}
				if (!this.slogan) {
					this.$message.error({message:'请填写场馆标语',center: true});
					return
				}
				if (!this.$refs.upload.img) {
					this.$message.error({message: '请上传场馆平面图',center: true});
					return
				}
				let api = this.mode === '新建' ? createVenues : editVenues;
				let id = this.mode === '新建' ? window.URlPARAMS.cateId : this.row.id;
				this.handleData (api, id , this.title, this.desc, this.slogan,this.$refs.upload.img);
			},
			handleData (api, id, title,desc, slogan, img) {
				api({
					category_id: window.URlPARAMS.cateId,
                    title,
                    desc,
                    slogan,
					planar_graph: img
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
            span{
                display: block;
                width: 100px;
            }
            .el-input,.el-textarea{
                width: 300px!important;
                margin-left: 30px;
            }
        }
    }
</style>
