<template>
    <div id="user">
        <div class="commonHeader">
            修改密码

        </div>
        <ul class="passwords">
            <li>
                <span>原密码：</span>
                <el-input placeholder="请输入原密码" v-model="old" />
            </li>
            <li>
                <span>新密码：</span>
                <el-input placeholder="请输入新密码" type="password" v-model="newP1" />
            </li>
            <li>
                <span>再次输入新密码：</span>
                <el-input placeholder="请输入新密码" type="password"  v-model="newP2"  />
            </li>
            <el-button @click="check">保存</el-button>
        </ul>
    </div>
</template>

<script>
    import {updatePassword} from "../../../api/userCenter/user";

	export default {
		name: "User",
        data () {
			return {
				old: '',
				newP1: '',
				newP2: ''
            }
        },
        mounted() {

		},
        methods: {

            check() {
            	if (!this.old) {
            		this.$message.error({message: '请输入原密码',center: true});
            		return
                }
				if (!this.newP1) {
					this.$message.error({message: '请输入新密码',center: true});
					return
				}
				if (!this.newP2) {
					this.$message.error({message: '请再次输入新密码',center: true});
					return
				}
				if (this['newP1'] !== this['newP2']) {
					this.$message.error({message: '两次新密码输入不一致',center: true});
					return
				}
				this.submit(this.old, this.newP1, this.newP2)
            },

            submit (old, n1, n2) {
				updatePassword({
					old_password: old,
					password: n1,
					password_confirmation: n2
                }).then(r=>{
					this.$message({
						type: 'success',
						message: r.message,center: true
					});
					this.old = '';
					this.newP1 = '';
					this.newP2 = ''
				}).catch(_=>{})
			}
        }
	}
</script>

<style scoped lang="scss">
    .passwords{
        padding: 20px;
        li{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 20px;
            span{
                display: block;
                width: 200px;
            }
            .el-input{
                width: 300px;
                height: 30px;
            }
        }
    }
</style>
