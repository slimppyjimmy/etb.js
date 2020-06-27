import Layout from '@/layout'
const unifiedAuthorityMnt = {
    path:'/unifiedAuthorityMnt',
    component:Layout,
    name:'统一权限管理',
    redirect: '/unifiedAuthorityMnt/role',
    meta:{
        title: '统一权限管理',
        icon: 'edit'
    },
    children:[
        {
            path: 'role',
            component: () => import('@/views/error-page/401'),
            name:'角色管理',
            meta:{ title:'角色管理',noCache:true}
        },
        {
            path: 'systemRole',
            component: () => import('@/views/error-page/401'),
            name:'系统角色管理',
            meta:{ title:'系统角色管理',noCache:true}
        },
        {
            path: 'postRole',
            component: () => import('@/views/error-page/401'),
            name:'岗位角色管理',
            meta:{ title:'岗位角色管理',noCache:true}
        },
        {
            path: 'app',
            component: () => import('@/views/error-page/401'),
            name:'应用管理',
            meta:{ title:'应用管理',noCache:true}
        },
        {
            path: 'app/function',
            component: () => import('@/views/error-page/401'),
            name:'应用功能管理',
            meta:{ title:'应用功能管理',noCache:true}
        },
        {
            path: 'roleAuthorize',
            component: () => import('@/views/error-page/401'),
            name:'角色授权',
            meta:{ title:'角色授权',noCache:true}
        },
        {
            path: 'userAuthorize',
            component: () => import('@/views/error-page/401'),
            name:'用户授权',
            meta:{ title:'用户授权',noCache:true}
        },
        {
            path: 'userAuthorize/source',
            component: () => import('@/views/error-page/401'),
            name:'用户权限来源',
            meta:{ title:'用户权限来源',noCache:true}
        },
        {
            path: 'userAuthView',
            component: () => import('@/views/error-page/401'),
            name:'用户实际权限查询',
            meta:{ title:'用户实际权限查询',noCache:true}
        },{
            path: 'security',
            component: () => import('@/views/error-page/401'),
            name:'安全策略配置',
            meta:{ title:'安全策略配置',noCache:true}
        }
    ]
};
export default unifiedAuthorityMnt
