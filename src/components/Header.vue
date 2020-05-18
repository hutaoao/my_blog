<template>
    <div class="headerBox">
        <div class="logo">博客管理后台</div>
        <div class="head-portrait">
            <span class="name">admin</span>
            <el-dropdown>
                <img src="../assets/logo.jpg" alt="" class="head-img">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>更改头像</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: ""
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

            .el-dropdown{
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
</style>
