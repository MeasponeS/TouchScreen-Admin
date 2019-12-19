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
                    <el-input placeholder="请输入名称" v-model="name" />
                </li>
                <li>
                    <span>备注名：</span>
                    <el-input placeholder="请输入备注名" v-model="sub_name" />
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>
    import {createCate,editCate} from "../../../api/venuesManage/exhibitionsCates";

	export default {
		name: "OperateCate",
        props: ['visible', 'mode', 'row'],
        data(){
		    return {
		    	name: '',
				sub_name: '',
            }
        },
        mounted() {

		},
		methods: {
			open(){
				this.name = this.row.name;
				this.sub_name = this.row.sub_name;
            },
			closeDialog() {

                this.$emit('close')
            },
			handleClose () {

            },
			submit(){
				console.log(this.row);
				if (!this.name) {
					this.$message.error({message: '请输入名称',center: true});
					return
                };
				let api = this.mode === '新建' ? createCate : editCate;
				let id = this.mode === '新建'? '': this.row.id ;
				this.handleData(api, this.name, this.sub_name, id);
			},
            handleData(api, name, sub_name, id) {
                api({
                    name,sub_name
                },id).then(r=>{
					this.$message({
                        type: 'success',
                        message: r.message,center: true
                    });
					this.closeDialog();
					this.$emit('refresh')
				}).catch(_=>{})
            }
        }
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
                width: 70px;
            }
            .el-input,.el-textarea{
                width: 300px!important;
                margin-left: 30px;
            }
        }
    }
</style>
