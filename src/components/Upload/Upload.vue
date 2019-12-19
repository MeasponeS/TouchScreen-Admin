<template>
    <el-upload
            class="avatar-uploader"
            action="http://qstour.klsfood.cn/api/common/image/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl || img " :src="imageUrl || img" class="avatar">
        <i v-else class=" avatar-uploader-icon iconfont">&#xe829;</i>
    </el-upload>
</template>

<script>
	export default {
		props: ['img'],
		data() {
			return {
				imageUrl: ''
			};
		},
		methods: {
			clearImg() {
			    this.imageUrl = '';
			    this.img = '';
            },
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.img = file.response.data.url;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error({message:'上传头像图片只能是 JPG 或 PNG 格式!',center: true});
				}
				if (!isLt2M) {
					this.$message.error({message: '上传头像图片大小不能超过 2MB!',center: true});
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>

<style scoped>
    .avatar-uploader{
        width: 150px;
        height: 150px;
        border: 1px  #e9e9e9;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F6F7FA;
        margin-left: 30px;
    }
    .avatar-uploader .el-upload {

        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .avatar-uploader .el-upload:hover {
        width: 150px;
        height: 150px;
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 100%;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }


</style>
