import Layout from '@/layout'
const unifiedUserMnt = {
    path:'/unifiedUserMnt',
    component:Layout,
    name:'统一用户管理',
    redirect: '/unifiedUserMnt/user',
    meta:{
        title: '统一用户管理',
        icon: 'edit'
    },
    children:[
        {
            path: 'realm',
            component: () => import('@/views/error-page/401'),
            name:'域管理',
            meta:{ title:'域管理',noCache:true}
        },
        {
            path: 'org',
            component: () => import('@/views/error-page/401'),
            name:'机构管理',
            meta:{ title:'机构管理',noCache:true}
        },
        {
            path: 'user',
            component: () => import('@/views/error-page/401'),
            name:'用户管理',
            meta:{ title:'用户管理',noCache:true}
        },
        {
            path: 'user/transfer',
            component: () => import('@/views/error-page/401'),
            name:'用户调入',
            meta:{ title:'用户调入',noCache:true}
        },
        {
            path: 'orgUser',
            component: () => import('@/views/error-page/401'),
            name:'机构用户管理',
            meta:{ title:'机构用户管理',noCache:true}
        },
        {
            path: 'verificationCode',
            component: () => import('@/views/error-page/401'),
            name:'登录验证码禁用管理',
            meta:{ title:'登录验证码禁用管理',noCache:true}
        }
    ]
};
export default unifiedUserMnt
