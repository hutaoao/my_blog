import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/pages/Home.vue';
//引入nprogress - 网页加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            // name: 'Home', //当某个路由有子级路由的时候，这时候父级路由需要一个默认的路由，所以父级路由不能定义name属性（会有警告）
            component: Home,
            meta: {requiresAuth: false},
            // redirect: '/article',//路由重定向
            children: [
                {
                    path: '/',
                    name: 'Article',
                    component: () => import('../views/pages/Article')
                },
                {
                    path: '/more/:id',
                    name: 'More',
                    component: () => import('../views/pages/More')
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            meta: {requiresAuth: false},
            component: () => import('../views/admin/Login.vue')
        },
        {
            path: '/admin',
            // name: 'admin', //当某个路由有子级路由的时候，这时候父级路由需要一个默认的路由，所以父级路由不能定义name属性（会有警告）
            component: () => import('../views/admin/Home.vue'),
            meta: {requiresAuth: true},//路由元信息 - 做登录校验
            // redirect: '/admin-introduce',//路由重定向
            children: [
                {
                    path: '/admin',
                    name: 'AdminIntroduce',
                    component: () => import('../views/admin/Introduce.vue')
                },
                {
                    path: '/admin-article',
                    name: 'AdminArticle',
                    component: () => import('../views/admin/Article.vue')
                },
                {
                    path: '/admin-publish',
                    name: 'AdminPublish',
                    component: () => import('../views/admin/Publish.vue')
                }
            ]
        },
        {
            path: "/404",
            name: "404",
            meta: {requiresAuth: false},
            component: () => import('../views/404.vue')
        },
        {
            path: "*",
            redirect: "/404"  //路由重定向
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (sessionStorage.getItem('token')) {  // 判断当前的 auth 是否存在
            NProgress.start();//进度条开始
            next();
        } else {
            next({
                path: '/login',
            });
        }
    } else {
        NProgress.start();//进度条开始
        next(); // 确保一定要调用 next()
    }
});

router.afterEach(() => {
    NProgress.done();//进度条结束
})

export default router;
