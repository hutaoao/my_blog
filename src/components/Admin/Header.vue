<template>
    <div class="headerBox">
        <div class="logo">博客管理后台</div>
        <div class="head-portrait">
            <span class="name">{{nickname}}</span>
            <el-dropdown @command="handleCommand">
                <img :src="imageUrl" alt="" class="head-img">
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
                    :http-request="uploadRequest">
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
    import img from '../../assets/logo.jpg';
    import {changePassword, uploadImg} from '../../apis';

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
            const portrait = sessionStorage.getItem('portrait');//头像
            return {
                imageUrl: portrait ? portrait : img,
                nickname: sessionStorage.getItem('nickname'),
                loading: false,
                upDialogVisible: false,
                cpDialogVisible: false,
                ruleForm: {
                    oldPass: '',
                    newPass: '',
                    checkPass: '',
                },
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
            //上传头像
            uploadRequest(file) {
                const isJPG = file.file.type === 'image/jpeg' || 'image/png';
                const isLt1M = file.file.size / 1024 / 1024 < 1;
                console.log(file)
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                    return false;
                }
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 1MB!');
                    return false;
                }
                let params = new FormData();
                params.append('imgFile', file.file);
                uploadImg(params).then((res) => {
                    if (res.data.status) {
                        this.imageUrl = res.data.data;
                        sessionStorage.setItem('portrait', res.data.data);
                        this.$message.success(res.data.msg);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                })
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
            cancel() {
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
