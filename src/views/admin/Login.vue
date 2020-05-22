<template>
    <div class="login-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" class="login-form">
            <el-form-item prop="email">
                <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="ruleForm.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('ruleForm')" class="login-btn" :loading="loading">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {login} from '../../apis'

    export default {
        name: "",
        data() {
            const checkEmail = (rule, value, callback) => {
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (!value) {
                    return callback(new Error('邮箱不能为空'))
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
                loading: false,
                ruleForm: {
                    email: '',
                    password: '',
                },
                rules: {
                    email: [
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        login({
                            email: this.ruleForm.email,
                            password: this.ruleForm.password,
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
