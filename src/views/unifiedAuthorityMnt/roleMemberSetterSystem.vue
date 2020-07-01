<template>
    <el-main>
        <tree-mnt :treeSetting="treeSetting1">
            <searchBar :searchBar="searchBar1" slot="搜索框"></searchBar>
        </tree-mnt>
        <el-col :span='12'>
            <list-mnt :listSetting='listSetting2'>
                <searchBar :searchBar="searchBar2" slot="搜索框"></searchBar>
            </list-mnt>
            <list-mnt :listSetting='listSetting3'>
                <searchBar :searchBar="searchBar3" slot="搜索框"></searchBar>
            </list-mnt>
            <list-mnt :listSetting='listSetting4'>
                <searchBar :searchBar="searchBar4" slot="搜索框"></searchBar>
            </list-mnt>
        </el-col>
        <dia-log :dialogSetting='dialogSetting1'></dia-log>
        <dia-log :dialogSetting='dialogSetting2'></dia-log>
        <dia-log :dialogSetting='dialogSetting3'></dia-log>
    </el-main>
</template>

<script>
    export default {
        data() {
            return {
                treeSetting1: {
                    guid: 'b4abf1e2-8030-45fc-a814-ae5a0fdba46f',
                    col: 12, //tree组件宽度，可选项，24珊格布局单位
                    name: "机构列表", //组件标题，可选选
                    url: ":dasc/realmRoles/listRoles", //tree组件数据接口，必须项，不能为空
                    paramName: 'realmGuid',
                    defaultParams: [{
                        key: 'types',
                        value: '1'
                    }],
                    treeLabel: "roleName", //tree展示的字段名称，必选项，不能为空，必须tree数据字段中的一项
                    showCheckBox: false, //是否显示checkbox，可选项
                    checkStrictly: false, //使用checkbox时父子是否进行关联
                    expandAll: true, //自动展开所有节点
                    showLine: false,
                    showIcon: true,
                    treeNodeData: ['roleName', 'guid', 'id', 'sortNo', 'roleTypeName', 'roleType',
                        'parentGuid'
                    ], //tree节点携带的数据，可选项，不项则默认携带所有后台返回数据

                    event: {
                        rowClick: {
                            target: ['a21f442d-e2fe-486e-a0de-6f1fb1400fbb', '98618a84-1b5c-4d6a-891b-f2c166c2452b',
                                'd80b89c1-763d-4da4-a3bf-722ed6106550'
                            ],
                            function: 'toShow'
                        },
                    }
                },
                searchBar1: {
                    guid: '356e579f-4353-4a6e-aaf1-6d5a963edfa5',
                    target: 'b4abf1e2-8030-45fc-a814-ae5a0fdba46f', //searchbar，可选项
                    properties: [{
                            type: "select",
                            url: "u/realms?checkPublicRoles=true",
                            paramName: "realmGuid",
                            publicParam: true,
                            dataMap: {
                                label: "name",
                                value: "guid"
                            },
                            width: 200
                        },
                        {
                            name: "新建",
                            type: "button",
                            function: "created",
                            dialogSetting: {
                                target: '39210bab-8cac-4de5-a673-dc8d35beac73',
                                title: '增加角色',
                                prepareUrl: ':dasc/realmRoles/prepareAdd',
                                prepareParams: [{
                                    publicParam: true,
                                    key: 'realmGuid'
                                }],
                                defaultPrepareParams: [{
                                    key: 'roleTypes',
                                    value: '1,2'
                                }],
                                executeUrl: ':dasc/realmRoles/addGeneralRole',
                                executeParams: [{
                                    publicParam: true,
                                    key: 'realmGuid',
                                }],
                                executeMethod: 'post',
                                prepareMethod: 'get',
                                confirm: {
                                    tip: "确认增加？",
                                    success: "新增成功"
                                },
                                properties: [{
                                        type: 'input',
                                        label: '名称',
                                        name: 'roleName',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: "select",
                                        label: '类型',
                                        name: 'roleType', //存储数据的字段名
                                        data: 'roleTypes', //准备数据对应字段名
                                        dataMap: { //下拉框数据与准备数据对应关系
                                            label: "name",
                                            value: "type"
                                        },
                                        required: true,
                                        defaultValue: 1,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: "cascader",
                                        label: '上级角色',
                                        name: 'parentGuid', //存储数据的字段名
                                        data: 'parents', //准备数据对应字段名
                                        isString: true,
                                        dataMap: { //下拉框数据与准备数据对应关系
                                            label: "roleName",
                                            value: "guid"
                                        },
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: "select",
                                        label: '互斥类型',
                                        name: 'mutexType', //存储数据的字段名
                                        data: 'mutexTypes', //准备数据对应字段名
                                        dataMap: { //下拉框数据与准备数据对应关系
                                            label: "name",
                                            value: "type"
                                        },
                                        required: true,
                                        defaultValue: 1,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: 'input',
                                        label: '备注',
                                        name: 'remark',
                                    },
                                    {
                                        type: 'input',
                                        label: '排序',
                                        name: 'sortNo',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                ]
                            }
                        },
                        {
                            type: "button",
                            function: "search",
                            name: "搜索"
                        },
                    ]
                },
                listSetting2: {
                    guid: 'a21f442d-e2fe-486e-a0de-6f1fb1400fbb',
                    col: 24,
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
                                name: "上移",
                                url: ":dasc/roleMembers/changeSortUp",
                                function: "modify",
                                method: 'post',
                                params: [{
                                    cacheData: true,
                                    key: "roleGuid",
                                    value: "guid"
                                }, {
                                    key: 'memberGuid',
                                    value: 'guid'
                                }],
                                body: ['guid']
                            },
                            {
                                name: "下移",
                                url: ":dasc/roleMembers/changeSortDown",
                                function: "modify",
                                method: 'post',
                                params: [{
                                    cacheData: true,
                                    key: "roleGuid",
                                    value: "guid"
                                }, {
                                    key: 'memberGuid',
                                    value: 'guid'
                                }],
                                body: ['guid']
                            },
                            {
                                name: '移出',
                                function: 'delete',
                                url: ':dasc/roleMembers/deleteSysUserMembers',
                                confirm: {
                                    tip: '确认移出？',
                                    success: '移出成功'
                                },
                                body: ['guid'],
                                params: {
                                    key: 'roleGuid',
                                    value: 'guid'
                                },
                                method: 'post'
                            }
                        ]
                    }

                },
                searchBar2: {
                    name: '用户成员',
                    autoSearch: false,
                    guid: '7ce1e70d-f90d-4a25-abd5-438b20fa611e',
                    target: 'a21f442d-e2fe-486e-a0de-6f1fb1400fbb',
                    properties: [{
                        name: "添加用户成员",
                        type: "button",
                        // url: 'dasc/realmManagers/prepareUsers',
                        function: "check",
                        dialogSetting: {
                            target: 'c1f820ec-88ef-4b58-be64-43ab76a24be4', //指向哪个dialog
                            title: '添加管理员', //标题
                            executeUrl: ':dasc/roleMembers/addPostMembers', //提交地址
                            executeMethod: 'post',
                            executeParams: [{
                                cacheData: true,
                                key: 'roleGuid',
                                value: 'guid'
                            }],
                            executeDefaultParams: [{
                                key: 'memberType',
                                value: '1'
                            }],
                            body: ['guid'],
                            showList: true,
                            showSearchbar: true,
                            searchBar: {
                                name: "选择用户",
                                guid: '3d847be3-a272-482d-8d14-8bf09df09a96',
                                target: '9430ccc4-d852-4e13-b267-08174c8f86b6',
                                autoSearch: true,
                                properties: [{
                                    type: "button",
                                    function: "search",
                                    name: "搜索",
                                }]
                            },
                            listSetting: {
                                guid: '9430ccc4-d852-4e13-b267-08174c8f86b6',
                                url: ":dasc/roleMembers/memberPrepare",
                                target: 'c1f820ec-88ef-4b58-be64-43ab76a24be4', //指向父组件的guid
                                params: {
                                    key: 'roleGuid',
                                    value: 'guid'
                                },
                                publicParam: {
                                    key: 'realmGuid'
                                },
                                defaultParams: [{
                                    key: 'memberType',
                                    value: '1'
                                }],

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
                listSetting3: {
                    guid: '98618a84-1b5c-4d6a-891b-f2c166c2452b',
                    col: 24,
                    hide: true,
                    url: ':dasc/roleMembers/listMemberRoles',
                    paramName: "roleGuid",
                    defaultParams: [{
                        key: 'types',
                        value: '1'
                    }],
                    publicParam: {
                        key: 'realmGuid'
                    },
                    grid: {
                        columns: [{
                            label: '角色名称',
                            data: 'roleName'
                        }],
                        buttons: [{
                                name: "上移",
                                url: ":dasc/roleMembers/changeSortUp",
                                function: "modify",
                                method: 'post',
                                params: [{
                                    cacheData: true,
                                    key: "roleGuid",
                                    value: "guid"
                                }, {
                                    key: 'memberGuid',
                                    value: 'guid'
                                }],
                                body: ['guid']
                            },
                            {
                                name: "下移",
                                url: ":dasc/roleMembers/changeSortDown",
                                function: "modify",
                                method: 'post',
                                params: [{
                                    cacheData: true,
                                    key: "roleGuid",
                                    value: "guid"
                                }, {
                                    key: 'memberGuid',
                                    value: 'guid'
                                }],
                                body: ['guid']
                            },
                            {
                                name: '移出',
                                function: 'delete',
                                url: ':dasc/roleMembers/deleteSysRoleMembers',
                                confirm: {
                                    tip: '确认移出？',
                                    success: '移出成功'
                                },
                                body: ['guid'],
                                params: {
                                    key: 'roleGuid',
                                    value: 'guid'
                                },
                                method: 'post'
                            }
                        ]
                    }

                },
                searchBar3: {
                    name: '角色成员',
                    autoSearch: false,
                    guid: 'd01c4990-f365-4295-9ffa-6bbd3e4e7cb3',
                    target: '98618a84-1b5c-4d6a-891b-f2c166c2452b',
                    properties: [{
                        name: '添加角色成员',
                        type: "button",
                        // url: 'dasc/realmManagers/prepareUsers',
                        function: "check",
                        dialogSetting: {
                            target: '38bd814c-6860-45de-aec5-a0c1edcda501', //指向哪个dialog
                            title: '添加角色成员', //标题
                            executeUrl: ':dasc/roleMembers/addSysRoleMembers', //提交地址
                            executeMethod: 'post',
                            executeParams: [{
                                cacheData: true,
                                key: 'roleGuid',
                                value: 'guid'
                            }],
                            executeDefaultParams: [{
                                key: 'memberType',
                                value: '2'
                            }],
                            body: ['guid'],
                            showList: true,
                            showSearchbar: true,
                            searchBar: {
                                name: "选择用户",
                                guid: '24c9aaf1-a4ef-4990-ba7c-c58c249fc5f7',
                                target: 'd80b89c1-763d-4da4-a3bf-722ed6106550',
                                autoSearch: true,
                                properties: [{
                                    type: "button",
                                    function: "search",
                                    name: "搜索",
                                }]
                            },
                            listSetting: {
                                guid: 'd80b89c1-763d-4da4-a3bf-722ed6106550',
                                url: ":dasc/roleMembers/memberPrepare",
                                target: '38bd814c-6860-45de-aec5-a0c1edcda501', //指向父组件的guid
                                params: {
                                    key: 'roleGuid',
                                    value: 'guid'
                                },
                                publicParam: {
                                    key: 'realmGuid'
                                },
                                defaultParams: [{
                                    key: 'memberType',
                                    value: '2'
                                }, {
                                    key: 'types',
                                    value: '1'
                                }],
                                autoSearch: true,
                                checkbox: true,
                                col: 24,
                                grid: {
                                    columns: [{
                                            lable: '名称',
                                            data: 'roleName',
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
                listSetting4: {
                    guid: 'd80b89c1-763d-4da4-a3bf-722ed6106550',
                    col: 24,
                    hide: true,
                    url: ':dasc/roleMembers/listRolesByMember',
                    paramName: "memberGuid",
                    grid: {
                        columns: [{
                            label: '角色名称',
                            data: 'roleName'
                        }],
                        buttons: [
                            {
                                name: '移出',
                                function: 'delete',
                                url: ':dasc/roleMembers/deleteBelongingRoles',
                                confirm: {
                                    tip: '确认移出？',
                                    success: '移出成功'
                                },
                                body: ['guid'],
                                params: {
                                    key: 'memberGuid',
                                    value: 'guid'
                                },
                                method: 'post'
                            }
                        ]
                    }

                },
                searchBar4: {
                    name: '所属角色',
                    autoSearch: false,
                    guid: '8626dacd-c722-4c91-90c6-186eee9c6f70',
                    target: 'd80b89c1-763d-4da4-a3bf-722ed6106550',
                    properties: [{
                        name: '添加角色成员',
                        type: "button",
                        // url: 'dasc/realmManagers/prepareUsers',
                        function: "check",
                        dialogSetting: {
                            target: '1999672f-7bed-4095-9baf-87a294ac008b', //指向哪个dialog
                            title: '添加所属角色', //标题
                            executeUrl: ':dasc/roleMembers/addBelongingRoles', //提交地址
                            executeMethod: 'post',
                            executeParams: [{
                                cacheData: true,
                                key: 'memberGuid',
                                value: 'guid'
                            }],
                            executeDefaultParams: [{
                                key: 'memberType',
                                value: '2'
                            }],
                            body: ['guid'],
                            showList: true,
                            showSearchbar: true,
                            searchBar: {
                                name: "选择用户",
                                guid: '0162fb47-4be4-48ff-9468-43bca2c6ea39',
                                target: 'c839fdd8-d2ae-47f9-a120-e9590d91e2f8',
                                autoSearch: true,
                                properties: [{
                                    type: "button",
                                    function: "search",
                                    name: "搜索",
                                }]
                            },
                            listSetting: {
                                guid: 'c839fdd8-d2ae-47f9-a120-e9590d91e2f8',
                                url: ":dasc/roleMembers/prepareBelongingRoles",
                                target: '1999672f-7bed-4095-9baf-87a294ac008b', //指向父组件的guid
                                params: {
                                    key: 'memberGuid',
                                    value: 'guid'
                                },
                                publicParam: {
                                    key: 'realmGuid'
                                },
                                defaultParams: [{
                                    key: 'roleTypes',
                                    value: '1'
                                }],
                                autoSearch: true,
                                checkbox: true,
                                col: 24,
                                grid: {
                                    columns: [{
                                            lable: '名称',
                                            data: 'roleName',
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
                    guid: 'c1f820ec-88ef-4b58-be64-43ab76a24be4'
                },
                dialogSetting2: {
                    guid: '38bd814c-6860-45de-aec5-a0c1edcda501'
                },
                dialogSetting3: {
                    guid: '1999672f-7bed-4095-9baf-87a294ac008b'
                }
            }
        }
    }
</script>

<style>

</style>