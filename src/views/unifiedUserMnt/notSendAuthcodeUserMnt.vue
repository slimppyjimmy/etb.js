<template>
    <el-main>
        <list-mnt :listSetting='listSetting1'>
            <searchBar :searchBar="searchBar1" slot="搜索框"></searchBar>
        </list-mnt>
        <dia-log :dialogSetting='dialogSetting1'></dia-log>
    </el-main>
</template>

<script>
    export default {
        data() {
            return {
                listSetting1: {
                    guid: '4aa136e5-f2a1-4341-9f2b-91acb1137693',
                    col: 24,
                    url: ':dasc/users/getUsersWithoutSendingAuthCode',
                    grid: {
                        columns: [{
                                label: "姓名",
                                data: 'userName'
                            },
                            {
                                label: '登录名',
                                data: 'loginName'
                            }
                        ],
                        buttons: [{
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

                    }
                },
                searchBar1: {
                    name: '禁用登录验证码名单',
                    guid: '80a1440a-4c03-4a21-a518-eb0877cd1a67',
                    target: '4aa136e5-f2a1-4341-9f2b-91acb1137693',
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
                            name: "添加",
                            type: "button",
                            // url: 'dasc/realmManagers/prepareUsers',
                            function: "check",
                            dialogSetting: {
                                target: '92109f40-e24f-4c4f-8bbb-dee62f4ffb9e', //指向哪个dialog
                                title: '选择用户', //标题
                                executeUrl: ':dasc/users/disableAuthCode', //提交地址
                                executeMethod: 'post',
                                body: ['guid'],
                                showList: true,
                                showSearchbar: true,
                                searchBar: {
                                    name: "选择用户",
                                    guid: '53cd0c50-bac6-4e55-afaa-a7c72d0e6db3',
                                    target: 'f21f529b-7b75-4a58-94af-762ce10fa00f',
                                    autoSearch: true,
                                    properties: [{
                                        type: "button",
                                        function: "search",
                                        name: "搜索",
                                    }]
                                },
                                listSetting: {
                                    guid: 'f21f529b-7b75-4a58-94af-762ce10fa00f',
                                    url: ":dasc/users/prepareWithOutSendingAuthCode",
                                    publicParam: {
                                        key: 'realmGuid'
                                    },
                                    target: '92109f40-e24f-4c4f-8bbb-dee62f4ffb9e', //指向父组件的guid
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
                        }
                    ]

                },
                dialogSetting1:{
                    guid:'92109f40-e24f-4c4f-8bbb-dee62f4ffb9e'
                }
            }
        }
    }
</script>

<style>

</style>