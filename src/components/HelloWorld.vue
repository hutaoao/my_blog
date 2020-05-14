<template>
    <div class="formBox">
        <h3>注册</h3>
        <p><input v-model="account" type="text" placeholder="请输入账号"></p>
        <p><input v-model="password" id="password" type="text" placeholder="请输入密码"></p>
        <p>
            <button @click="register">确定</button>
        </p>
    </div>
</template>

<script>
    import {login} from '../apis'

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {
                account: '',
                password: ''
            }
        },
        methods: {
            register() {
                let params = new FormData();
                params.append('account', this.account);
                params.append('password', this.password);
                login({
                    account: this.account,
                    password: this.password,
                }).then((res) => {
                    console.log(res);
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
