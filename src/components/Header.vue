<template>
    <div class="headerBox">
        <div class="logo">博客管理后台</div>
        <div class="head-portrait">
            <span class="name">{{nickname}}</span>
            <el-dropdown @command="handleCommand">
                <img src="../assets/logo.jpg" alt="" class="head-img">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">更改头像</el-dropdown-item>
                    <el-dropdown-item command="b">修改密码</el-dropdown-item>
                    <el-dropdown-item command="c">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog
                width="300px"
                :visible.sync="upDialogVisible"
        >
            <el-upload
                    action=""
                    class="avatar-uploader"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="img">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-dialog>
        <el-dialog
                width="400px"
                :visible.sync="cpDialogVisible"
        >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="原始密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                    <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {changePassword} from '../apis'
    export default {
        name: "",
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                imageUrl: '',
                loading: false,
                upDialogVisible: false,
                cpDialogVisible: false,
                ruleForm: {
                    oldPass: '',
                    newPass: '',
                    checkPass: '',
                },
                nickname: sessionStorage.getItem('nickname'),
                rules: {
                    oldPass: [
                        {required: true, message: '请输入原始密码', trigger: 'blur'}
                    ],
                    newPass: [
                        {validator: validatePass, required: true, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, required: true, trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            handleCommand(command) {
                if (command === 'a') { //修改头像
                    this.upDialogVisible = true;
                } else if (command === 'b') { //修改密码
                    this.cpDialogVisible = true;
                } else if (command === 'c') { //退出登录
                    sessionStorage.clear();
                    this.$router.push({path: '/login'});
                }
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            //上传头像
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            //修改密码
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        changePassword({
                            oldPass: this.ruleForm.oldPass,
                            newPass: this.ruleForm.newPass,
                        }).then((res) => {
                            if (res.data.status) {
                                this.loading = false;
                                this.cpDialogVisible = false;
                                this.$message.success(res.data.msg);
                                setTimeout(() => {
                                    sessionStorage.clear();
                                    this.$router.push({path: '/login'})
                                }, 500)
                            } else {
                                this.loading = false;
                                this.$message.error(res.data.msg);
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancel(){
                this.cpDialogVisible = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .headerBox {
        display: flex;
        justify-content: space-between;

        .logo {
            font-size: 16px;
        }

        .head-portrait {
            display: flex;

            .el-dropdown {
                height: 60px;
            }

            .head-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin: 10px 0 0 15px;
            }
        }
    }

    .avatar-uploader {
        text-align: center;
    }

    .avatar-uploader /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader /deep/ .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
