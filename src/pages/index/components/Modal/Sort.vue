<template>
    <el-dialog
            title="排序"
            :visible.sync="visible"
            width="30%"
            @open="open"
            :close-on-click-modal="false"
            :show-close="false">
        <ul class="operateBanner">
            <li>
                <span>序号：</span>
                <el-input placeholder="请输入序号" type="number" v-model="sort" />
            </li>
        </ul>
        <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
    </el-dialog>
</template>

<script>

	export default {
		name: "Sort",
		props: ['visible', 'row', 'api'],
		data(){
			return {
				sort: ''
			}
		},
        methods : {
			open(){
				this.sort = this.row.sort;
			},
			closeDialog() {
				this.$emit('close');
			},
			submit(){
				if (!this['sort']) {
					this.$message.error({message: '请填写序号',center: true});
					return
				}
				this.api({sort: this.sort},this.row.id).then(r=>{
					this.$message({
						type: 'success',
						message: r.message,center: true
					});
					this.closeDialog();
					this.$emit('refresh')
                }).catch(_=>{})
			},
        },
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
