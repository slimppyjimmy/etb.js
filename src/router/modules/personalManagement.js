import Layout from '@/layout'
const personalRouter = {
    path:'/personal',
    component:Layout,
    name:'个人管理',
    redirect: '/personal/info',
    meta:{
        title: '个人管理',
        icon: 'edit'
    },
    children:[
        {
            path: 'info',
            component: () => import('@/views/error-page/401'),
            name:'个人信息',
            meta:{ title:'个人信息',noCache:true}
        },
        {
            path: 'agent',
            component: () => import('@/views/error-page/401'),
            name:'个人代理设置',
            meta:{ title:'个人代理设置',noCache:true}
        }
    ]
};
export default personalRouter
