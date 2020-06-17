<template>
    <div class="articleDetail">
        <div class="title">{{this.title}}</div>
        <div class="time">{{this.creatAt}}</div>
        <div class="content" v-html="html"></div>
    </div>
</template>

<script>
    import {getArticleDetail} from "../../apis";

    export default {
        name: "More",
        data() {
            return {
                title: '',
                introduce: '',
                html: '',
                creatAt: '',
            }
        },
        mounted() {
            let id = this.$route.params.id;
            if (id) {
                this.getDetail(id);
                this.articleId = id;
            } else {
                this.$router.push({path: '/'})
            }
        },
        methods: {
            //获取文章详情
            getDetail(id) {
                getArticleDetail({
                    id: id
                }).then((res) => {
                    if (res.data.status) {
                        this.title = res.data.data.title;
                        this.introduce = res.data.data.introduce;
                        this.html = res.data.data.html;
                        this.creatAt = res.data.data.creat_at;
                        this.tags = res.data.data.tags.split(',');
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .articleDetail {
        width: calc(100% - 350px);
        padding: 40px;
        color: #555555;
        background-color: #ffffff;

        .title {
            font-size: 1.7em;
            text-align: center;
            word-break: break-word;
            font-weight: 400;
        }

        .time {
            color: #999;
            font-size: 12px;
            text-align: center;
            margin: 3px 0 60px 0;
        }

        .content {
            width: 100%;

            /deep/ img {
                display: block;
                max-width: 100%;
            }
        }
    }

    @media (max-width: 768px) {
        .articleDetail{
            padding: 20px;
            width: calc(100% - 40px);
        }
    }
</style>