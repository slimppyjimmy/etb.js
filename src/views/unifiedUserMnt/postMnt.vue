<template>
    <el-main>
        <list-mnt :listSetting='listSetting1'>
            <searchBar :searchBar="searchBar1" slot="搜索框"></searchBar>
        </list-mnt>
        <list-mnt :listSetting='listSetting2'>
            <searchBar :searchBar="searchBar2" slot="搜索框"></searchBar>
        </list-mnt>
        <dia-log :dialogSetting='dialogSetting1'></dia-log>
        <dia-log :dialogSetting='dialogSetting2'></dia-log>
    </el-main>
</template>

<script>
    export default {
        data() {
            return {
                listSetting1: {
                    guid: 'db255311-3aff-4bfd-afcb-43d9512e5412',
                    col: 12,
                    url: ':dasc/realmRoles/listRoles',
                    defaultParams: [{
                        key: 'types',
                        value: '4'
                    }],
                    grid: {
                        columns: [{
                                label: '职位名',
                                data: 'roleName'
                            },
                            {
                                label: '排序',
                                data: 'sortNo'
                            }
                        ],
                        buttons: [{
                            name: "修改",
                            loadUrl: ":dasc/roles/get",
                            params: [{
                                key: 'guid',
                                value: 'guid'
                            }],
                            method: 'get',
                            function: "modify",
                            body: ['guid'],
                            dialogSetting: {
                                target: '6dc82939-26fd-486a-8651-c2c36856ca4f',
                                refresh: '82dd30a5-9001-4a35-ad7d-e5fda4cf40f0',
                                executeUrl: ':dasc/roles/modifyPost',
                                executeMethod: 'post',
                                confirm: {
                                    tip: '确认修改？',
                                    success: '修改成功'
                                },
                                properties: [{
                                        type: 'input',
                                        label: '名称',
                                        name: 'roleName',
                                    },
                                    {
                                        type: 'input',
                                        label: '备注',
                                        name: 'remark',
                                    },
                                    {
                                        type: 'input',
                                        label: '排序',
                                        name: 'sortNo'
                                    },
                                    {
                                        type: 'input',
                                        label: '角色类型',
                                        name: 'roleType',
                                        hide: true
                                    },
                                    {
                                        type: 'input',
                                        label: 'mutexType',
                                        name: 'mutexType',
                                        hide: true
                                    },
                                    {
                                        type: 'input',
                                        label: 'guid',
                                        name: 'guid',
                                        hide: true
                                    },
                                    {
                                        type: 'input',
                                        label: 'id',
                                        name: 'id',
                                        hide: true
                                    },
                                    {
                                        type: 'input',
                                        label: 'key',
                                        name: 'key',
                                        hide: true
                                    }

                                ]

                            }
                        }, {
                            name: '删除',
                            function: 'delete',
                            url: ':dasc/roles/deletePost',
                            method: 'post',
                            body: ['guid'],
                            confirm: {
                                tip: '确认删除？',
                                success: '删除成功'
                            }
                        }],
                        event: {
                            rowClick: {
                                target: ['e97f7b30-a56c-4769-8b9f-0932738d9de2'],
                                function: 'toShow'
                            },
                        }

                    }
                },
                searchBar1: {
                    name: '职位管理',
                    guid: '82dd30a5-9001-4a35-ad7d-e5fda4cf40f0',
                    target: 'db255311-3aff-4bfd-afcb-43d9512e5412',
                    properties: [{
                            type: "select",
                            url: "u/realms",
                            paramName: "realmGuid",
                            publicParam: true,
                            dataMap: {
                                label: "name",
                                value: "guid"
                            },
                            width: 100
                        },
                        {
                            name: "新建",
                            type: "button",
                            function: "created",
                            dialogSetting: {
                                target: '6dc82939-26fd-486a-8651-c2c36856ca4f', //指向哪个dialog
                                title: '新建职位', //标题
                                executeUrl: ':dasc/realmRoles/addPostRole', //确认数据url
                                executeParams: [{
                                    publicParam: true,
                                    key: 'realmGuid'
                                }],
                                executeMethod: 'post',
                                confirm: {
                                    tip: "确认增加？",
                                    success: "新增成功"
                                },
                                properties: [{
                                        type: 'input',
                                        label: '名称',
                                        name: 'roleName',
                                    },
                                    {
                                        type: 'input',
                                        label: '备注',
                                        name: 'remark',
                                    },
                                    {
                                        type: 'input',
                                        label: '排序',
                                        name: 'sortNo'
                                    },
                                    {
                                        type: 'input',
                                        label: '角色类型',
                                        name: 'roleType',
                                        defaultValue: '4',
                                        hide: true
                                    }
                                ]
                            }
                        },
                        {
                            name: '刷新',
                            type: "button",
                            function: 'search',
                        }
                    ]

                },
                listSetting2: {
                    guid: 'e97f7b30-a56c-4769-8b9f-0932738d9de2',
                    col: 12,
                    hide: true,
                    url: ':dasc/roleMembers/listMemberUsers',
                    paramName: "roleGuid",
                    grid: {
                        columns: [{
                            label: '姓名',
                            data: 'userName'
                        }, {
                            label: '登录名',
                            data: 'loginName'
                        }],
                        buttons: [{
                            name: '移出',
                            function: 'delete',
                            url: ':dasc/roleMembers/deletePostMembers',
                            confirm: {
                                tip: '确认移出？',
                                success: '移出成功'
                            },
                            body: ['guid'],
                            params: {
                                key: 'roleGuid',
                                value: 'guid'
                            },
                            defaultParams:{
                                key:'memberType',
                                value:'1',
                            },
                            method: 'post'
                        }]
                    }

                },
                searchBar2: {
                    name: '用户成员',
                    autoSearch: false,
                    guid: '36756e7a-5d2a-4ff7-9b8b-b17c4fe359cc',
                    target: 'e97f7b30-a56c-4769-8b9f-0932738d9de2',
                    properties: [
                        {
                        name: "添加职位人员",
                        type: "button",
                        // url: 'dasc/realmManagers/prepareUsers',
                        function: "check",
                        dialogSetting: {
                            target: '4d464d75-7011-4a9c-9deb-2b78491626e2', //指向哪个dialog
                            title: '添加管理员', //标题
                            executeUrl: ':dasc/roleMembers/addPostMembers', //提交地址
                            executeMethod: 'post',
                            executeParams: [{
                                cacheData: true,
                                key: 'roleGuid',
                                value: 'guid'
                            }],
                            executeDefaultParams:[{
                                key:'memberType',
                                value:'1'
                            }],
                            body: ['guid'],
                            showList: true,
                            showSearchbar: true,
                            searchBar: {
                                name: "选择用户",
                                guid: 'bd47ef91-2fe4-48bc-a8d5-ed09a3295be2',
                                target: '05020464-5722-4ba5-8ced-f30c39fea3a2',
                                autoSearch: true,
                                properties: [{
                                    type: "button",
                                    function: "search",
                                    name: "搜索",
                                }]
                            },
                            listSetting: {
                                guid: '05020464-5722-4ba5-8ced-f30c39fea3a2',
                                url: ":dasc/roleMembers/memberPrepare",
                                params: {
                                    key: 'roleGuid',
                                    value: 'guid'
                                },
                                publicParam:{
                                    key:'realmGuid'
                                },
                                defaultParams:[{
                                    key:'memberType',
                                    value:'1'
                                }],
                                target: '4d464d75-7011-4a9c-9deb-2b78491626e2', //指向父组件的guid
                                autoSearch: true,
                                checkbox: true,
                                col: 24,
                                grid: {
                                    columns: [{
                                            lable: '名称',
                                            data: 'userName',
                                        },
                                        {
                                            lable: '登录名',
                                            data: 'loginName',
                                        }
                                    ]
                                },
                                pagination: {
                                    size: 10
                                }
                            },
                            confirm: {
                                tip: "确认增加？",
                                success: "新增成功"
                            },

                        }
                    }, {
                        name: '刷新',
                        type: "button",
                        function: 'search',
                        params: {
                            cacheData: true,
                            key: 'roleGuid',
                            value: 'guid' //row数据中的字段
                        },
                        method: 'get'
                    }]
                },
                dialogSetting1: {
                    guid: '6dc82939-26fd-486a-8651-c2c36856ca4f'
                },
                dialogSetting2: {
                    guid: '4d464d75-7011-4a9c-9deb-2b78491626e2'
                }
            }
        }
    }
</script>

<style>

</style>