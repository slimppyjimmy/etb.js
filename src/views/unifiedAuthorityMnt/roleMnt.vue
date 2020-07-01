<template>
    <el-main>
        <tree-mnt :treeSetting="treeSetting1">
            <searchBar :searchBar="searchBar1" slot="搜索框"></searchBar>
        </tree-mnt>
        <el-col :span='8'>
            <list-mnt :listSetting='listSetting2'>
                <searchBar :searchBar="searchBar2" slot="搜索框"></searchBar>
            </list-mnt>
        </el-col>
        <dia-log :dialogSetting='dialogSetting1'></dia-log>
    </el-main>
</template>

<script>
    export default {
        data() {
            return {
                treeSetting1: {
                    guid: 'b4abf1e2-8030-45fc-a814-ae5a0fdba46f',
                    col: 16, //tree组件宽度，可选项，24珊格布局单位
                    name: "机构列表", //组件标题，可选选
                    url: ":dasc/realmRoles/listRoles", //tree组件数据接口，必须项，不能为空
                    paramName: 'realmGuid',
                    defaultParams: [{
                        key: 'types',
                        value: '1,2'
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
                    treeNodeButton: [{
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
                                target: '39210bab-8cac-4de5-a673-dc8d35beac73',
                                prepareUrl: ':dasc/realmRoles/prepareModify',
                                refresh: '356e579f-4353-4a6e-aaf1-6d5a963edfa5',
                                prepareParams: [{
                                    key: 'guid',
                                    value: 'guid'
                                }],
                                executeUrl: ':dasc/roles/modifyGeneralRole',
                                executeMethod: 'post',
                                confirm: {
                                    tip: '确认修改？',
                                    success: '修改成功'
                                },
                                prepareMethod: 'get',
                                properties: [{
                                        type: 'input',
                                        label: '名称',
                                        name: 'roleName',
                                        required: true,
                                        validateErrorMessage: "必填项不能为空"
                                    },
                                    {
                                        type: 'input',
                                        label: '名称',
                                        name: 'guid',
                                        hide: true,
                                    },
                                    {
                                        type: 'input',
                                        label: '角色类型',
                                        name: 'roleTypeName',
                                        disabled: true
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
                            name: "删除",
                            url: ':dasc/roles/deleteGeneralRole',
                            function: "delete",
                            method: 'post',
                            body: ['guid'],
                            confirm: {
                                tip: "确认删除该机构？",
                                success: "删除成功"
                            },
                        },
                    ],
                    event: {
                        rowClick: {
                            target: ['5ed53349-ae06-4d5d-bd87-b75096edae03'
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
                    guid: '5ed53349-ae06-4d5d-bd87-b75096edae03',
                    col: 24,
                    hide: true,
                    url: ':dasc/roles/listChildren',
                    paramName:'guid',
                    grid: {
                        columns: [{
                            label: '角色名称',
                            data: 'roleName'
                        }, {
                            label: '排序',
                            data: 'sortNo'
                        }]
                    }
                },
                searchBar2: {
                    name: '直接子角色',
                    autoSearch: false,
                    guid: '9f81248ce-82ab-4a66-bf8f-3ec65323ca6a',
                    target: '5ed53349-ae06-4d5d-bd87-b75096edae03',
                    properties: [
                         {
                        name: '刷新',
                        type: "button",
                        function: 'search',
                        params: {
                            key: 'guid',
                            value: 'guid' //row数据中的字段
                        },
                        method: 'get'
                    }]
                },
                dialogSetting1: {
                    guid: '39210bab-8cac-4de5-a673-dc8d35beac73'
                },
            }
        }
    }
</script>

<style>

</style>