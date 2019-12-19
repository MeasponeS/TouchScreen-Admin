<template>
    <div id="app">
        <Head class="header" active-url="operation"/>
        <div class="main-body content">
            <div class="customBreadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item><a href="./operation.html">分类管理</a></el-breadcrumb-item>
                    <el-breadcrumb-item><a :href="`./venuesManage.html?cateId=${cateId}`">场馆管理</a></el-breadcrumb-item>
                    <el-breadcrumb-item>模块管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="classification">
                <div class="o-header">
                    <el-button @click="createVenue">添加新模块</el-button>
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
                                prop="slogan"
                                label="标语"
                                width="200"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="desc"
                                align="center"
                                label="简介">
                        </el-table-column>
                        <el-table-column
                                prop="planar_graph"
                                align="center"
                                label="平面图">
                            <template slot-scope="scope">
                                <img :src="scope.row['planar_graph']" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                                width="200">
                            <template slot-scope="scope">
                                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button @click="deleteRow(scope.row)" class="delete-btn" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <Pagination
                        @valChange="valChange"
                        :api="venueList"
                        :refresh="refresh"
                        :id="cateId"
                    />
                </div>

                <OperateModule
                    :visible="operateVenueVisible"
                    :mode="mode"
                    @close="closeOperateDialog"
                    @refresh="reload"
                    :row="row"
                    :venueImg="venueImg"
                />
            </div>
        </div>
    </div>
</template>

<script>
	import OperateModule from "./components/OperateModule";
	import {venuesList, deleteVenues} from "../../api/venuesManage/venues";
	import Pagination from "../../components/Pagination/Pagination";
    export default {
        name: 'app',
        data: function () {
            return {
				tableData: [],
				operateVenueVisible: false,
				mode: '新建',
				row:{},
				venueList: venuesList,
				refresh: true,
				cateId: '',
				venueImg: ''
            }
        },
        methods: {
			valChange (data) {
				this.tableData = data;
			},
			reload() {
				this.refresh = !this.refresh
			},
			createVenue(){
				this.mode = '新建';
				this.row = {};
				this.operateVenueVisible = true
			},
			closeOperateDialog () {
				this.operateVenueVisible = false
			},
			edit(row){
				this.mode = '编辑';
				this.row = row;
				this.operateVenueVisible = true
			},
			deleteRow (row) {
				this.$confirm('此操作将删除该模块, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					showClose: false
				}).then(() => {
					deleteVenues({},row.id).then(r=>{
						this.$message({
							type: 'success',
							message: '删除成功!',center: true
						});
						this.reload();
                    }).catch(_=>{})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',center: true
					});
				});
			}
        },
        created() {
            this.cateId = window.URlPARAMS.cateId;
            this.venueId = window.URlPARAMS.venueId;
            this.venueImg = window.URlPARAMS['img'];
		},
        beforeDestroy: function () {

        },
        components: {OperateModule,Pagination}
    }
</script>


