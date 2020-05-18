import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/pages/Index.vue'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
        },
        {
            path: '/login',
            name: 'login',
            meta: {requiresAuth: false},
            component: () => import('../views/admin/Login.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('../views/admin/Home.vue'),
            meta: {requiresAuth: true},//路由元信息 - 做登录校验
            children: [
                {
                    path: '/article',
                    name: 'article',
                    component: () => import('../views/admin/Article.vue')
                }
            ]
        },
        {
            path: "/404",
            name: "404",
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
        if (sessionStorage.getItem('auth')) {  // 判断当前的 auth 是否存在
            next();
        } else {
            /*next({
                path: '/login',
            })*/
            next();
        }
    } else {
        next() // 确保一定要调用 next()
    }
});

export default router;
