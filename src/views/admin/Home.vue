<template>
    <div>
        <el-container>
            <el-header class="header-box">
                <Header/>
            </el-header>
            <el-container>
                <el-aside width="200px" class="aside-box">
                    <Slider/>
                </el-aside>
                <el-main class="main-box">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Header from '../../components/Header';
    import Slider from '../../components/Slider';

    export default {
        name: "",
        components: {Header, Slider}
    }
</script>

<style scoped>
    .header-box {
        color: #ffffff;
        line-height: 60px;
        background: #383A40;
        padding: 0 50px;
    }

    .aside-box {
        height: calc(100vh - 60px);
        background-color: #545c64;
    }

    .main-box {
        height: calc(100vh - 60px);
    }
</style>
