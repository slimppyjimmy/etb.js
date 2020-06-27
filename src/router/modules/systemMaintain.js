import Layout from '@/layout'
const systemRouter = {
    path:'/system',
    component:Layout,
    name:'系统维护',
    redirect: '/system/importExport',
    meta:{
        title: '系统维护',
        icon: 'edit'
    },
    children:[
        {
            path: 'importExport',
            component: () => import('@/views/error-page/401'),
            name:'数据导入',
            meta:{ title:'数据导入',noCache:true}
        },
        {
            path: 'notice',
            component: () => import('@/views/error-page/401'),
            name:'预警通知管理',
            meta:{ title:'预警通知管理',noCache:true}
        },
        {
            path: 'loginUser',
            component: () => import('@/views/error-page/401'),
            name:'已登录用户管理',
            meta:{ title:'已登录用户管理',noCache:true}
        }
    ]
};
export default systemRouter
