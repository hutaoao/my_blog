<template>
    <div class="login-box">
        <el-form v-if="type === 'login'" size="small" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0" class="login-form">
            <el-form-item prop="email">
                <el-input v-model="loginForm.email" prefix-icon="el-icon-user" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('loginForm')" class="login-btn" :loading="loading">登录</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" class="login-btn" @click="resetForm('loginForm', 'register')">去注册</el-button>
            </el-form-item>
        </el-form>
        <el-form v-else size="small" :model="registerForm" :rules="registerRules" ref="registerForm" label-width="0" class="login-form">
            <el-form-item prop="email2">
                <el-input v-model="registerForm.email" prefix-icon="el-icon-user" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="nickname2">
                <el-input v-model="registerForm.nickname" prefix-icon="el-icon-lock" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item prop="password2">
                <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" class="login-btn" :loading="rLoading" @click="register('registerForm')">注册</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click="resetForm('registerForm', 'login')">去登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {login, register} from '../../apis'

    export default {
        name: "",
        data() {
            const checkEmail = (rule, value, callback) => {
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (!value) {
                    return callback(new Error('请输入邮箱'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的邮箱格式'))
                    }
                }, 100)
            };
            return {
                type: 'login',
                loading: false,
                rLoading: false,
                loginForm: {
                    email: '',
                    password: '',
                },
                registerForm: {
                    email: '',
                    nickname: '',
                    password: '',
                },
                loginRules: {
                    email: [
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    nickname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'}
                    ],
                },
                registerRules: {
                    email2: [
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    nickname2: [
                        {required: true, message: '请输入昵称', trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            //登录
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        login({
                            email: this.loginForm.email,
                            password: this.loginForm.password,
                        }).then((res) => {
                            if (res.data.status) {
                                this.loading = false;
                                sessionStorage.setItem('token', res.data.data.token);
                                sessionStorage.setItem('nickname', res.data.data.nickname);
                                this.$router.push({path: '/introduce'})
                            } else {
                                this.loading = false;
                                this.$message.error(res.data.msg);
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                    } else {
                        return false;
                    }
                });
            },
            //注册
            register(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.rLoading = true;
                        register({
                            email: this.registerForm.email,
                            nickname: this.registerForm.nickname,
                            password: this.registerForm.password,
                        }).then((res) => {
                            if (res.data.status) {
                                this.rLoading = false;
                                this.$message.success(res.data.msg);
                            } else {
                                this.rLoading = false;
                                this.$message.error(res.data.msg);
                            }
                        }).catch((error) => {
                            console.log(error);
                        })
                    }else{
                        return false;
                    }
                })
            },
            //重置
            resetForm(formName, type) {
                this.type = type;
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-box {
        width: 100vw;
        height: 100vh;
        background: url("../../assets/login-bg.jpg") no-repeat center;
        background-size: cover;
    }

    .login-form {
        width: 260px;
        height: 165px;
        padding: 50px 30px;
        border-radius: 10px;
        position: fixed;
        left: 0;
        right: 0;
        top: 30%;
        margin: auto;

        /deep/ .el-input__inner {
            color: #ffffff;
            background: rgba(255, 255, 255, .1);
        }

        .login-btn {
            width: 100%;
        }
    }
</style>
