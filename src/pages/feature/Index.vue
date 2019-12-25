<template>
    <div id="app">
        <Head class="header" active-url="feature"/>
        <div class="main-body content">
            <div class="classification">
                <div class="o-header">
                    <el-button @click="createVenue">新增模块</el-button>
                </div>
                <div class="customChart">
                    <el-table
                            :data="tableData"
                            stripe
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="title"
                                label="名称"
                                width="200"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="brief_intro"
                                align="center"
                                label="简介">
                        </el-table-column>
                        <el-table-column
                                prop="image_url"
                                label="轮播图图片"
                                width="200"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <img :src="scope.row['image']" alt="">
                            </template>
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
                                prop="sort"
                                align="center"
                                label="序号">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                                width="300">
                            <template slot-scope="scope">
                                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button @click="sort(scope.row)" type="text" size="small">排序</el-button>
                                <el-button @click="deleteRow(scope.row)" class="delete-btn" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <Pagination
                            @valChange="valChange"
                            :api="features"
                            :refresh="refresh"
                    />
                </div>

                <OperateModule
                        :visible="operateModuleVisible"
                        :mode="mode"
                        @close="closeOperateDialog"
                        :row="row"
                        @refresh="reload"
                />
                <Sort
                        :visible="sortVisible"
                        @close="closeSortDialog"
                        :row="row"
                        @refresh="reload"
                        :api="api"
                />
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
	import OperateModule from "./components/OperateModule";
	import Pagination from "../../components/Pagination/Pagination";
	import Sort from "../index/components/Modal/Sort";
	import {features,deleteFeature,disableFeatures,enableFeatures,sortFeatures} from '../../api/feature';
	export default {
		name: 'app',
		data: function () {
			return {
				tableData: [],
				operateModuleVisible: false,
				mode: '新建',
				row:{},
				features: features,
                api:sortFeatures,
				refresh: true,
				sortVisible: false
			}
		},
		methods: {
			sort (row) {
				this.row = row;
				this.sortVisible = true
			},
			closeSortDialog () {
				this.sortVisible = false
			},
			switchChange (e) {
				let api = e['is_active'] ? disableFeatures : enableFeatures;
				api({},e.id).then(r=>{
					this.$message({
						type: 'success',
						message: r.message
						,center: true
					});
					this.reload()
				}).catch(_=>{})
			},
			reload() {
				this.refresh = !this.refresh
			},
			valChange (data) {
				this.tableData = data;
			},
			createVenue(){
				this.mode = '新建';
				this.row = {};
				this.operateModuleVisible = true
			},
			closeOperateDialog () {
				this.operateModuleVisible = false
			},
			edit(row){
				this.mode = '编辑';
				this.row = row;
				this.operateModuleVisible = true
			},
			deleteRow (row) {
				this.$confirm('此操作将删除该模块, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showClose: false
				}).then(() => {
					deleteFeature({}, row.id).then(r=>{
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
		mounted() {
		},
		beforeDestroy: function () {

		},
		components: {OperateModule,Pagination,Sort}
	}
</script>


