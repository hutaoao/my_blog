<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
    #app {
        font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
        /*-webkit-font-smoothing: antialiased; //抗锯齿*/
        /*-moz-osx-font-smoothing: grayscale;*/
    }
    *{
        margin: 0;
        padding: 0;
    }
    a{
        color: #555555;
        text-decoration: none;
    }
</style>
