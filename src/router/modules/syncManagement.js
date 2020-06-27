import Layout from '@/layout'
const syncRouter = {
    path:'/sync',
    component:Layout,
    name:'同步管理',
    redirect: 'noRedirect',
    meta:{
        title: '同步管理',
        icon: 'edit'
    },
    children:[
        {
            path: 'app',
            component: () => import('@/views/error-page/401'),
            name:'同步应用管理',
            meta:{ title:'同步应用管理',noCache:true}
        },
        {
            path: 'task',
            component: () => import('@/views/error-page/401'),
            name:'同步任务管理',
            meta:{ title:'同步任务管理',noCache:true}
        },
        {
            path: 'log',
            component: () => import('@/views/error-page/401'),
            name:'汇总日志管理',
            meta:{ title:'汇总日志管理',noCache:true}
        },
        {
            path: 'logDetai',
            component: () => import('@/views/error-page/401'),
            name:'详细日志管理',
            meta:{ title:'详细日志管理',noCache:true}
        },
        {
            path: 'schedule',
            component: () => import('@/views/error-page/401'),
            name:'定时任务管理',
            meta:{ title:'定时任务管理',noCache:true}
        }
    ]
};
export default syncRouter
