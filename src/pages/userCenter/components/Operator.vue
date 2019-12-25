<template>
    <div id="operator">
        <div class="operator">
            <div class="o-header">
                <el-button @click="createAdmin">添加新管理员</el-button>
            </div>
            <div class="customChart">
                <el-table
                        :data="tableData"
                        stripe
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="管理员名称"
                            width="200"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            align="center"
                            label="手机号">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                            width="300">
                        <template slot-scope="scope">
                            <el-button @click="reset(scope.row)" type="text" size="small">重置密码</el-button>
                            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="deleteRow(scope.row)" class="delete-btn" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <Pagination
                    @valChange="valChange"
                    :api="operators"
                    :refresh="refresh"
                />
            </div>
            <OperateAdmins
                    :visible="operateAdminVisible"
                    :mode="mode"
                    @close="closeAdminDialog"
                    @refresh="reload"
                    :row="row"
            />
        </div>
    </div>
</template>

<script>
	import {operators, deleteOperators} from "../../../api/userCenter/operator";
	import Pagination from "../../../components/Pagination/Pagination";
    import OperateAdmins from "./OperateAdmins";
	import {resetPassword} from "../../../api/userCenter/user";
	export default {
		name: "Operator",
		data() {
			return {
				tableData: [
					{
						name: '一级分类',
						desc: 'xxx'
					},
					{
						name: '二级分类',
						desc: 'xxx'
					},
				],
				operateAdminVisible: false,
				mode: '新建',
				row:{},
				refresh: true,
				operators: operators
			}
		},
		mounted() {
		},
		computed: {},
		methods: {
			reload() {
				this.refresh = !this.refresh
			},
			valChange (data) {
				this.tableData = data;
			},
			createAdmin(){
				this.mode = '新建';
				this.row = {};
				this.operateAdminVisible = true
			},
			closeAdminDialog () {
				this.operateAdminVisible = false
			},
			edit(row){
				this.mode = '编辑';
				this.row = row;
				this.operateAdminVisible = true
			},
			reset (row) {
				this.$confirm('此操作将重置管理员密码, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showClose: false
				}).then(() => {
					resetPassword({}, row.id).then(r=>{
						this.$message({
							type: 'success',
							message: r.message,center: true
						});
						this.reload()
					}).catch(_=>{})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',center: true
					});
				});
			},
			deleteRow (row) {
				this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showClose: false
				}).then(() => {
					deleteOperators({}, row.id).then(r=>{
						this.$message({
							type: 'success',
							message: r.message,center: true
						});
						this.reload()
					}).catch(_=>{})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',center: true
					});
				});
			}
		},
		components: {Pagination,OperateAdmins}
	}
</script>

<style scoped>

</style>
