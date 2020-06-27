<template>
    <el-main>
        <list-mnt :listSetting='listSetting1'>
            <searchBar :searchBar="searchBar1" slot="搜索框"></searchBar>
        </list-mnt>
        <el-col :span='12'>
            <list-mnt :listSetting='listSetting2'>
                <searchBar :searchBar="searchBar2" slot="搜索框"></searchBar>
            </list-mnt>
            <tree-mnt :treeSetting="treeSetting">
                <searchBar :searchBar="searchBar3" slot="搜索框"></searchBar>
            </tree-mnt>
        </el-col>
        <dia-log :dialogSetting='dialogSetting1'></dia-log>
    </el-main>

</template>

<script>
    export default {
        data() {
            return {
                listSetting1: {
                    guid: '0cb63425-189a-417b-bf16-341e90adf6bd',
                    col: 12,
                    url: ':dasc/realms/list',
                    grid: {
                        columns: [{
                                label: '域名称',
                                data: 'name'
                            },
                            {
                                label: '排序',
                                data: 'sortNo'
                            }
                        ],
                        buttons: [{
                            name: '修改',
                            function: "modify",
                            dialogSetting: {
                                target: 'baea753a-52f5-40e7-a154-4fcb4befc5b8',
                                title: '修改域',
                                prepareUrl: ':dasc/realms/get',
                                executeUrl: ':dasc/realms/modify',
                                prepareParam:'guid',
                                prepareMethod:'get',
                                executeMethod:'post',
                                confirm: {
                                tip: "确认修改？",
                                success: "修改成功"
                            },
                                properties: [{
                                        type: 'input',
                                        label: '标志',
                                        name: 'guid',
                                        disabled: true,
                                    },
                                    {
                                        type: 'input',
                                        label: '编号',
                                        name: 'id',
                                        hide: true,
                                    },
                                    {
                                        type: 'input',
                                        label: '名称',
                                        name: 'name',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: 'input',
                                        label: '排序号',
                                        name: 'sortNo',
                                        defaultValue: '9999',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    }
                                ]
                            }
                        }, {
                            name: '删除'
                        }],
                        event: {
                            rowClick: {
                                target: ['a05f0c73-4e43-455f-9d87-9db78cdac8a6',
                                    '61751c7e-8d42-447c-b4d5-4cfc2a8ce475'
                                ],
                                function: 'toShow'
                            },
                        }
                    }
                },
                searchBar1: {
                    name: '域',
                    guid: 'e65b1717-bebe-47d9-a676-ababbf1399bd',
                    target: '0cb63425-189a-417b-bf16-341e90adf6bd',
                    paramName: "realmGuid",
                    properties: [{
                        name: "新建",
                        type: "button",
                        function: "created",
                        dialogSetting: {
                            target: 'baea753a-52f5-40e7-a154-4fcb4befc5b8',
                            title: '新建域',
                            prepareUrl: ':dasc/realms/prepare',
                            executeUrl: ':dasc/realms/add',
                            method: 'post',
                            confirm: {
                                tip: "确认增加？",
                                success: "新增成功"
                            },
                            properties: [{
                                    type: 'input',
                                    label: '姓名',
                                    name: 'name',
                                    required: true,
                                    validateErrorMessage: "必填项不能为空"
                                },
                                {
                                    type: 'input',
                                    label: '排序号',
                                    name: 'sortNo',
                                    defaultValue: '9999',
                                    required: true,
                                    validateErrorMessage: "必填项不能为空"
                                }
                            ]
                        }
                    }, {
                        name: '刷新',
                        type: "button",
                        function: 'search'
                    }]
                },
                listSetting2: {
                    guid: 'a05f0c73-4e43-455f-9d87-9db78cdac8a6',
                    col: 24,
                    hide: true,
                    paramName: "realmGuid",
                    url: ':dasc/realmManagers/listUsers',
                    grid: {
                        columns: [{
                            label: '姓名',
                            data: 'userName'
                        }, {
                            label: '登录名',
                            data: 'loginName'
                        }],
                        buttons: [{
                            name: '移出'
                        }]
                    }

                },
                searchBar2: {
                    name: '域管理员',
                    autoSearch: false,
                    guid: '95050e27-0967-40a4-8d8c-bea8bf1bb804',
                    target: 'a05f0c73-4e43-455f-9d87-9db78cdac8a6',
                    properties: [{
                        name: "添加管理员",
                        type: "button",
                        url: ':dasc/realms/prepare',
                        function: "created",
                    }, {
                        name: '刷新',
                        type: "button",
                        function: 'search'
                    }]
                },
                treeSetting: {
                    guid: '61751c7e-8d42-447c-b4d5-4cfc2a8ce475',
                    col: 24, //tree组件宽度，可选项，24珊格布局单位
                    name: "机构列表", //组件标题，可选选
                    hide: true,
                    url: ":dasc/realmOrgs/listUnits", //tree组件数据接口，必须项，不能为空
                    paramName: 'realmGuid',
                    treeLabel: "fullName", //tree展示的字段名称，必选项，不能为空，必须tree数据字段中的一项
                    showCheckBox: false, //是否显示checkbox，可选项
                    checkStrictly: false, //使用checkbox时父子是否进行关联
                    expandAll: true, //自动展开所有节点
                    showLine: false,
                    showIcon: true, //tree节点携带的数据，可选项，不项则默认携带所有后台返回数据
                    treeNodeButton: [{
                            name: "修改",
                            url: ":dasc/orgs/changeSortDown",
                            function: "modify",
                            method: 'post',
                            params: [{
                                key: "orgGuid",
                                value: "guid"
                            }],
                            body: ['guid']
                        },
                        {
                            name: "撤销",
                            url: ':dasc/orgs/delete',
                            function: "delete",
                            method: 'post',
                            body: ['guid'],
                            confirm: {
                                tip: "确认撤销该机构？",
                                success: "撤销成功"
                            },
                        },
                    ]
                },
                searchBar3: { //searchbar，可选项
                    name: '机构列表',
                    autoSearch: false,
                    guid: '1f9e7a03-3e83-49fe-85db-cd8c2e39b1f5',
                    target: '61751c7e-8d42-447c-b4d5-4cfc2a8ce475',
                    properties: [{
                            name: '新建',
                            type: "button",
                        },
                        {
                            type: "button",
                            function: "search",
                            name: "刷新"
                        }
                    ]
                },
                dialogSetting1: { //第一层弹框类实例
                    guid: 'baea753a-52f5-40e7-a154-4fcb4befc5b8',
                },
            }
        }
    }
</script>

<style>

</style>