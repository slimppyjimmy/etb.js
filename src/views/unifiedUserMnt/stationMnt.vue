<template>
    <el-main>
        <tree-mnt :treeSetting="treeSetting1">
            <searchBar :searchBar="searchBar1" slot="搜索框"></searchBar>
        </tree-mnt>

        <list-mnt :listSetting='listSetting2'>
            <searchBar :searchBar="searchBar2" slot="搜索框"></searchBar>
        </list-mnt>
         <list-mnt :listSetting='listSetting3'>
            <searchBar :searchBar="searchBar3" slot="搜索框"></searchBar>
        </list-mnt>
        <dia-log :dialogSetting='dialogSetting1'></dia-log>
        <dia-log :dialogSetting='dialogSetting2'></dia-log>
    </el-main>

</template>

<script>
    export default {
        data() {
            return {
                treeSetting1: {
                    guid: '17745cb9-2f8a-4f1e-a299-df575f3853da',
                    col: 8, //tree组件宽度，可选项，24珊格布局单位
                    name: "机构列表", //组件标题，可选选
                    url: ":dasc/realmOrgs/listOrgs", //tree组件数据接口，必须项，不能为空
                    paramName: 'realmGuid',
                    treeLabel: "fullName", //tree展示的字段名称，必选项，不能为空，必须tree数据字段中的一项
                    showCheckBox: false, //是否显示checkbox，可选项
                    checkStrictly: false, //使用checkbox时父子是否进行关联
                    expandAll: true, //自动展开所有节点
                    showLine: false,
                    showIcon: true,
                    treeNodeData: ['fullName', 'guid', 'id', 'sortNo', 'state', 'stateName',
                        'parentGuid'
                    ], //tree节点携带的数据，可选项，不项则默认携带所有后台返回数据
                    treeNodeButton: [{
                            name: "上移",
                            url: ":dasc/orgs/changeSortUp",
                            function: "modify",
                            method: 'post',
                            params: [{
                                key: "orgGuid",
                                value: "guid"
                            }],
                            body: ['guid']
                        },
                        {
                            name: "下移",
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
                            name: "修改",
                            loadUrl: ":dasc/orgs/get",
                            params: [{
                                key: 'guid',
                                value: 'guid'
                            }],
                            method: 'get',
                            function: "modify",
                            body: ['guid'],
                            dialogSetting: {
                                target: 'fca7153b-ec0e-4871-851f-bfdd340bec60',
                                prepareUrl: ':dasc/realmOrgs/prepareOrg',
                                refresh: 'c5ac06dc-b971-4798-b7af-00b1e4a90dd5',
                                prepareParams: [{
                                    key: 'orgGuid',
                                    value: 'guid'
                                }, {
                                    publicParam: true,
                                    key: 'realmGuid',
                                }],
                                executeUrl: ':dasc/orgs/modify',
                                executeMethod: 'post',
                                confirm: {
                                    tip: '确认修改？',
                                    success: '修改成功'
                                },
                                prepareMethod: 'get',
                                properties: [{
                                        type: 'input',
                                        label: '全称',
                                        name: 'fullName',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: 'input',
                                        label: '简称',
                                        name: 'shortName',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: 'input',
                                        label: '机构代码',
                                        name: 'orgCode',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: 'input',
                                        label: '状态',
                                        name: 'state',
                                        hide: true,
                                    },
                                    {
                                        type: 'input',
                                        label: 'guid',
                                        name: 'guid',
                                        hide: true,
                                    },
                                    {
                                        type: "select",
                                        label: '类型',
                                        name: 'belongTyoe', //存储数据的字段名
                                        defaultValue: 1,
                                        data: 'belongTypes', //准备数据对应字段名
                                        dataMap: { //下拉框数据与准备数据对应关系
                                            label: "name",
                                            value: "type"
                                        },
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: "select",
                                        label: '所属类型',
                                        name: 'orgType', //存储数据的字段名
                                        data: 'orgTypes', //准备数据对应字段名
                                        dataMap: { //下拉框数据与准备数据对应关系
                                            label: "name",
                                            value: "type"
                                        },
                                        required: true,
                                        defaultValue: 1,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: "select",
                                        label: '二级类型',
                                        name: 'orgType2', //存储数据的字段名
                                        data: 'orgTypes2', //准备数据对应字段名
                                        dataMap: { //下拉框数据与准备数据对应关系
                                            label: "name",
                                            value: "type"
                                        },
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: "cascader",
                                        label: '上级机构',
                                        name: 'parentGuid', //存储数据的字段名
                                        data: 'orgs', //准备数据对应字段名
                                        isString: true,
                                        dataMap: { //下拉框数据与准备数据对应关系
                                            label: "fullName",
                                            value: "guid"
                                        },
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: 'input',
                                        label: '排序',
                                        name: 'sortNo',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                ],

                            }
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
                    ],
                    event: {
                        rowClick: {
                            target: ['5b496735-06c1-43e4-bb5d-5a1fc4a11cf2',
                                '1c66336f-b35e-43f1-92ae-bb5462374bf3'
                            ],
                            function: 'toShow'
                        },
                    }
                },
                searchBar1: {
                    guid: 'c5ac06dc-b971-4798-b7af-00b1e4a90dd5',
                    target: '17745cb9-2f8a-4f1e-a299-df575f3853da', //searchbar，可选项
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
                            type: "select",

                            url: "orgs/prepareSearchBar",
                            paramName: "orgState",
                            dataMap: {
                                label: "type",
                                value: "value"
                            },
                            width: 100
                        },
                        {
                            type: "button",
                            function: "search",
                            name: "搜索"
                        }, {
                            name: "新建机构",
                            type: "button",
                            url: ':dasc/realmOrgs/addOrgOfRealm',
                            function: "check",
                            method: 'post',
                            dialogSetting: {
                                target: 'fca7153b-ec0e-4871-851f-bfdd340bec60',
                                title: '新建机构',
                                prepareUrl: ':dasc/realmOrgs/prepareOrg',
                                prepareParams: [{
                                    publicParam: true,
                                    key: 'realmGuid'
                                }],
                                defaultPrepareParams: [{
                                    key: 'orgType',
                                    value: '2'
                                }],
                                executeUrl: ':dasc/realmOrgs/addOrgOfRealm',
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
                                        label: '全称',
                                        name: 'fullName',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: 'input',
                                        label: '简称',
                                        name: 'shortName',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: 'input',
                                        label: '机构代码',
                                        name: 'orgCode',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: "select",
                                        label: '类型',
                                        name: 'belongTyoe', //存储数据的字段名
                                        defaultValue: 1,
                                        data: 'belongTypes', //准备数据对应字段名
                                        dataMap: { //下拉框数据与准备数据对应关系
                                            label: "name",
                                            value: "type"
                                        },
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: "select",
                                        label: '所属类型',
                                        name: 'orgType', //存储数据的字段名
                                        data: 'orgTypes', //准备数据对应字段名
                                        dataMap: { //下拉框数据与准备数据对应关系
                                            label: "name",
                                            value: "type"
                                        },
                                        required: true,
                                        defaultValue: 2,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: "cascader",
                                        label: '上级机构',
                                        name: 'parentGuid', //存储数据的字段名
                                        data: 'orgs', //准备数据对应字段名
                                        isString: true,
                                        dataMap: { //下拉框数据与准备数据对应关系
                                            label: "fullName",
                                            value: "guid"
                                        },
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
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
                    ]
                },
                listSetting2: {
                    guid: '5b496735-06c1-43e4-bb5d-5a1fc4a11cf2',
                    col: 10,
                    hide: true,
                    checkbox: true,
                    url: ':dasc/orgUsers/list',
                    paramName: "orgGuid",
                    grid: {
                        columns: [{
                                label: '姓名',
                                data: 'userName'
                            }, {
                                label: '登录名',
                                data: 'userLoginName'
                            },
                            {
                                label: '是否领导',
                                data: 'isManager'
                            },
                            {
                                label: '显示顺序',
                                data: 'sortNo'
                            }
                        ],
                        buttons: [
                            {
                                name: "修改",
                                loadUrl: ":dasc/orgUsers/get",
                                params: [{
                                    key: 'guid',
                                    value: 'guid'
                                }],
                                method: 'get',
                                function: "modify",
                                body: ['guid'],
                                dialogSetting: {
                                    target: 'fca7153b-ec0e-4871-851f-bfdd340bec60',
                                    refresh: 'a95a9c0a-8ad0-462d-b3e6-d51b23e147ba',
                                    executeUrl: ':dasc/orgUsers/modify',
                                    executeMethod: 'post',
                                    confirm: {
                                        tip: '确认修改？',
                                        success: '修改成功'
                                    },
                                    prepareMethod: 'get',
                                    properties: [{
                                            type: 'input',
                                            label: '标志',
                                            name: 'guid',
                                            hide: true,
                                        },
                                        {
                                            type: 'input',
                                            label: '姓名',
                                            name: 'userName',
                                            disabled: true,
                                        },
                                        {
                                            type: 'radio',
                                            label: '是否管理者',
                                            name: 'isManager',
                                            labelGroup: ['是', '否'],
                                        },
                                        {
                                            type: 'input',
                                            label: '用户ID',
                                            name: 'userGuid',
                                            disabled: true,
                                        },
                                        {
                                            type: 'input',
                                            label: '排序',
                                            name: 'sortNo',
                                            required: true,
                                            validateErrorMessage: "必填项不能为空"
                                        },
                                    ],

                                }
                            },
                            {
                                name: "上移",
                                url: ":dasc/orgUsers/up",
                                function: "modify",
                                method: 'post',
                                params: [{
                                    key: "guid",
                                    value: "guid"
                                }],
                                body: ['guid']
                            },
                            {
                                name: "下移",
                                url: ":dasc/orgUsers/down",
                                function: "modify",
                                method: 'post',
                                params: [{
                                    key: "guid",
                                    value: "guid"
                                }],
                                body: ['guid']
                            },
                            {
                                name: "删除",
                                url: ':dasc/orgUsers/delete',
                                function: "delete",
                                method: 'post',
                                body: ['guid'],
                                confirm: {
                                    tip: "确认删除？",
                                    success: "删除成功"
                                },
                            },
                        ],
                        event: {
                        rowClick: {
                            target: ['704ad8ba-ba87-4ecb-a1b2-829a58455606',
                            ],
                            function: 'toShow'
                        },
                    }
                    }
                },
                searchBar2: {
                    name: '用户',
                    guid: 'a95a9c0a-8ad0-462d-b3e6-d51b23e147ba',
                    target: '5b496735-06c1-43e4-bb5d-5a1fc4a11cf2',
                    properties: [{
                            name: "加入用户",
                            type: "button",
                            // url: 'dasc/realmManagers/prepareUsers',
                            function: "check",
                            dialogSetting: {
                                target: '8b886d0c-86c3-4694-ad81-c6af53801f55', //指向哪个dialog
                                title: '加入用户', //标题
                                executeUrl: ':dasc/orgUsers/add', //提交地址
                                executeMethod: 'post',
                                executeParams: [{
                                    cacheData: true,
                                    key: 'orgGuid',
                                    value: 'guid'
                                }],
                                body: ['guid'],
                                showList: true,
                                showSearchbar: true,
                                searchBar: {
                                    name: "选择用户",
                                    guid: 'e3ec8951-7754-4ecf-b80c-8fb99ac77d6d',
                                    target: 'd86ad79f-2c0f-42c3-acbf-077285ad3102',
                                    autoSearch: true,
                                    properties: [{
                                            type: "input",
                                            paramName: "searchContent",
                                            placeholder: "请输入姓名，部门名称或登录名.....",
                                            width: 300
                                        },
                                        {
                                            type: "button",
                                            function: "search",
                                            name: "搜索",
                                        }
                                    ]
                                },
                                listSetting: {
                                    guid: 'd86ad79f-2c0f-42c3-acbf-077285ad3102',
                                    url: ":dasc/orgUsers/addPrepare",
                                    params: {
                                        key: 'orgGuid',
                                        value: 'guid'
                                    },
                                    target: '8b886d0c-86c3-4694-ad81-c6af53801f55', //指向父组件的guid
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
                        },
                        {
                            name: '刷新',
                            type: "button",
                            function: 'search',
                            params: {
                                key: 'orgGuid',
                                value: 'guid' //row数据中的字段
                            },
                            method: 'get'
                        }
                    ]

                },
                listSetting3: {
                    guid: '704ad8ba-ba87-4ecb-a1b2-829a58455606',
                    col: 6,
                    hide: true,
                    url: ':dasc/orgUsers/listRolesByOrgUser',
                    paramName: "userGuid",
                    grid: {
                        columns: [{
                                label: '岗位名称',
                                data: 'roleName'
                            }, 
                            
                        ],
                        buttons:[{
                            name:'删除'
                        }]
                    }
                },
                searchBar3: {
                    name: '用户',
                    guid: 'acfa34706-11ce-4c78-be9d-5d22a9b94021',
                    target: '704ad8ba-ba87-4ecb-a1b2-829a58455606',
                    properties: [{
                            name: "添加岗位",
                            type: "button",
                            // url: 'dasc/realmManagers/prepareUsers',
                            function: "check",
                            dialogSetting: {
                                target: '8b886d0c-86c3-4694-ad81-c6af53801f55', //指向哪个dialog
                                title: '添加岗位', //标题
                                executeUrl: ':dasc/orgUsers/add', //提交地址
                                executeMethod: 'post',
                                executeParams: [{
                                    cacheData: true,
                                    key: 'orgGuid',
                                    value: 'guid'
                                }],
                                body: ['guid'],
                                showList: true,
                                showSearchbar: true,
                                searchBar: {
                                    name: "选择用户",
                                    guid: 'e3ec8951-7754-4ecf-b80c-8fb99ac77d6d',
                                    target: 'd86ad79f-2c0f-42c3-acbf-077285ad3102',
                                    autoSearch: true,
                                    properties: [{
                                            type: "input",
                                            paramName: "searchContent",
                                            placeholder: "请输入姓名，部门名称或登录名.....",
                                            width: 300
                                        },
                                        {
                                            type: "button",
                                            function: "search",
                                            name: "搜索",
                                        }
                                    ]
                                },
                                listSetting: {
                                    guid: 'd86ad79f-2c0f-42c3-acbf-077285ad3102',
                                    url: ":dasc/orgUsers/addPrepare",
                                    params: {
                                        key: 'orgGuid',
                                        value: 'guid'
                                    },
                                    target: '8b886d0c-86c3-4694-ad81-c6af53801f55', //指向父组件的guid
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
                        },
                        {
                            name: '刷新',
                            type: "button",
                            function: 'search',
                            params: {
                                key: 'orgGuid',
                                value: 'guid' //row数据中的字段
                            },
                            method: 'get'
                        }
                    ]

                },
                dialogSetting1: {
                    guid: 'fca7153b-ec0e-4871-851f-bfdd340bec60'
                },
                dialogSetting2: {
                    guid: '8b886d0c-86c3-4694-ad81-c6af53801f55'
                },


            }

        }
    }
</script>

<style>

</style>