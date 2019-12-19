<template>
    <el-dialog
            :title="mode"
            :visible.sync="visible"
            width="30%"
            :close-on-click-modal="false"
            @open="open"
            :show-close="false"
            :before-close="handleClose">
        <ul class="operateAdmin">
            <li>
                <span>姓名：</span>
                <el-input placeholder="请输入姓名" v-model="name" />
            </li>
            <li>
                <span>手机号：</span>
                <el-input placeholder="请输入手机号" v-model="mobile" />
            </li>
        </ul>
        <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
	import {editOperator,createOperator} from "../../../api/userCenter/operator";

	export default {
		name: "OperateAdmins",
		props: ['visible', 'mode', 'row'],
		data(){
			return {
				name: '',
				mobile: '',
			}
		},
		mounted() {
		},
		methods: {
			open(){
				this.mobile = this.row.mobile;
				this.name = this.row.name;
			},
			closeDialog() {
				this.$emit('close')
			},
			handleClose () {

			},
			submit(){
				if (!this.name) {
					this.$message.error({message: '请填写姓名',center: true});
					return
				}
				if (!this.mobile) {
					this.$message.error({message:'请填写手机号',center: true});
					return
				}
				let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if (!reg.test(this.mobile)) {
					this.$message.error({message: '请填写正确手机号格式',center: true});
					return
                }

				let api = this.mode === '新建' ? createOperator : editOperator;
				let id = this.mode === '新建' ? '': this.row.id;
				this.handleData (api, id , this.name, this.mobile);
			},
			handleData (api, id, name,mobile) {
				api({
					name,
					mobile,
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
		components: {}
	}
</script>

<style scoped lang="scss">
    .operateAdmin{
        li{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 10px;
            span{
                display: block;
                width: 100px;
            }
            .el-input{
                width: 300px!important;
                margin-left: 30px;
            }
        }
    }
</style>
