<template>
    <el-dialog :title="title" v-if="dialogVisible" :visible.sync="dialogVisible" width="40%" center :modal="true"
        top="50px">
        <el-form ref="form" :model="form" label-width="120px" size="mini" status-icon>
            <span v-for="(item,index) in formSetting" :key=index>
                <el-form-item v-if="item.type=='input'" :label="item.label" :prop="item.name"
                    v-show="item.hide?!item.hide:true"
                    :rules="{required:item.required? item.required:false,message:item.validateErrorMessage, trigger: 'blur'}">
                    <el-input v-model="form[item.name]" :style="item.width? `width:${item.width};`:`width:500px;`"
                        :disabled='item.disabled? item.disabled:false'>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="item.type=='inputAndButton'" :label="item.label" :prop="item.name"
                    :rules="{required:item.required? item.required:false,message:item.validateErrorMessage, trigger: 'blur'}">
                    <el-input v-model="form[item.name]" :style="item.width? `width:${item.width};`:`width:500px;`"
                        readonly disabled="">
                        <template slot="append">
                            <el-button @click="innerDialog(item)">选择</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="item.type=='password'" :label="item.label" :prop="item.name"
                    :rules="{required:item.required? item.required:false,message:item.validateErrorMessage, trigger: 'blur'}">
                    <el-input v-model="form[item.name]" show-password
                        :style="item.width? `width:${item.width};`:`width:500px;`"></el-input>
                </el-form-item>
                <el-form-item v-else-if="item.type=='select'" :label="item.label" :prop="item.name"
                    :rules="{required:item.required? item.required:false,message:item.validateErrorMessage, trigger: 'blur'}">
                    <el-select v-model="form[item.name]" :style="item.width? `width:${item.width};`:`width:500px;`">
                        <el-option v-for="param in prepareData[item.data]" :label="param[item.dataMap.label]"
                            :value="param[item.dataMap.value]"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else-if="item.type=='cascader'" :label="item.label">
                    <el-cascader :props="{ checkStrictly: true } " v-model="form[item.name]" :options="cascaderOptions"
                        clearable filterable expandTrigger='hover' :show-all-levels="false"></el-cascader>
                </el-form-item>
                <el-form-item v-else-if="item.type=='datePicker'" :label="item.label" :prop="item.name"
                    :rules="{required:item.required? item.required:false,message:item.validateErrorMessage, trigger: 'blur'}">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form[item.name]"
                        :style="item.width? `width:${item.width};`:`width:500px;`" format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item v-else-if="item.type=='switch'" :label="item.label">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item v-else-if="item.type=='radio'" :label="item.label">
                    <el-radio-group v-model="form[item.name]">
                        <el-radio label="true">{{item.labelGroup[0]}}</el-radio>
                        <el-radio label="false">{{item.labelGroup[1]}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-else-if="item.type=='textarea'" :label="item.label" :prop="item.name"
                    :rules="{required:item.required? item.required:false,message:item.validateErrorMessage, trigger: 'blur'}">
                    <el-input type="textarea" v-model="form[item.name]"
                        :style="item.width? `width:${item.width};`:`width:500px;`"></el-input>
                </el-form-item>
            </span>
        </el-form>
        <slot name='list'>
            <searchBar v-if="this.showSearchbar" :searchBar='this.searchbarSetting'></searchBar>
            <list-mnt v-if="this.showList" :listSetting='this.listSetting'></list-mnt>
        </slot>
        <!-- <list-mnt
            v-if='setting.config && setting.config.dialogSetting && setting.config.dialogSetting.listSetting? true:false'
            :listSetting='setting.config.dialogSetting.listSetting' @reciveListData="reciveListData"></list-mnt> -->
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit" size="mini">确 定</el-button>
            <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import {
        httpService
    } from '../../utils/request'
    import {
        encriptPwd
    } from '../../utils/encriptFunction'
    export default {
        name: 'dia-log',

        props: {
            dialogSetting: {
                type: Object
            }
        },
        data() {
            return {
                dialogVisible: false, //dialog开关
                formSetting: {}, //表单内容设置装载对象
                form: { //表单数据装载对象
                },
                prepareData: [], //准备数据装载对象
                setting: {},
                title: '',
                listData: '', //弹框嵌套list时装载数据对象
                inputAndButtonData: {}, //特殊组件值
                cascaderOptions: '', //级联选择器装载数据对象
                showList: false,
                showSearchbar: false,
                listSetting: {}, //
                searchbarSetting: {},
                checkData: {},
                multipleSelection: [], //复选框数据
                cacheData: {},
                isString: false,
                loadData: {} //加载数据
            }
        },
        methods: {
            submit: function () {
                if (this.setting.config.hasOwnProperty('parentGuid')) {
                    this.dialogVisible = false
                    return
                }
                let params = new Object

                if (this.setting.config.dialogSetting.hasOwnProperty('executeParams')) { //组成需要附加在表单提交接口上的数
                    let executeParams = this.setting.config.dialogSetting.executeParams
                    executeParams.forEach((item) => {
                        
                        if (item.catchData) {
                            let cacheData=new Object;
                            cacheData=this.$store.getters.cacheData
                            console.log(cacheData)
                            params[item.key] = cacheData[Object.keys(cacheData)[0]][item.value]
                        }else if (item.publicParam) {
                                params[item.key] = this.$store.getters.publicParams[item.key]
                            } 
                    })
                }
                let postData = []
                if (this.isString) {
                    for (let i in this.form) {
                        if (Array.isArray(this.form[i])) {

                            if (this.form[i][0] == undefined) {
                                this.form[i] = ''
                            } else {
                                this.form[i] = this.form[i][0]
                            }
                        }
                    }
                }
                postData = JSON.parse(JSON.stringify(this.form))

                if (postData.hasOwnProperty(this.inputAndButtonData.name)) {
                    postData[this.inputAndButtonData.name] = this.inputAndButtonData.data[this
                        .inputAndButtonData
                        .bind]
                }

                if (this.multipleSelection.length > 0) {
                    postData = []

                    this.multipleSelection.forEach((item) => {
                        this.setting.config.dialogSetting.body.forEach((a) => {
                            postData.push(item[a])
                        })

                    })
                }

                this.$confirm(this.setting.config.dialogSetting.confirm.tip, '提示', {
                    cancelButtonClass: "btn-custom-cancel",
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    new httpService({
                        url: this.setting.config.dialogSetting.executeUrl,
                        method: this.setting.config.dialogSetting.executeMethod,
                        params: params,
                        data: encriptPwd(postData)
                    }).then((res) => {
                    
                        this.dialogVisible = false
                        if (this.setting.config.guid) {
                            this.$bus.emit(this.setting.config.guid, 'Refresh')
                        }else if(this.setting.config.dialogSetting.refresh){
                            this.$bus.emit(this.setting.config.dialogSetting.refresh,'toSearch')
                        }

                        this.$message({
                            message: this.setting.config.dialogSetting.confirm.success,
                            type: 'success'
                        });

                    }).catch((err) => {
                        console.log(err)
                    })
                })

            },
            initDialog: function (params) { //接受到点击时间后初始化弹框
                this.setting = params

                //判读是否存在list组件
                if (params.config && params.config.dialogSetting.showList) {
                    this.listSetting = params.config.dialogSetting.listSetting
                    this.showList = true
                }
                //判断是否存在searchbar组件
                if (params.config && params.config.dialogSetting.showSearchbar) {
                    this.searchbarSetting = params.config.dialogSetting.searchBar
                    this.showSearchbar = true
                }
                //必须放在这个位置，否则cacheData会被覆盖
                if (params.cacheData) {

                    this.cacheData = params.cacheData
                    this.listSetting.cacheData = params.cacheData
                    this.searchbarSetting.cacheData = params.cacheData
                }
                if (params.config && params.config.dialogSetting) {
                    this.title = params.config.dialogSetting.title
                }
                if (params.config.dialogSetting.hasOwnProperty('prepareUrl')) { //判断有无prepareUrl有的话则请求数据并装载
                    let requestParam = new Object;
                    // requestParam[params.config.dialogSetting.prepareParam] = params.data.guid
                    //准备参数
                    if (params.config.dialogSetting.prepareParams) {

                        requestParam = {}
                        let prepareParams = params.config.dialogSetting.prepareParams

                        prepareParams.forEach((item) => {

                            if (item.cacheData) { //todo采用publicParam机制后可以删除
                                requestParam[item.key] = this.cacheData[item.value]
                            } else if (item.publicParam) {
                                requestParam[item.key] = this.$store.getters.publicParams[item.key]
                            } else {
                                requestParam[item.key] = this.loadData[item.value]
                            }
                        })
                    }
                    //准备参数默认值
                    if (params.config.dialogSetting.defaultPrepareParams) {
                        let defaultPrepareParams = params.config.dialogSetting.defaultPrepareParams
                        defaultPrepareParams.forEach((item) => {
                            requestParam[item.key] = item.value
                        })
                    }

                    new httpService({
                        url: params.config.dialogSetting.prepareUrl,
                        params: requestParam,
                        method: params.config.dialogSetting.prepareMethod
                    }).then((res) => {
                        this.prepareData = res.data
                        if (params.config.dialogSetting.hasOwnProperty('properties')) {
                            this.formSetting = params.config.dialogSetting.properties
                            params.config.dialogSetting.properties.forEach((item) => {
                                if (item.type == 'cascader') { //当存在级联选择时，对prepareData中的对应数据做递归处理
                                    let dataMap = JSON.parse(JSON.stringify(item.dataMap))
                                    let rootDom={
                                            label: '根节点',
                                            value: ''
                                        }
                                    let mainDom=this.buildTree(this.prepareData[item
                                        .data], dataMap)
                                        mainDom.push(rootDom)
                                        console.log(mainDom)
                                    this.cascaderOptions = mainDom
        
                                    //     console.log(this.cascaderOptions)
                                    // if (Object.keys(this.cascaderOptions) == 0) {
                                    //     this.cascaderOptions = [{
                                    //         label: '根节点',
                                    //         value: ''
                                    //     }]
                                    // }
                                }
                                if (item.isString) {
                                    this.isString = true
                                }
                                //数据预处理
                                this.$set(this.form, item.name, item.defaultValue ? item
                                    .defaultValue :
                                    this.prepareData[item.name])
                                if (Object.keys(this.loadData).length !== 0) {
                                    this.$set(this.form, item.name, item.defaultValue ? item
                                        .defaultValue :
                                        this.loadData[item.name])
                                }
                            })
                            this.loadData = {}
                        }
                        this.dialogVisible = true

                    })
                } else {
                    if (params.config.dialogSetting.hasOwnProperty('properties')) {
                        this.formSetting = params.config.dialogSetting.properties
                        params.config.dialogSetting.properties.forEach((item) => {
                            //TODO 对时间组件需要进行特殊处理
                            this.$set(this.form, item.name, item.defaultValue ? item.defaultValue :
                                '')
                        })
                    }
                    this.dialogVisible = true
                }

            },
            innerDialog: function (params) {

                let data = new Object
                data.config = params.buttonConfig //传入inputandbutton按钮的配置参数
                data.config.parentGuid = this.setting.config.dialogSetting.guid //传入当前弹框的guid作为下一层弹框的父guid，用于消息传递
                data.propertiesName = params.name //传入inputandbutton字段名称，用于定位字段进行修改
                data.bind = params.bind //最终发送请求需要的字段
                this.$bus.emit(params.buttonConfig.dialogSetting.guid, data)
                // this.$bus.on(this.dialogSetting.guid + data.propertiesName, this.toUpdateData)
            },
            toUpdateData: function (params) {
                if (this.formSetting = null) {
                    this.checkData = params
                    return
                }
                this.inputAndButtonData = params
                //todo 临时对字段进行定位的方法
                let config = this.setting.config.dialogSetting.properties.filter((res) => {
                    return res.type == 'inputAndButton'
                })
                //接受到参数
                if (this.form.hasOwnProperty(config[0].name)) {
                    this.form[config[0].name] = params.loginName
                }
            },
            toSaveMultipleSelection: function (params) {

                this.multipleSelection = params.data
            },
            toLoadData: function (params) {
                this.loadData = params.loadData
                this.catchData = params.catchData
                this.initDialog(params)

            },
            reciveListData: function (params) { //接受嵌套list组件传入的数据
                this.listData = params
            },
            buildTree: function (data, dataMap) {
                let tree = [];
                data.forEach((item) => {
                    //先找到一级节点（没有parent的节点）
                    if (data.filter(function (record) {
                            if (record.guid === item.parentGuid)
                                return true;
                            return false;
                        }).length === 0) {
                        let node = {};
                        this.recursiveTree(node, 1, data, item, dataMap)
                        tree.push(node);
                    }
                });
                return tree
            },
            recursiveTree: function (node, level, allData, currentData, dataMap) {
                //获得当前菜单的子菜单
                let children = allData.filter(function (item) {
                    if (item.parentGuid === currentData.guid)
                        return true;
                    return false;
                })
                node.label = currentData[dataMap.label]
                node.value = currentData[dataMap.value]
                if (children.length !== 0) {
                    node.children = [];
                    children.forEach((childData) => {
                        let childNode = {};
                        this.recursiveTree(childNode, level + 1, allData, childData, dataMap);
                        node.children.push(childNode);
                    });
                }
            },
            toReceive: function (data) {

                if (data && data.function) {
                    eval(`this.${data.function}(data)`)
                } else {
                    this.initDialog(data)
                }
            },
        },
        created() {
            this.showList - false
            this.showSearchbar = false
            this.$bus.on(this.dialogSetting.guid, this.toReceive)
        },
        beforeDestroy() { //销毁监听事件
            this.$bus.off(this.dialogSetting.guid, this.toReceive)
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.el-dialog__header {
        background: rgb(246, 246, 246);
        padding: 5px 0 5px 0;
    }

    /deep/ .el-dialog__close {
        position: relative;
        top: -12px;
    }

    /deep/ .el-dialog__footer {
        background: rgb(246, 246, 246);
        padding: 3px 0 3px 0;
    }

    /deep/ .el-dialog__body {
        padding: 10px 0 10px 0;
    }

    /deep/ .el-dialog__title {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-size: 16px Medium;
    }

    .listSlot {
        padding: 0 0 0 0;
    }
</style>