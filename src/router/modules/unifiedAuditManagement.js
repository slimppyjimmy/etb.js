import Layout from '@/layout'
const unifiedAuditMnt = {
    path:'/unifiedAuditMnt',
    component:Layout,
    name:'统一审计管理',
    redirect: '/unifiedAuditMnt/audit',
    meta:{
        title: '统一审计管理',
        icon: 'edit'
    },
    children:[
        {
            path: 'audit',
            component: () => import('@/views/error-page/401'),
            name:'审计日志查询',
            meta:{ title:'审计日志查询',noCache:true}
        },
        {
            path: 'auditStatistics',
            component: () => import('@/views/error-page/401'),
            name:'审计日志统计',
            meta:{ title:'审计日志统计',noCache:true}
        },
        {
            path: 'auditReport',
            component: () => import('@/views/error-page/401'),
            name:'审计报表下载',
            meta:{ title:'审计报表下载',noCache:true}
        }
    ]
};
export default unifiedAuditMnt
