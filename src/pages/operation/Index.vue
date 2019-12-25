<template>
    <div id="app">
        <Head class="header" active-url="operation"/>
        <div class="main-body content">
            <div class="customBreadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/operation' }">分类管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="classification">
                <div class="o-header">
                    <el-button @click="createCate">添加新分类</el-button>
                </div>
                <div class="customChart">
                    <el-table
                            :data="tableData"
                            stripe
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="分类名称"
                                width="200"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="sub_name"
                                align="center"
                                label="备注">
                        </el-table-column>
                        <el-table-column
                                prop="is_active"
                                align="center"
                                label="是否开启">
                            <template slot-scope="scope">
                                <el-switch
                                        :value="scope.row['is_active']"
                                        @change="switchChange(scope.row)"
                                        active-color="deepskyblue"
                                        inactive-color="#e9e9e9">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                                width="400">
                            <template slot-scope="scope">
                                <el-button @click="venues(scope.row)" type="text" size="small">场馆管理</el-button>
                                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button @click="sort(scope.row)" type="text" size="small">排序</el-button>
                                <el-button @click="deleteRow(scope.row)" class="delete-btn" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <Pagination
                        @valChange="valChange"
                        :api="cateList"
                        :refresh="refresh"
                    />
                </div>
            </div>
        </div>
        <OperateCate
            :visible="operateCateVisible"
            :mode="mode"
            @close="closeCateDialog"
            @refresh="reload"
            :row="row"
        />
        <Sort
                :visible="sortVisible"
                @close="closeSortDialog"
                :row="row"
                @refresh="reload"
                :api="api"
        />
        <Footer />
    </div>
</template>

<script>
    import {cateList,deleteCate,disableCate,enableCate,sortCate} from "../../api/venuesManage/exhibitionsCates";
    import OperateCate from "./components/OperateCate";
    import Pagination from "../../components/Pagination/Pagination";
	import Sort from "../index/components/Modal/Sort";
	export default {
		data() {
			return {
				cateList: cateList,
				tableData: [],
				operateCateVisible: false,
				mode: '新建',
				row:{},
                api: sortCate,
				refresh: true,
				sortVisible: false
			}
		},
		mounted() {
		},
		computed: {},
		methods: {
			sort (row) {
				this.row = row;
				this.sortVisible = true
			},
			switchChange (e) {
				let api = e['is_active'] ? disableCate : enableCate;
				api({},e.id).then(r=>{
					this.$message({
						type: 'success',
						message: r.message,center: true
					});
					this.reload()
				}).catch(_=>{})
			},
			closeSortDialog () {
				this.sortVisible = false
			},
			reload() {
			    this.refresh = !this.refresh
            },
			venues (row) {
                window.location.href = `./venuesManage.html?cateId=${row.id}`
            },
			valChange (data) {
				this.tableData = data;
            },
			createCate(){
				this.mode = '新建';
				this.row = {};
				this.operateCateVisible = true
			},
			closeCateDialog () {
				this.operateCateVisible = false
			},
			edit(row){
				this.mode = '编辑';
				this.row = row;
				this.operateCateVisible = true
			},
			deleteRow (row) {
				this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showClose: false
				}).then(() => {
					deleteCate({}, row.id).then(r=>{
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
		components: {OperateCate,Pagination,Sort}
	}
</script>

