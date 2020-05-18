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
                <el-button type="primary" @click="login('ruleForm')" class="login-btn">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {register} from '../../apis'
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
                        register({
                            account: this.ruleForm.email,
                            password: this.ruleForm.password,
                        }).then((res) => {
                            console.log(res);
                            // this.$message.success('登录成功！');
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
        background: url("../../assets/timg.gif") no-repeat;
        background-size: cover;
    }

    .login-form {
        width: 300px;
        height: 165px;
        padding: 50px 30px;
        border-radius: 10px;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
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
