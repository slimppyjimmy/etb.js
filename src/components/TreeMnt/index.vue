<template>

    <el-col :span="this.treeSetting.col? this.treeSetting.col:12" v-show="treeSetting.hide? !treeSetting.hide:true">
        <el-card shadow="none" :body-style="{ padding: '10px 10px 10px 10px',border:'none'}">
            <div slot="header">
                <slot name="搜索框"> </slot>
                <!-- <searchBar v-if="treeSetting.searchBar? true:false" :searchBar="treeSetting.searchBar"
                            :guid=treeSetting.guid class="searchbar"></searchBar> -->
            </div>
            <div>
                <ztree :nodes='treeNodes' :setting='setting' @onCreated='initTree' @onClick="handleNodeClick">
                </ztree>
            </div>
        </el-card>
    </el-col>

</template>

<script>
    import {
        httpService
    } from '../../utils/request'
    import ztree from "vue-giant-tree";
    export default {
        components: {
            ztree
        },
        name: 'tree-mnt',
        data() {
            return {
                searchData: {},
                clickNode: '',
                treeNodes: [],
                setting: {
                    check: {
                        chkStyle: "checkbox",
                        chkboxType: {
                            "Y": "s",
                            "N": "s"
                        },
                        enable: this.treeSetting.showCheckBox? this.treeSetting.showCheckBox:false,
                    },
                    data: {
                        key: {
                            children: 'isChildren',
                            isParent: 'isParent',
                            name: this.treeSetting.treeLabel,
                            title: '',
                        },
                        simpleData: {
                            enable: 'true',
                            idKey: 'guid',
                            pIdKey: "parentGuid",
                            rootPId: ''
                        },

                    },
                    view: {
                        showIcon: this.treeSetting.showIcon,
                        showLine: this.treeSetting.showLine,
                        addHoverDom: this.addHoverDom,
                        removeHoverDom: this.removeHoverDom,
                    }
                }
            }
        },
        props: {
            treeSetting: {
                type: Object
            }
        },
        methods: {
            initTree: function (treeObj) {
                treeObj.expandAll(this.treeSetting.expandAll)
            },
            handleNodeClick: function (evnet, treeId, treeNode) {
                
                if (this.treeSetting.hasOwnProperty('event')) {
                    const gridEvent = this.treeSetting.event
                    if (gridEvent.rowClick) {
                        let data = new Object;
                        data.function = gridEvent.rowClick.function;
                        data.row = treeNode
                        gridEvent.rowClick.target.forEach((item) => {
                            let param = new Object;
                            this.$store.getters.cacheData[item] = data.row 
                            console.log(199191919)
                            console.log(this.$store.getters.cacheData)//存储行数据，关键数据避免重复传递
                            this.$bus.emit(item, data)
                        })
                    }
                }
                const item = document.getElementById(`${treeNode.tId}_span`)
                this.clickNode = treeNode
            },
            addHoverDom(treeid, treeNode) { //tree节点鼠标移入函数
                if (this.treeSetting.treeNodeButton) {
                    const item = document.getElementById(`${treeNode.tId}_a`);
                    if (item && !item.querySelector('.tree_extra_btn')) {
                        this.treeSetting.treeNodeButton.forEach((btnItem) => {
                            const btn = document.createElement('sapn');
                            btn.id = `${treeid}_${treeNode.id}_btn`;
                            btn.classList.add('tree_extra_btn');
                            btn.innerText = btnItem.name;
                            btn.setAttribute("style", "color:#409eff;cursor:pointer;margin-left: 4px;")
                            btn.addEventListener('click', (e) => {
                                e.stopPropagation()
                                this.treeNodeButtonClick(treeNode, btnItem)
                            })
                            item.appendChild(btn);
                        })

                    }
                } else {
                    return
                }
            },
            removeHoverDom(treeid, treeNode) { //tree节点鼠标移出函数
                if (this.treeSetting.treeNodeButton) {
                    this.treeSetting.treeNodeButton.forEach((btnItem) => {
                        const item = document.getElementById(`${treeNode.tId}_a`);
                        if (item) {
                            const btn = item.querySelector('.tree_extra_btn');
                            if (btn) {
                                item.removeChild(btn)
                            }
                        }
                    })
                } else {
                    return
                }
            },
            treeNodeButtonClick: function (treeNode, btnConfig) {
                switch (btnConfig.function) {
                    case ('modify'):
                        this.toModify(btnConfig, treeNode)
                        break;
                    case ('delete'):
                        this.toDelete(btnConfig, treeNode)
                        break;
                }
            },
            toModify: function (config, node) {
                //TODO 请求参数和body的转换部分应该写成公共方法，放在reques.js的参数验证中
                let params = {}
                //判断是否携带params，打包数据
                if (config.params) {
                    for (let i in config.params) {
                        let item = config.params[i]
                        params[item.key] = node[item.value]
                    }
                }
                let data = []
                //判断是否携带body，打包数据
                if (config.method === 'post' && config.body) {
                    for (let i in config.body) {
                        let key = config.body[i]
                        data.push(node[key])
                    }
                }
                let url=''
                if (config.loadUrl){
                    url=config.loadUrl
                }else if(config.url){
                    url =config.url
                }
               new httpService({
                   url:url,
                   method:config.method,
                   params:params,
                   data:data
               }).then((res)=>{
                   if(config.dialogSetting){
                       let data=new Object;
                       data.config=config
                       data.loadData=res.data
                       data.function='toLoadData'
                       data.cacheData=this.$store.getters.cacheData[this.treeSetting.guid]
                       this.$bus.emit(config.dialogSetting.target,data)
                   }else{
                       this.toSearch(this.searchData)
                   }

               })
     
            },
            toDelete: function (config, node) {
                if (node == undefined) {
                    node = this.clickNode
                }
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
                            params[item.key] = node[item.value]
                        }
                    }
                    let data = []
                    //判断是否携带body，打包数据
                    if (config.method === 'post' && config.body) {
                        for (let i in config.body) {
                            let key = config.body[i]
                            data.push(node[key])
                        }
                    }
                    this.sendRequest(config.url, config.method, params, data)
                })
            },
            sendRequest: function (url, method, params, data, confirm) {
                new httpService({
                    url: url,
                    method: method,
                    params: params,
                    data: data
                }).then(res => {
                    this.toSearch(this.searchData)
                    if (confirm) {
                        this.$message({
                            type: 'success',
                            message: confirm.success
                        });
                    }
                })
            },
            toSearch: function (params) {
                //设置分页值
                if(params.function){
                    delete params.function
                }
                if(this.treeSetting.defaultParams){
                    this.treeSetting.defaultParams.forEach((item) => {
                        params[item.key] = item.value
                    })
                }
                new httpService({
                    url: this.treeSetting.url,
                    params: params,
                }).then(res => {
                    this.treeNodes = [] //初始化，避免重复往treeNodes中添加数据
                    res.data.forEach((item) => {
                        if (this.treeSetting.treeNodeData) {
                            let node = {}
                            this.treeSetting.treeNodeData.forEach((key) => {
                                node[key] = item[key]
                                node.iconSkin = 'icon01'
                            })
                            this.treeNodes.push(node)
                        } else {
                            item.iconSkin = 'icon01'
                        }
                    })
                    if (!this.treeSetting.treeNodeData) {
                        this.treeNodes = res.data
                    }
                    this.searchData = params //seabar数据打包
                })
            },
            toShow: function (data) {
                this.toRefresh(data)
                this.treeSetting.hide = false
            },
            toRefresh(data) {
                let params = new Object;
                //对请求存在默认参数值进行处理
                if (this.treeSetting.defaultParams) {
                    this.treeSetting.defaultParams.forEach((item) => {
                        params[item.key] = item.value
                    })
                }
                params[this.treeSetting.paramName] = data.row.guid
                new httpService({
                    url: this.treeSetting.url,
                    params: params,
                    method: 'get'
                }).then(res => {
                    this.treeNodes = [] //初始化，避免重复往treeNodes中添加数据
                    res.data.forEach((item) => {
                        if (this.treeSetting.treeNodeData) {
                            let node = {}
                            this.treeSetting.treeNodeData.forEach((key) => {
                                node[key] = item[key]
                                node.iconSkin = 'icon01'
                            })
                            this.treeNodes.push(node)
                        } else {
                            item.iconSkin = 'icon01'
                        }
                    })
                    if (!this.treeSetting.treeNodeData) {
                        this.treeNodes = res.data
                    }
                    this.searchData = params //seabar数据打包
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
            if (this.treeSetting) {
                const baseSetting = ['url', 'treeLabel']
                baseSetting.forEach((item) => {
                    if (Object.keys(this.treeSetting).indexOf(item) < 0) {
                        console.error('配置项中缺少' + item)
                    }
                })
            }
            this.$bus.on(this.treeSetting.guid, this.toReceive)
        },
        beforeDestroy() {
            this.$bus.off(this.treeSetting.guid, this.toReceive);
        }
    }
</script>

<style lang='scss' scoped>
    // .searchbar {
    //     position: absolute;
    //     top: 20px;
    //     left: 20px;
    // }
    /deep/ .ztree li span.button.icon01_ico_open {
        width: 22px;
        height: 22px;
        background: url(../../assets/icon_font/metro.gif)no-repeat;
        background-position: -147px -21px;
        vertical-align: top;
        *vertical-align: middle
    }

    /deep/ .ztree li span.button.icon01_ico_close {
        width: 22px;
        height: 22px;
        background: url(../../assets/icon_font/metro.gif)no-repeat;
        background-position: -147px 0;
        vertical-align: top;
        *vertical-align: middle
    }

    /deep/.ztree li span.button.icon01_ico_docu {

        width: 22px;
        height: 22px;
        background: url(../../assets/icon_font/metro.gif)no-repeat;
        background-position: -147px -42px;
        vertical-align: top;
        *vertical-align: middle
    }
</style>