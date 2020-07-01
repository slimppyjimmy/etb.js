<template>
    <el-main>
        <list-mnt :listSetting='listSetting1'>
            <searchBar :searchBar="searchBar1" slot="搜索框"></searchBar>
        </list-mnt>
        <tree-mnt :treeSetting="treeSetting2">
            <searchBar :searchBar="searchBar2" slot="搜索框"></searchBar>
        </tree-mnt>
    </el-main>
</template>

<script>
    export default {
        data() {
            return {
                listSetting1: {
                    guid: '2eb99018-448d-450b-8f52-25956913239b',
                    col: 12,
                    url: ':dasc/users/listUsersWithoutRealm',
                    grid: {
                        columns: [{
                                label: '姓名',
                                data: 'userName'
                            },
                            {
                                label: '登录名',
                                data: 'loginName'
                            }
                        ],
                        event: {
                            rowClick: {
                                target: ['23d0291f-9319-4d61-868f-036f21cb8856'],
                                function: 'toShow'
                            },
                        }

                    },
                    pagination: {
                        size: 10
                    }
                },
                searchBar1: {
                    name: '可调人员',
                    guid: '4bb4fb75-d30b-4d99-9791-11a8a53370b9',
                    target: '2eb99018-448d-450b-8f52-25956913239b',
                    properties: [{
                            type: "input",
                            paramName: "condition",
                            placeholder: "请输入姓名或登录名的一部分",
                            width: 300
                        },
                        {
                            name: '搜索',
                            type: "button",
                            function: 'search',
                        }
                    ]

                },
                treeSetting2: {
                    guid: '23d0291f-9319-4d61-868f-036f21cb8856',
                    col: 12, //tree组件宽度，可选项，24珊格布局单位
                    name: "机构列表", //组件标题，可选选
                    url: ":dasc/realmOrgs/listOrgs", //tree组件数据接口，必须项，不能为空
                    paramName: 'realmGuid',
                    treeLabel: "fullName", //tree展示的字段名称，必选项，不能为空，必须tree数据字段中的一项
                    showCheckBox: false, //是否显示checkbox，可选项
                    checkStrictly: false, //使用checkbox时父子是否进行关联
                    expandAll: true, //自动展开所有节点
                    showLine: false,
                    showIcon: true,
                    hide: true,
                    treeNodeData: ['fullName', 'guid', 'id', 'sortNo', 'state', 'stateName',
                        'parentGuid'
                    ], //tree节点携带的数据，可选项，不项则默认携带所有后台返回数据
                    treeNodeButton: [
                        {
                            name: "调入",
                            url: ":dasc/users/transferIn",
                            function: "modify",
                            method: 'post',
                            params: [{
                                cacheData:true,
                                key: "userGuid",
                                value: "guid"
                            },{
                                publicParam:true,
                                key:'realmGuid',
                                value:'guid'
                            }],
                            body: ['guid']
                        }
                    ]
                },
                searchBar2: {
                    guid: '2ba6598b-5f44-43be-a200-543f4bf6814e',
                    target: '23d0291f-9319-4d61-868f-036f21cb8856', //searchbar，可选项
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
                            type: "button",
                            function: "search",
                            name: "刷新"
                        }, 
                    ]
                },
            }
        }
    }
</script>

<style>

</style>