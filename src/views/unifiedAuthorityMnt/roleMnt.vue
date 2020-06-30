<template>
    <el-main>
        <tree-mnt :treeSetting="treeSetting1">
            <searchBar :searchBar="searchBar1" slot="搜索框"></searchBar>
        </tree-mnt>
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
                    defaultParams:[
                                {
                                    key:'types',
                                    value:'1,2'
                                }
                            ],
                    treeLabel: "roleName", //tree展示的字段名称，必选项，不能为空，必须tree数据字段中的一项
                    showCheckBox: false, //是否显示checkbox，可选项
                    checkStrictly: false, //使用checkbox时父子是否进行关联
                    expandAll: true, //自动展开所有节点
                    showLine: false,
                    showIcon: true,
                    treeNodeData: ['roleName', 'guid', 'id', 'sortNo', 'roleTypeName', 'roleType',
                        'parentGuid'
                    ], //tree节点携带的数据，可选项，不项则默认携带所有后台返回数据
                    treeNodeButton: [
                        {
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
                            name: "删除",
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
                                }
                                ],
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
                dialogSetting1:{
                    guid:'39210bab-8cac-4de5-a673-dc8d35beac73'
                }
            }
        }
    }
</script>

<style>

</style>