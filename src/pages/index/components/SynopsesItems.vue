<template>
    <div id="synopsesItem">
        <div class="commonHeader">
            子简介管理
            <el-button @click="back">返回公司简介设置</el-button>
        </div>
        <div class="o-header">
            <el-button @click="createItem">新增子简介</el-button>
        </div>
        <div class="customChart">
            <el-table
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        prop="title"
                        align="center"
                        label="标题">
                </el-table-column>
                <el-table-column
                        prop="slogan"
                        align="center"
                        label="标语">
                </el-table-column>
                <el-table-column
                        prop="logo"
                        align="center"
                        label="LOGO">
                    <template slot-scope="scope">
                        <img :src="scope.row['logo']" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="introduction"
                        align="center"
                        label="简介">
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="400">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteRow(scope.row)" class="delete-btn" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
                    @valChange="valChange"
                    :api="synopsesItem"
                    :refresh="refresh"
                    :id="id"
            />
        </div>
        <OperateItem
                :visible="operateItemVisible"
                :mode="mode"
                @close="closeItemDialog"
                :row="row"
                @refresh="reload"
                :id="id"
        />
    </div>
</template>

<script>
    import OperateItem from "./Modal/OperateItem";
    import Pagination from "../../../components/Pagination/Pagination";
	import {deleteSynopsesItem,SynopsesItem} from "../../../api/index/synopsesItems";

	export default {
		name: "SynopsesItems",
        props:[ 'id'],
        data () {
			return {
				operateItemVisible: false,
				mode: '新建',
				row:{},
				refresh: true,
				tableData: [],
				synopsesItem: SynopsesItem
            }
        },
        mounted() {
		},
		methods:{
			back(){
				this.$emit('back','introduction')
            },
			reload() {
				this.refresh = !this.refresh
			},
			valChange (data) {
				this.tableData = data;
			},
			createItem(){
				this.mode = '新建';
				this.row = {};
				this.operateItemVisible = true
			},
			closeItemDialog () {
				this.operateItemVisible = false
			},
			edit(row){
				this.mode = '编辑';
				this.row = row;
				this.operateItemVisible = true
			},
			deleteRow (row) {
				this.$confirm('此操作将删除该主简介, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showClose: false
				}).then(() => {
					deleteSynopsesItem({}, row.id).then(r=>{
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
        components: {OperateItem,Pagination}
	}
</script>

<style scoped lang="scss">
</style>
