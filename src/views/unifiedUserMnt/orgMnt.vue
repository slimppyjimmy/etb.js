<template>
    <el-main>
        <tree-mnt :treeSetting="treeSetting1">
            <searchBar :searchBar="searchBar1" slot="搜索框"></searchBar>
        </tree-mnt>
        <el-col :span='8'>
            <list-mnt :listSetting='listSetting2'>
                <searchBar :searchBar="searchBar2" slot="搜索框"></searchBar>
            </list-mnt>
            <list-mnt :listSetting='listSetting3'>
                <searchBar :searchBar="searchBar3" slot="搜索框"></searchBar>
            </list-mnt>
        </el-col>
        <dia-log :dialogSetting='dialogSetting1'></dia-log>
        <dia-log :dialogSetting='dialogSetting2'></dia-log>
    </el-main>
</template>

<script>
    export default {
        data() {
            return {
                treeSetting1: {
                    guid: '83c56602-7f32-4c4e-997b-890cdffaab1c',
                    col: 16, //tree组件宽度，可选项，24珊格布局单位
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
                                target: '7e0d0adb-7e53-4b97-a174-1daa2e697126',
                                prepareUrl: ':dasc/realmOrgs/prepareOrg',
                                refresh: '5342df59-7746-4d20-affe-1b8a70a48f4c',
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
                            target: ['c8929299-a6f1-4799-ad5e-9373364d76a5',
                                '1c66336f-b35e-43f1-92ae-bb5462374bf3'
                            ],
                            function: 'toShow'
                        },
                    }
                },
                searchBar1: {
                    guid: '5342df59-7746-4d20-affe-1b8a70a48f4c',
                    target: '83c56602-7f32-4c4e-997b-890cdffaab1c', //searchbar，可选项
                    properties: [{
                            type: "select",
                            url: "u/realms",
                            paramName: "realmGuid",
                            publicParam: true,
                            dataMap: {
                                label: "name",
                                value: "guid"
                            },
                            width: 200
                        },
                        {
                            type: "select",
                            url: "orgs/prepareSearchBar",
                            paramName: "orgState",
                            dataMap: {
                                label: "type",
                                value: "value"
                            },
                            width: 200
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
                                target: '7e0d0adb-7e53-4b97-a174-1daa2e697126',
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
                    guid: 'c8929299-a6f1-4799-ad5e-9373364d76a5',
                    col: 24,
                    hide: true,
                    url: ':dasc/realmOrgs/listOrgChildren',
                    paramName: "parentGuid",
                    grid: {
                        columns: [{
                                label: '简称',
                                data: 'shortName'
                            }, {
                                label: '类型',
                                data: 'orgTypeName'
                            },
                            {
                                label: '状态',
                                data: 'stateName'
                            },
                            {
                                label: '显示顺序',
                                data: 'sortNo'
                            }
                        ]
                    }
                },
                searchBar2: {
                    name: '子机构',
                    guid: '3d2053de-a853-438a-9c63-c092121d5457',
                    target: 'c8929299-a6f1-4799-ad5e-9373364d76a5',
                    properties: [{
                        name: '刷新',
                        type: "button",
                        function: 'search',
                        params: {
                            key: 'parentGuid',
                            value: 'guid' //row数据中的字段
                        },
                        method: 'get'
                    }]

                },
                listSetting3: {
                    guid: '1c66336f-b35e-43f1-92ae-bb5462374bf3',
                    col: 24,
                    hide: true,
                    url: ':dasc/orgs/listStationRoles',
                    paramName: "orgGuid",
                    grid: {
                        columns: [{
                                label: '名称',
                                data: 'roleName'
                            },
                        ],
                        buttons:[
                            {
                                name:'上移',
                                function:'modify',
                                url:':dasc/orgs/changeStationRoleSortUp',
                                method:'post',
                                body:['guid'],
                                params:[{
                                    catchData:true,
                                    key:'orgGuid',
                                    value:'guid'
                                },
                                {
                                    key:'roleGuid',
                                    value:'guid'
                                }]
                            } ,
                            {
                                name:'下移',
                                function:'modify',
                                url:':dasc/orgs/chanegOrgRoleSortNoDown',
                                body:['guid'],
                                method:'post',
                                params:[{
                                    catchData:true,
                                    key:'orgGuid',
                                    value:'guid'
                                },
                                {
                                    key:'roleGuid',
                                    value:'guid'
                                }]
                            },
                            {
                                name:'取消关联',
                                function:'remove',
                                url:':dasc/orgs/deleteStationRoles',
                                params:[{
                                    catchData:true,
                                    key:'orgGuid',
                                    value:'guid'
                                }],
                                body:['guid'],
                                confirm:{
                                    tip:'确认取消关联？',
                                    success:'取消成功'
                                },
                                method:'post'
                            }
                        ]
                    }
                },
                searchBar3: {
                    name: '岗位角色',
                    guid: '639aaad2-6202-4d82-91d7-71cb6bfe42e2',
                    target: '1c66336f-b35e-43f1-92ae-bb5462374bf3',
                    properties: [{
                            name: "添加岗位",
                            type: "button",
                            function: "check",
                            dialogSetting: {
                                target: '51a30b0b-ef9e-43b0-bb77-e95a6b4782e7', //指向哪个dialog
                                title: '添加岗位角色', //标题
                                executeUrl: ':dasc/orgs/addStationRoles', //提交地址
                                executeMethod: 'post',
                                executeParams: [{
                                    catchData:true,
                                    key: 'orgGuid',
                                    value: 'guid'
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
                                    guid: '05020464-5722-4ba5-8ced-f30c39fea3a2',
                                    url: ":dasc/orgs/prepareRoles",
                                    params: {
                                        key: 'orgGuid',
                                        value: 'guid'
                                    },
                                    target: '51a30b0b-ef9e-43b0-bb77-e95a6b4782e7', //指向父组件的guid
                                    autoSearch: true,
                                    checkbox: true,
                                    col: 24,
                                    grid: {
                                        columns: [{
                                                lable: '名称',
                                                data: 'roleName',
                                            },
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
                    guid: '7e0d0adb-7e53-4b97-a174-1daa2e697126'
                },
                dialogSetting2:{
                    guid:'51a30b0b-ef9e-43b0-bb77-e95a6b4782e7'
                }
            }
        }
    }
</script>

<style>

</style>