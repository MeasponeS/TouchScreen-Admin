<template>
    <el-dialog
        :title="mode"
        :visible.sync="visible"
        width="60%"
        @open="open"
        :close-on-click-modal="false"
        :show-close="false"
        :before-close="handleClose">
            <ul class="operateModule">
                <li>
                    <span>名称：</span>
                    <el-input placeholder="请输入名称" v-model="name" />
                </li>
                <li>
                    <span>英文名称：</span>
                    <el-input placeholder="请输入英文名称" v-model="en_name"  />
                </li>
                <li>
                    <span>描述：</span>
                    <el-input placeholder="请输入介绍" type="textarea" v-model="brief_intro" :rows="4" />
                </li>
                <li class="span">
                    <span>图片</span>
                    <el-upload
                            class="upload-demo"
                            action='http://qstour.kingdomcloud.cn/api/common/image/upload'
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :file-list="list"
                            :before-upload="beforeAvatarUpload"
                            :on-success="saveFileList"
                            list-type="picture-card">
                        <i class="iconfont">&#xe829;</i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" :modal="false">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </li>
                <li>
                    <span>点击位置</span>
                    <el-button @click="selectPoint">{{text}}</el-button>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
            <SelectClickPoint
                :visible="pVisible"
                :image="venueImg"
                @close="closePointDialog"
                @save="savePoint"
                :position="position"
            />
    </el-dialog>
</template>

<script>
    import Upload from "../../../components/Upload/Upload";
    import {createModule,editModule} from "../../../api/venuesManage/modules";
    import SelectClickPoint from "./SelectClickPoint";
    import Config from '../../../config/app'
	export default {
		name: "OperateVenue",
        props: ['visible', 'mode', 'row','venueImg'],
        data(){
		    return {
				name: '',
                en_name:'',
				brief_intro: '',
				pVisible: false,
                position: '',
                text : '选择',
                images: [],
				list: [],
				dialogImageUrl: '',
				dialogVisible: false
            }
        },
        mounted() {
		},
        watch: {
		    position (val) {
		    	if (val.length) {
		    		this.text = '已选择,重新选择'
                } else {
		    		this.text = '选择'
                }
            }
        },
		methods: {
			handleRemove(file, fileList) {
				this.images = this.images.filter(item=>{
					if (file.response) {
						return item !== file.response.data.url
                    } else {
						return item !== file.url
                    }
                });
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';

				if (!isJPG) {
					this.$message.error({message:'上传头像图片只能是 JPG 或 PNG 格式!',center: true});
				}
				return isJPG;
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			saveFileList(response,file,fileList){
				this.images.push(response.data.url);
			},
			selectPoint () {
				this.pVisible = true;
            },
			closePointDialog () {
				this.pVisible = false
            },
			savePoint (position) {
				this.closePointDialog();
				this.position = position;
			},
			open(){
				this.row.images.forEach(item=>{
					this.list.push({
                        name: item,
                        url: item
                    })
                });
				this.position = this.row.coordinate;
				this.images = this.row.images;
				this.name = this.row.name;
				this.en_name = this.row.en_name;
				this.brief_intro = this.row.brief_intro;
            },
			closeDialog() {
				this.name = '';
				this.brief_intro = '';
				this.position = '';
				this.en_name = '';
				this.clearImg();
                this.$emit('close')
            },
			clearImg () {
				this.images = [];
				this.list = []
            },
			handleClose () {

            },
			submit(){
				if (!this.name) {
					this.$message.error({message: '请填写模块名称',center: true});
					return
                }
				if (!this.en_name) {
					this.$message.error({message: '请填写模块英文名称',center: true});
					return
                }
				if (!this.brief_intro) {
					this.$message.error({message: '请填写模块描述',center: true});
					return
				}
				if (!this.images.length) {
					this.$message.error({message: '请上传模块图片',center: true});
					return
				}
				if (!this.position.length) {
					this.$message.error({message:'请先选择点击位置',center: true});
					return
                }
				let api = this.mode === '新建' ? createModule : editModule;
				let id = this.mode === '新建' ? window.URlPARAMS.venueId : this.row.id;
				this.handleData (api, id , this.name,this.en_name, this.brief_intro, this.images, this.position);
			},
			handleData (api, id, name,en_name,intro, img, coordinate) {
				api({
					name,
					en_name,
					brief_intro: intro,
					coordinate,
					images: img
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
        components: {Upload,SelectClickPoint}
	}
</script>

<style scoped lang="scss">
    .operateModule{

        li{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 10px;
            .el-button{
                margin-left: 30px;
            }

            .upload-demo{
                width: 100%;
                position: relative;
                margin-left: 40px!important;
                .el-upload-list{
                    margin-left: 0!important;
                }
                .el-upload__tip{
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
            span{
                width: 100px;
                display: block;
            }

            .el-input,.el-textarea{
                width: 300px!important;
                margin-left: 30px;
            }
        }
        .span{
            align-items: flex-start;
        }
    }
</style>
