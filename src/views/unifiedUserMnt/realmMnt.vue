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
        <dia-log :dialogSetting='dialogSetting2'></dia-log>
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
                                prepareParam: 'guid',
                                prepareMethod: 'get',
                                executeMethod: 'post',
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
                            name: '删除',
                            function: 'delete', //删除
                            confirm: {
                                tip: "确认删除？",
                                success: "删除成功"
                            },
                            url: ':dasc/realms/delete',
                            body: ['guid'],
                            method: 'post',
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
                            target: 'baea753a-52f5-40e7-a154-4fcb4befc5b8', //指向哪个dialog
                            title: '新建域', //标题
                            prepareUrl: ':dasc/realms/prepare', //准备数据url
                            executeUrl: ':dasc/realms/add', //确认数据url
                            prepareMethod: 'get', //准备数据请求方式
                            executeMethod: 'post',
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
                    url: ':dasc/realmManagers/listUsers',
                    paramName: "realmGuid",
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
                            url: ':dasc/realmManagers/delete',
                            confirm: {
                                tip: '确认移出？',
                                success: '移出成功'
                            },
                            body: ['guid'],
                            params: {
                                key: 'realmGuid',
                                value: 'guid'
                            },
                            method: 'post'
                        }]
                    }

                },
                searchBar2: {
                    name: '域管理员',
                    autoSearch: false,
                    guid: '95050e27-0967-40a4-8d8c-bea8bf1bb804',
                    target: 'a05f0c73-4e43-455f-9d87-9db78cdac8a6',
                    properties: [
                        {
                        name: "添加管理员",
                        type: "button",
                        // url: 'dasc/realmManagers/prepareUsers',
                        function: "check",
                        dialogSetting: {
                            target: '77bed472-cd7e-4597-9c1d-9fb67cf2f545', //指向哪个dialog
                            title: '添加管理员', //标题
                            executeUrl: ':dasc/realmManagers/add', //提交地址
                            executeMethod: 'post',
                            executeParams: [{
                                cacheData: true,
                                key: 'realmGuid',
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
                                url: ":dasc/realmManagers/prepareUsers",
                                params: {
                                    key: 'realmGuid',
                                    value: 'guid'
                                },
                                target: '77bed472-cd7e-4597-9c1d-9fb67cf2f545', //指向父组件的guid
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
                            key: 'realmGuid',
                            value: 'guid' //row数据中的字段
                        },
                        method: 'get'
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
                            function: "modify",
                            loadUrl: ':dasc/orgs/get',
                            method: 'get',
                            params: [{
                                key: "guid",
                                value: "guid"
                            }],
                            dialogSetting: {
                                target: 'baea753a-52f5-40e7-a154-4fcb4befc5b8',
                                prepareUrl: ':dasc/realmOrgs/prepareOrg',
                                prepareParams: [{
                                    key: 'orgGuid',
                                    value: 'guid'
                                }, {
                                    cacheData: true,
                                    key: 'realmGuid',
                                    value: 'guid'
                                }],
                                defaultPrepareParams: [{
                                    key: 'orgType',
                                    value: 1
                                }],
                                executeUrl:':dasc/orgs/modify',
                                executeMethod:'post',
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
                                       hide:true,
                                    },
                                    {
                                        type: 'input',
                                        label: 'guid',
                                        name: 'guid',
                                       hide:true,
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
                                confirm: {
                                tip: '确认修改？',
                                success: '修改成功'
                            },
                            },
                            body: ['guid']
                        },
                        {
                            name: "撤销",
                            url: ':dasc/orgs/delete',
                            function: "delete",
                            method:'post',
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
                            name: "新建机构",
                            type: "button",
                            url: ':dasc/realmOrgs/addOrgOfRealm',
                            function: "check",
                            method: 'post',
                            dialogSetting: {
                                target: 'baea753a-52f5-40e7-a154-4fcb4befc5b8',
                                title: '新建机构',
                                prepareUrl: ':dasc/realmOrgs/prepareOrg',
                                prepareParams: [{
                                    cacheData: true,
                                    key: 'realmGuid',
                                    value: 'guid'
                                }],
                                defaultPrepareParams: [{
                                    key: 'orgType',
                                    value: '1'
                                }],
                                executeUrl: ':dasc/realmOrgs/addOrgOfRealm',
                                executeParams: [{
                                    cacheData: true,
                                    key: 'realmGuid',
                                    value: 'guid'
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
                                        defaultValue:'',
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
                                ]
                            }
                        },
                        {
                        name: '刷新',
                        type: "button",
                        function: 'search',
                        params: {
                            cacheData: true,
                            key: 'realmGuid',
                            value: 'guid' //row数据中的字段
                        },
                        method: 'get'
                    }
                    ]
                },
                dialogSetting1: { //第一层弹框类实例
                    guid: 'baea753a-52f5-40e7-a154-4fcb4befc5b8',
                },
                dialogSetting2: {
                    guid: '77bed472-cd7e-4597-9c1d-9fb67cf2f545'
                }
            }
        }
    }
</script>

<style>

</style>