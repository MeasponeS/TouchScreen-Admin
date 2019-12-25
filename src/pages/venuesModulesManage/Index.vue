<template>
    <div id="app">
        <Head class="header" active-url="operation"/>
        <div class="main-body content">
            <div class="customBreadcrumb">
                <el-breadcrumb >
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
                                prop="name"
                                label="名称"
                                width="200"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="en_name"
                                label="英文名称"
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
                                prop="planar_graph"
                                align="center"
                                label="模块图片">
                            <template slot-scope="scope">
                                <img v-for="item in scope.row['images']" :src="item" alt="" style="margin-left: 10px">
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
                        :api="modulesList"
                        :refresh="refresh"
                        :id="venueId"
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
        <Footer />
    </div>
</template>

<script>
	import OperateModule from "./components/OperateModule";
	import {modulesList,deleteModule} from "../../api/venuesManage/modules";
	import Pagination from "../../components/Pagination/Pagination";
    export default {
        name: 'app',
        data: function () {
            return {
				tableData: [],
				operateVenueVisible: false,
				mode: '新建',
				row:{},
				modulesList: modulesList,
				refresh: true,
				cateId: '',
				venueId:'',
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
					showClose: false
				}).then(() => {
					deleteModule({},row.id).then(r=>{
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


