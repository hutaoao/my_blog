<template>
    <div class="ArticleCount">
        <article v-for="(item, index) in articles" :key="index" class="article-detail">
            <div class="post-block">
                <h2 class="article-title">
                    <router-link to="/">{{item.title}}</router-link>
                </h2>
                <p class="article-time"><i class="el-icon-date"/> 发布于 {{timestampToTime(item.creat_at)}}</p>
                <div class="article-introduce">{{item.introduce}}</div>
                <div class="article-btn">
                    <router-link :to="`/more/${item.id}`" class="btn">
                        阅读全文 »
                    </router-link>
                </div>
            </div>
        </article>
        <nav class="pagination">
            <el-pagination
                    background
                    :total="total"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
            >
            </el-pagination>
        </nav>
    </div>
</template>

<script>
    import {getAllArticle} from "../../apis";

    export default {
        name: "Article",
        data() {
            return {
                articles: [],
                total: 0,
                pageSize: 5,
                currentPage: 1,
            }
        },
        mounted() {
            this.articleList();
        },
        methods: {
            articleList() {
                getAllArticle({
                    pageSize: this.pageSize,
                    pageIndex: this.currentPage,
                }).then((res) => {
                    if (res.data.status) {
                        this.total = res.data.total;
                        this.articles = res.data.data;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch((error) => {
                    this.$message.error(error);
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.articleList();
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

<style lang="scss" scoped>
    .ArticleCount {
        width: 100%;

        .article-detail {
            padding: 40px;
            background: #fff;
            margin-bottom: 20px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);

            .article-title {
                color: #555;
                font-size: 18px;
                text-align: center;
            }

            .article-time {
                color: #999;
                font-size: 12px;
                text-align: center;
                margin: 3px 0 60px 0;
            }

            .article-introduce {
                color: #555555;
                text-align: justify;
            }

            .article-btn {
                text-align: center;
                margin-top: 40px;

                .btn {
                    display: inline-block;
                    padding: 0 20px;
                    font-size: 14px;
                    color: #555;
                    background: #fff;
                    border: 2px solid #555;
                    text-decoration: none;
                    border-radius: 2px;
                    transition-property: background-color;
                    transition-duration: 0.2s;
                    transition-timing-function: ease-in-out;
                    transition-delay: 0s;
                    line-height: 2;

                    &:hover {
                        color: #ffffff;
                        background-color: #222222;
                    }
                }
            }
        }

        .pagination {
            margin: 12px 0 0;
            text-align: center;
            background: #fff;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
            padding: 10px 0 10px;
        }
    }
</style>