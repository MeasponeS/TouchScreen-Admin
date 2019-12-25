<template>
    <div>
        <div class="o-header">
            <el-button @click="createBanner">新增轮播图</el-button>
        </div>
        <div class="customChart">
            <el-table
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        prop="image_url"
                        label="轮播图图片"
                        width="200"
                        align="center"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row['image_url']" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="brief_intro"
                        align="center"
                        label="图片简介">
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
                        <el-button @click="edit(scope.row)" type="text" size="small">排序</el-button>
                        <el-button @click="deleteRow(scope.row)" class="delete-btn" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
                    @valChange="valChange"
                    :api="bannerList"
                    :refresh="refresh"
            />
        </div>
        <OperateBanner
                :visible="operateBannerVisible"
                :mode="mode"
                @close="closeBannerDialog"
                :row="row"
                @refresh="reload"
        />
    </div>
</template>

<script>
	import {banners,deleteBanner,enableBanner,disableBanner} from "../../../api/index/banner";
	import Pagination from "../../../components/Pagination/Pagination";
	import OperateBanner from "./Modal/OperateBanner";
	export default {
		name: "BannerSetting",
        data(){
		    return {
		    	bannerList: banners,
				operateBannerVisible: false,
				mode: '新建',
				row:{},
				refresh: true,
				tableData: []
            }
        },
        methods: {
			switchChange (e) {
				let api = e['is_active'] ? disableBanner : enableBanner;
				api({},e.id).then(r=>{
					this.$message({
						type: 'success',
						message: r.message,center: true
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
			createBanner(){
				this.mode = '新建';
				this.row = {};
				this.operateBannerVisible = true
			},
			closeBannerDialog () {
				this.operateBannerVisible = false
			},
			edit(row){
				this.mode = '编辑';
				this.row = row;
				this.operateBannerVisible = true
			},
			deleteRow (row) {
				this.$confirm('此操作将删除该轮播图, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showClose: false
				}).then(() => {
					deleteBanner({}, row.id).then(r=>{
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
		components: {Pagination,OperateBanner}
	}
</script>

<style scoped lang="scss">
    .o-header{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 20px;
    }
</style>
