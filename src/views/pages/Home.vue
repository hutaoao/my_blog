<template>
    <div class="content">
        <el-backtop target=".content"></el-backtop>
        <div class="HomeBox">
            <Header class="HeaderBox"/>
            <Aside class="AsideBox"/>
<!--            <Article/>-->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Aside from '../../components/Blog/Aside';
    import Header from '../../components/Blog/Header';
    // import Article from '../../components/Blog/Article';

    export default {
        name: "",
        components: {Aside, Header},
    }
</script>

<style lang="scss" scoped>
    @media (max-width: 768px) {
        .AsideBox {
            display: none;
        }

        .HeaderBox {
            display: block;
        }
    }

    @media (min-width: 768px) {
        .AsideBox {
            display: block;
            flex-shrink: 0;
        }

        .HeaderBox {
            display: none;
        }

        .HomeBox {
            width: 80%;
            display: flex;
            margin: 0 auto;
        }
    }

    .content {
        width: 100vw;
        min-height: calc(100vh - 50px);
        background: #eeeeee;
        padding-bottom: 50px;
        overflow-x: hidden;
    }

    .AsideBox {
        width: 250px;
        margin-right: 20px;
    }
</style>
