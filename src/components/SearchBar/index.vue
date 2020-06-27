<template>
    <div class="searchBar ">
        <span>
            <i class="el-icon-menu"></i>
            <span class="searchBar-title">
                {{searchBar.name}}
            </span>
        </span>
        <span v-if="searchBar.properties && searchBar.properties.length>0 ? true:false "
            v-for="(item,index) in searchBar.properties" :key="item.id">
            <div class="searchBar-select" v-if="item.type==='select'">
                <el-select v-model="params[item.paramName]" placeholder="请选择" size="mini" @change="change()"
                    :style="`width:${item.width}px`">
                    <el-option v-for="param in optionGroup['option'+(item.id-1)]" :key="param[item.dataMap.value]"
                        :label="param[item.dataMap.label]" :value="param[item.dataMap.value]">
                    </el-option>
                </el-select>
            </div>
            <div class="searchBar-input" v-else-if="item.type==='input'">
                <el-input v-model="params[item.paramName]" :placeholder="item.placeholder" size="mini"
                    :style="`width:${item.width}px`"></el-input>
            </div>
            <div class="searchBar-datePciker" v-else-if="item.type==='datePicker'">
                <el-date-picker v-model="value1" type="daterange" range-separator="——" start-placeholder="开始日期"
                    size="mini" end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="searchBar-buttons" v-else-if="item.type==='button'">
                <el-button type="primary" size="mini" @click="handleSearchBarBtnClick(item)">{{item.name}}</el-button>
            </div>
        </span>
    </div>
</template>

<script>
    import {
        httpService
    } from '../../utils/request'

    export default {
        name: 'searchBar',
        props: {
            searchBar: {
                type: Object
            }
        },
        data() {
            return {
                optionGroup: {}, //下拉框数据装载对象
                params: { //searchbar参数数据装载对象
                }
            }
        },
        methods: {
            //事件函数
            change: function () { //下拉框切换数据时触发
                this.toSearch()
            },
            handleSearchBarBtnClick: function (btnConfig) {
                switch (btnConfig.function) {
                    case ("search"):
                        this.toSearch(btnConfig)
                        break;
                    case ("delete"):
                        this.toDelete(btnConfig)
                        break;
                    case ('created'):
                        this.toCreated(btnConfig)
                        break;
                }
            },
            toSearch: function () {
                
                    let params = this.params
                    params.function = 'toSearch'
                    this.$bus.emit(this.searchBar.target, params)
                

            },
            toDelete: function (btnConfig) {
                let config = btnConfig
                config.function = 'toDelete'
                this.$bus.emit(this.searchBar.target, config)
            },
            toCreated: function (btnConfig) {
                let data = new Object
                data.config = btnConfig
                data.config.guid = this.searchBar.guid
                data.data = this.params
                this.$bus.emit(btnConfig.dialogSetting.target, data)
            },
            //初始化部分函数
            addId: function (obj) {
                for (let i in obj) {
                    obj[i].id = Number(i) + 1
                }
            },
            checkData: function (res, callback) {
                if ((res instanceof Array) !== true) {
                    this.checkData(res[Object.keys(res)[0]], callback)
                } else {
                    callback(res)
                    return
                }
            },
            /*
             *@params:selectConfig下拉框配置对象,index数量
             *@description:下拉框初始化函数，使用this.$set方法初始化下拉框装载数据源
             *@author: zhoujw
             *@date: 2020-06-01 09:33:51
             */
            initSelect: function (selectConfig, index) {
                new httpService({
                    url: ':dasc/' + selectConfig.url
                }).then(res => {
                    this.checkData(res, (data) => {
                        this.$set(this.optionGroup, "option" + index, data)
                        //设置默认值
                        this.$set(this.params, selectConfig.paramName, data[0][Object.keys(data[
                            0])[
                            0]])
                    })
                    if (index == 0) { //
                        this.toSearch()
                    }
                })
            },
            /*
             *@params:inputConfig输入框配置对象，index数量
             *@description:输入框初始化函数
             *@author: zhoujw
             *@date: 2020-06-01 09:52:36
             */
            initInput: function (inputConfig, index) {
                this.$set(this.params, inputConfig.paramName, '')
                if (index == 0) { //
                    this.toSearch()
                }
            }

        },
        watch: {

        },
        created() {
            if (this.searchBar && this.searchBar.properties) {
                this.addId(this.searchBar.properties)
                for (let i in this.searchBar.properties) {
                    const properties = this.searchBar.properties[i]
                    switch (properties.type) {
                        case ("select"):
                            this.initSelect(properties, i)
                            break;
                        case ("input"):
                            this.initInput(properties, i)
                            break;
                        default:
                            if(this.searchBar.autoSearch==false){
                                return
                            }
                            this.toSearch()
                            break;
                    }
                }
            }
            this.$bus.on(this.searchBar.guid, this.toSearch)
        },
        beforeDestroy() { //销毁监听事件
            this.$bus.off(this.searchBar.guid, this.toSearch)
        }
    }
</script>

<style lang="scss" scoped>
    .searchBar {
        height: 38px;
        width: 100%;
        line-height: 38px;
        vertical-align: center;
        display: flex;
        justify-content: space-around;

        .el-icon-menu {
            font-size: 18px;
            margin-left: 15px;
            position: relative;
            top: 1px;
            cursor: pointer;
        }

        .searchBar-title {
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            font-size: 14px Base;
            font-weight: 500;
            cursor: pointer;
            margin-right: 5px;
            color: rgba(0, 0, 0, .65);

        }

        .searchBar-select {
            display: inline-block;
            position: relative;
            margin-left: 5px;
            margin-right: 5px;
            top: -1px;
            width: auto;

            /deep/ .el-input__inner {
                width: 100%;
            }
        }

        .searchBar-input {
            display: inline-block;
            position: relative;
            top: -1px;
            margin-left: 5px;
            margin-right: 5px;
        }

        .searchBar-buttons {
            display: inline-block;
            position: relative;
            top: -1.5px;
            margin-left: 5px;
            margin-right: 5px;
        }

        .searchBar-datePciker {
            display: inline-block;
            position: relative;
            margin-left: 5px;
            margin-right: 5px;
        }

    }
</style>