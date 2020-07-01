<template>
    <el-col :span="this.collapseSetting.col? this.collapseSetting.col:12" v-show="collapseSetting.hide? !collapseSetting.hide:true">
        <el-card shadow="none" :body-style="{ padding: '10px 10px 10px 10px',border:'none'}">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item v-for="(item,key) in collapseSetting.properties " :title="item.name" :name="key "
                    class="collapse-item">
                    <template slot="title">
                        <span class="collapse-title">{{item.title}}
                            <span>
                                <el-button v-for="(btn,key) in item.button " type="primary" size="mini"
                                    @click.stop="handleClick(btn)">{{btn.name}}</el-button>
                            </span>

                        </span>

                    </template>
                    <slot :name="item.title"> </slot>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </el-col>

</template>

<script>
    export default {
        name: 'collapse',
        data() {
            return {
                activeNames: ['1'],
                data: {},
            }
        },
        props: {
            collapseSetting: {
                type: Object
            }
        },
        methods: {
            handleChange(val) {},
            handleClick(config, data) {
                 console.log(12312312312)
                 console.log(config)
                 console.log(data)
                 if (config.dialogSetting) {
                    
                    let data = new Object
                    data.config = config
                    data.config.guid = this.collapseSetting.guid
                  
                    this.$bus.emit(config.dialogSetting.target, data)
                   
                } else  {
                    this.$bus.emit(config.target, this.data)
                }
            },
            toReceive: function (data) {
                if (data.function) {
                    eval(`this.${data.function}(data)`)
                }
            },
            toShow: function (data) {
                this.data = data
                //向组件分发消息，传递数据
                this.collapseSetting.properties.forEach((item) => {
                    if (item.button) {
                        item.button.forEach((btn) => {
                            if (btn.name == '刷新' && btn.target) {
                                data.function = 'toRefresh'
                                this.$bus.emit(btn.target, data)
                            }
                        })
                    }
                })
                this.collapseSetting.hide = false

            },
        },
        created() {
            this.$bus.on(this.collapseSetting.guid, this.toReceive)
        },
        beforeDestroy() {
            this.$bus.off(this.collapseSetting.guid, this.toReceive)
        }
    }
</script>

<style>
    .collapse-title {
        flex: 1 0 90%;
        order: 1;
        display: flex;
        justify-content: space-between;

    }

    .el-collapse-item__header {
        flex: 1 0 auto;
        order: -1;
    }

    .collapse-btn {
        margin-right: 100px;
    }
</style>