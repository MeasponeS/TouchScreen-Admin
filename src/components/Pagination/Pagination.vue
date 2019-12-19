<template>
    <div class="pagination">
        <div class="total">共{{total}}条数据</div>
        <el-pagination
            background
            layout="prev, pager, next"
            page-size="10"
            @current-change="change"
            prev-text="上一页"
            next-text="下一页"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
	export default {
		name: 'Paginate',
		props: {
			api: Function,
			id: String,
			params: Object,
			valChange: Function,
			refresh: Boolean,
		},
		data() {
			return {
				total: 0,
				current: 0,
				currentDataLength: 0,
			}
		},
		methods: {
			paginate: function () {
				if (!this.api) return;
				let params = this.params || {};
				params.limit = 10;
				params.page = this.current;
				if (this.id) {
					this.api(params, this.id).then(r=>{
						this.$emit('valChange',r.data);
						this.total =r.meta && r.meta.pagination.total;
					})
                } else {
					this.api(params).then(r=>{
						this.$emit('valChange',r.data);
						this.total = r.meta && r.meta.pagination.total;
					})
                }
			},
			change: function (page) {
				this.current = page;
				this.paginate();
			}
		},
		watch: {
			'refresh': {
				handler: function () {
					this.current = 0;
					this.paginate();
				},
				// 深度观察
				deep: true
			}
		},
		mounted: function () {
			this.paginate();
		},
	}
</script>
<style scoped >
    .pagination {
        padding: 7px;
        border: 1px solid #ebeef5;
        background: #fff;
        text-align: right;
    }
    .total {
        float: left;
        margin-top: 8px;
        margin-left: 10px;
        font-size: 13px;
        color: #606266;
    }


</style>
