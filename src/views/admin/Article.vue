<template>
    <div>
        <el-breadcrumb style="margin-bottom: 20px;">
            <el-breadcrumb-item>文章</el-breadcrumb-item>
            <el-breadcrumb-item>列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="title" label="标题" align="center"></el-table-column>
            <el-table-column prop="tags" label="标签" align="center">
                <template slot-scope="scope">
                    <el-tag v-for="tag in scope.row.tags.split(',')" :key="tag" style="margin-right: 10px;">{{tag}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="creat_at" label="发布时间" align="center">
                <template slot-scope="scope">
                    <span>{{timestampToTime(scope.row.creat_at)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="update_at" label="更新时间" align="center">
                <template slot-scope="scope">
                    <span>{{timestampToTime(scope.row.update_at)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    <span>{{transStatus(scope.row.status)}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220" align="center">
                <template slot-scope="scope">
                    <el-button @click="goEdit(scope.row.id)" type="primary" size="small">编辑</el-button>
                    <el-popconfirm title="确定删除吗？" @onConfirm="delArticle(scope.row.id)"
                    >
                        <el-button type="danger" size="small" slot="reference" style="margin: 0 10px;">删除</el-button>
                    </el-popconfirm>
                    <el-button @click="pubArticle(scope.row.id)" type="success" size="small"
                               v-if="scope.row.status === '2'">发布
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getArticle, delArticle, pubArticle} from "../../apis";

    export default {
        name: "",
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
            this.list();
        },
        methods: {
            list() {
                getArticle().then((res) => {
                    if (res.data.status) {
                        this.tableData = res.data.data;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch((error) => {
                    this.$message.error(error);
                })
            },
            //前往编辑
            goEdit(id) {
                this.$router.push({
                    path: '/publish',
                    query: {
                        id: id
                    }
                })
            },
            //删除文章
            delArticle(id) {
                delArticle({
                    id: id
                }).then((res) => {
                    if (res.data.status) {
                        this.list();
                        this.$message.success(res.data.msg);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch((error) => {
                    this.$message.error(error);
                })
            },
            //发布文章
            pubArticle(id) {
                console.log(id);
                pubArticle({
                    id: id
                }).then((res) => {
                    if (res.data.status) {
                        this.list();
                        this.$message.success(res.data.msg);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch((error) => {
                    this.$message.error(error);
                })
            },
            transStatus(status) {
                switch (status) {
                    case '0':
                        return '已删除';
                    case '1':
                        return '已发布';
                    case '2':
                        return '已存稿';
                    default:
                }
            },
            timestampToTime(t) {
                if (t) {
                    let time = new Date(t);
                    let Y = time.getFullYear() + '-';
                    let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-';
                    let D = (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + ' ';
                    let h = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':';
                    let m = (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ':';
                    let s = (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds());
                    return Y + M + D + h + m + s;
                } else {
                    return '';
                }
            }
        }
    }
</script>

<style scoped>

</style>
