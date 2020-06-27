<template>


    <el-col :span="listSetting.col? listSetting.col:12" v-show="listSetting.hide? !listSetting.hide:true">
        <el-card shadow="none" :body-style="{ padding: '10px 10px 10px 10px',border:'none'}">
            <div slot="header">
                <slot name="搜索框"> </slot>
                <!-- <searchBar v-if="listSetting.searchBar? true:false" :searchBar="listSetting.searchBar"
                    :guid="listSetting.guid"></searchBar> -->
            </div>
            <div>
                <el-table :data="tableData" style="width: 100%" border :cell-style="cellStyle" :row-style="rowStyle"
                    @row-click="rowClick" @current-change="rowCheck">
                    <el-table-column label="单选" width="50"
                        v-if="listSetting.checkbox && listSetting.checkbox.type=='single'">
                        <template slot-scope="scope">
                            <el-radio v-model="tableRadio" :label="scope.row"><i></i></el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="listSetting.showIndex" type="index" width="50" label="序号">
                    </el-table-column>
                    <el-table-column v-for=" item in listSetting.grid.columns " :key="item.id" :label="item.label"
                        :prop="item.data" ref="heightRow">
                    </el-table-column>
                    <el-table-column v-if="listSetting.grid.buttons && listSetting.grid.buttons.length>0 ? true:false "
                        label="操作" width="220">
                        <template slot-scope="scope">
                            <el-button v-for="item in listSetting.grid.buttons" :key="item.id" :size="item.size"
                                type="text" v-permission="item.resourceGuid? item.resourceGuid:null"
                                @click="handleListBtnClick(item,scope.row,scope)" v-if="showBtn(item)">
                                {{item.name}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
            <div class="list-pagination" v-if="listSetting.pagination">
                <el-pagination background layout="prev, pager, next,sizes,jumper" :total="this.total"
                    :page-size="listSetting.pageSize" :page-sizes="[10, 20, 30, 40]"
                    @current-change="handleCurrentChange" @size-change="handleSizeChange"
                    v-show="this.total>this.listSetting.pagination.size? true:false">
                </el-pagination>
            </div>
        </el-card>
    </el-col>



</template>
<script>
    import {
        httpService
    } from '../../utils/request'
    export default {
        name: 'list-mnt',
        props: {
            showIndex: {
                type: Boolean,
                default: false
            },
            listSetting: {
                type: Object
            }
        },
        data() {
            return {
                tableData: [],
                total: 10,
                pageIndex: 1,
                pageSize: 10,
                searchData: {},
                selectData: [],
                tableRadio: '',
                singleCheckData: {},
            }
        },
        methods: {
            /*
             *@params: btnConfig按钮配置参数；row行数据；scope所有节点数据
             *@description:list组件行内按钮点击方法
             *@author: zhoujw
             *@date: 2020-05-30 18:45:13
             */
            handleListBtnClick(btnConfig, row, scope) {
                if (btnConfig && btnConfig.function) {
                    switch (btnConfig.function) {
                        case ('remove'):
                            this.toRemove(btnConfig, row)
                            break;
                        case ('delete'):
                            this.toDelete(btnConfig, row)
                            break;
                        case ('modify'):
                            this.toModify(btnConfig, row)
                            break
                    }
                } else {
                    console.error("按钮属性配置错误，请检查")
                }
            },
            toRemove: function (config, row) {
                this.$confirm(config.confirm.tip, '提示', {
                    cancelButtonClass: "btn-custom-cancel",
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    let params = {}
                    //判断是否携带params，打包数据
                    if (config.params) {
                        for (let i in config.params) {
                            let item = config.params[i]
                            params[item.key] = row[item.value]
                        }
                    }
                    let data = []
                    //判断是否携带body，打包数据
                    if (config.method === 'post' && config.body) {
                        for (let i in config.body) {
                            let key = config.body[i]
                            data.push(row[key])
                        }
                    }
                    this.sendRequest(config.url, config.method, params, data, config.confirm)
                }).catch(() => {

                });

            },
            toDelete: function (config, row) {
                this.$confirm(config.confirm.tip, '提示', {
                    cancelButtonClass: "btn-custom-cancel",
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    let params = {}
                    //判断是否携带params，打包数据
                    if (config.params) {
                        for (let i in config.params) {
                            let item = config.params[i]
                            params[item.key] = row[item.value]
                        }
                    }
                    let data = []
                    //判断是否携带body，打包数据
                    if (config.method === 'post' && config.body) {
                        for (let i in config.body) {
                            let key = config.body[i]
                            data.push(row[key])
                        }
                    }
                    this.sendRequest(config.url, config.method, params, data, config.confirm)
                }).catch(() => {});
            },
            toModify: function (config, row) {
                let data = new Object
                data.config = config
                data.config.guid = this.listSetting.guid
                data.data = row
                this.$bus.emit(config.dialogSetting.target, data)
            },
            handleCurrentChange(val) { //切换页
                this.pageIndex = val
                this.toSearch(this.searchData, true)
            },
            handleSizeChange(val) { //切换每天数据量
                this.pageSize = val
                this.toSearch(this.searchData, true)
            },
            toSearch: function (params, boolean) {
                //设置分页值

                if (boolean && params) {
                    params.pageIndex = this.pageIndex
                } else {
                    params.pageIndex = 1
                }
                params.pageSize = this.pageSize
                new httpService({
                    url: this.listSetting.url,
                    params: params,
                }).then(res => {
                    let data = new Object;
                    if (this.listSetting.pagination) {
                        data = res.data.content
                        this.total = res.data.totalElements
                    } else {
                        data = res.data
                    }
                    for (let i in data) {
                        for (let a in data[i]) {
                            if (typeof data[i][a] === "boolean") {
                                if (data[i][a] == true) {
                                    data[i][a] = "是"
                                } else {
                                    data[i][a] = "否"
                                }
                            }
                        }
                    }
                    this.tableData = data
                    this.searchData = params //seabar数据打包
                })
            },
            //请求函数，公共方法
            sendRequest: function (url, method, params, data, confirm) {
                new httpService({
                    url: url,
                    method: method,
                    params: params,
                    data: data
                }).then(res => {
                    this.toSearch(this.searchData)
                    this.$message({
                        type: 'success',
                        message: confirm.success
                    });
                })
            },
            //对数组类型数据增加id，避免v-for循环时不能绑定key
            addId(obj) {
                for (let i in obj) {
                    obj[i].id = Number(i) + 1
                }
            },
            cellStyle: function () {
                return 'padding:0px'
            },
            rowStyle: function ({
                row,
                rowIndex
            }) {
                //   for(let i in this.selectData){
                //     // TODO 表格选中高亮
                //     //   if(this.selectData[i]==row.guid){
                //     //       return 'background-color: aqua !important;height:40px'
                //     //   }
                //   }
                return 'height:40px'
            },
            rowClick: function (row, column) {
                // TODO 表格选中高亮
                if (this.listSetting.grid.hasOwnProperty('event')) {
                    const gridEvent = this.listSetting.grid.event
                    if (gridEvent.rowClick) {
                        let data = new Object;
                        data.function = gridEvent.rowClick.function;
                        data.row = row
                        gridEvent.rowClick.target.forEach((item) => {
                            this.$bus.emit(item, data)
                        })
                    }
                }
            },
            rowCheck: function (currentRow, oldCurrentRow) {
                if (currentRow && currentRow.function) {
                    currentRow.function = 'toUpdateData'
                }
                if (this.listSetting.target) {
                    this.$bus.emit(this.listSetting.target, currentRow)
                }

            },
            showBtn: function (btnConfig) {
                if (btnConfig && btnConfig.precondition) {
                    if (btnConfig.precondition.value !== this.searchData[btnConfig.precondition.name]) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            },
            toShow: function (data) {
                this.toRefresh(data)
                this.listSetting.hide = false
            },
            toRefresh(data) {
                let params = new Object;
                //对请求存在默认参数值进行处理
                if (this.listSetting.defaultParams) {
                    this.listSetting.defaultParams.forEach((item) => {
                        params[item.key] = item.value
                    })
                }
                if (this.listSetting.paramName) {
                    params[this.listSetting.paramName] = data.row.guid
                }
                new httpService({
                    url: this.listSetting.url,
                    params: params,
                    method: 'get'
                }).then(res => {
                    let data = res.data
                    for (let i in data) {
                        for (let a in data[i]) {
                            if (typeof data[i][a] === "boolean") {
                                if (data[i][a] == true) {
                                    data[i][a] = "是"
                                } else {
                                    data[i][a] = "否"
                                }
                            }
                        }
                    }
                    this.tableData = data
                })
            },
            toReceive: function (data) {
                if (data && data.function) {
                    eval(`this.${data.function}(data)`)
                } else {
                    this.toRefresh(data)
                }
            },
        },
        created() {
            this.$bus.on(this.listSetting.guid, this.toReceive)
            this.$once('hook:beforeDestroy', () => {
                this.$bus.off(this.listSetting.guid, this.toSearch)
            })
            if (this.listSetting) {
                const baseSetting = ['url', 'grid']
                baseSetting.forEach((item) => {
                    if (Object.keys(this.listSetting).indexOf(item) < 0) {
                        console.error('配置项中缺少' + item)
                    }
                })
                if (
                    this.listSetting.grid.columns
                ) {
                    this.addId(this.listSetting.grid.columns);
                }
                if (
                    this.listSetting.grid.buttons
                ) {
                    this.addId(this.listSetting.grid.buttons)
                }
                if (this.listSetting.pagination) {
                    this.pageSize = this.listSetting.pagination.size
                }
            }
        },
        beforeDestroy() {

        }
    }
</script>

<style lang="scss" scoped>
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both,
    }

    .list-pagination {
        margin: 0 auto;
        margin-top: 5px;
        text-align: center;
    }

    /deep/ .el-card__header {
        padding: 0px 0px 0px 0px;
        overflow: hidden;
    }

    /deep/ .rowStyle {
        background-color: aqua !important;
    }
</style>