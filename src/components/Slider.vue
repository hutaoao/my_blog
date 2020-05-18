<template>
    <div>
        <el-menu
            default-active="1"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item index="1">
                <i class="el-icon-video-camera-solid"></i>
                <span slot="title">介绍</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-s-order"></i>
                    <span>文章</span>
                </template>
                <el-menu-item index="2-1">列表</el-menu-item>
                <el-menu-item index="2-2">发布</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped>

</style>
