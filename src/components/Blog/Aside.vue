<template>
    <div class="asideBox">
        <div class="top">
            <div class="meta">
                <p class="title">海盗船长的博客</p>
                <p class="subTitle">记录学习的技能和遇到的问题</p>
            </div>
            <div class="nav">
                <el-menu default-active="1">
                    <el-menu-item index="1">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-s-finance"></i>
                        <span slot="title">标签</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">归档</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">关于</span>
                    </el-menu-item>
                </el-menu>
            </div>
        </div>
        <div class="bottom">
            <div class="authorInfo">
                <img class="author-img" src="../../assets/logo.jpg" alt="">
                <p class="author-name">海盗船长</p>
            </div>
            <div class="authorLinks">

            </div>
            <div class="blogRoll">
                <p class="blog-roll-title">前端闲逛</p>
                <ul class="blog-roll-list">
                    <li class="blog-roll-item">
                        <a href="http://es6.ruanyifeng.com/" title="ES6" target="_blank">ES6</a>
                    </li>
                    <li class="blog-roll-item">
                        <a href="https://cn.vuejs.org/" title="Vue" target="_blank">Vue</a>
                    </li>
                    <li class="blog-roll-item">
                        <a href="https://react.docschina.org/" title="React" target="_blank">React</a>
                    </li>
                    <li class="blog-roll-item">
                        <a href="https://github.com/" title="GitHub" target="_blank">GitHub</a>
                    </li>
                    <li class="blog-roll-item">
                        <a href="https://www.swiper.com.cn/" title="Swiper" target="_blank">Swiper</a>
                    </li>
                    <li class="blog-roll-item">
                        <a href="https://electronjs.org/" title="Electron" target="_blank">Electron</a>
                    </li>
                    <li class="blog-roll-item">
                        <a href="https://www.iconfont.cn/" title="Iconfont" target="_blank">Iconfont</a>
                    </li>
                    <li class="blog-roll-item">
                        <a href="https://hexo.io/zh-cn/" title="Hexo" target="_blank">Hexo</a>
                    </li>
                    <li class="blog-roll-item">
                        <a href="http://element-cn.eleme.io/#/zh-CN" title="Element" target="_blank">Element</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Aside",
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        },
        methods:{
            handleScroll () {
                const obj = document.getElementsByClassName('bottom')[0];
                let scroll = document.documentElement.scrollTop || document.body.scrollTop;
                if(scroll >= 335){
                    obj.style.top = '20px';
                    obj.style.position = 'fixed';
                }else {
                    obj.style.position = 'static';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .asideBox {
        .top {
            background: #ffffff;
            margin-bottom: 20px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);

            .meta {
                padding: 20px 0;
                color: #fff;
                background: #222;
                text-align: center;

                .title {
                    line-height: 36px;
                    font-size: 20px;
                }

                .subTitle {
                    color: #ddd;
                    font-size: 13px;
                    margin: 10px 10px 0;
                }
            }

            .nav {
                padding: 15px 0;

                /deep/ .el-menu-item {
                    height: 50px;
                    line-height: 50px;
                    background-color: #ffffff;
                    padding-left: 40px !important;

                    &:hover {
                        background-color: #ffffff;
                    }
                }
            }
        }

        .bottom {
            width: 230px;
            color: #555555;
            background: #ffffff;
            padding: 20px 10px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);

            .authorInfo {
                .author-img {
                    display: block;
                    margin: 0 auto;
                    padding: 2px;
                    max-width: 120px;
                    height: auto;
                    border: 1px solid #eee;
                }

                .author-name {
                    margin: 0;
                    text-align: center;
                    color: #222;
                    font-weight: 600;
                }
            }

            .blogRoll {
                text-align: center;
                margin-top: 20px;
                padding: 6px 0 0;
                border-top: 1px dotted #ccc;

                .blog-roll-title {
                    color: #555;
                    font-size: 14px;
                    font-weight: 600;
                }

                .blog-roll-list {
                    margin: 0;
                    padding: 0;
                    list-style: none;

                    .blog-roll-item {
                        padding: 5px 10px;
                        display: inline-block;

                        a {
                            color: #555;
                            max-width: 280px;
                            box-sizing: border-box;
                            display: inline-block;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            text-decoration: none;
                            outline: none;
                            border-bottom: 1px solid #555;
                            word-wrap: break-word;
                            line-height: 2;
                        }
                    }
                }
            }
        }
    }
</style>