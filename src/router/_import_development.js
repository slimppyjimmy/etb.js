module.exports = file => require('@/views' + file + '.vue').default // 传入文件名生成路径，支持在cas下实现路由懒加载
