<template>
  <div class="dashboard-container">
    <el-main>
      <list-mnt :listSetting='listSetting1'>
        <searchBar :searchBar="searchBar1" slot="搜索框"></searchBar>
      </list-mnt>
      <collapse :collapseSetting="collapseSetting">
        <list-mnt :listSetting='listSetting2' slot="所属机构"></list-mnt>
        <list-mnt :listSetting='listSetting3' slot="密钥"></list-mnt>
        <list-mnt :listSetting='listSetting4' slot="所属角色"></list-mnt>
        <list-mnt :listSetting='listSetting5' slot="职位"></list-mnt>
        <list-mnt :listSetting='listSetting6' slot="代理人"></list-mnt>
      </collapse>
      <dia-log :dialogSetting='dialogSetting1'></dia-log>
      <dia-log :dialogSetting='dialogSetting2'>
        <list-mnt :listSetting='listSetting7' slot="list">
          <searchBar :searchBar="searchBar2" slot="搜索框"></searchBar>
        </list-mnt>
      </dia-log>
    </el-main>

  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        currentRole: 'adminDashboard',
        searchBar1: {
          name: "用户列表",
          guid: '80ea7f07-5b16-463a-8278-0f758bdd72b9',
          target: 'e00f6b73-7b71-41ff-9be1-7d2b78736c37',
          properties: [{
              type: "select",
              url: "u/realms",
              paramName: "realmGuid",
              publicParam: true,
              dataMap: {
                label: "name",
                value: "guid"
              },
              width: 200
            },
            {
              type: "select",
              url: "users/prepareSearchBar",
              paramName: "state",
              dataMap: {
                label: "label",
                value: "value"
              },
              width: 200
            },
            {
              type: "input",
              paramName: "condition",
              placeholder: "请输入姓名，手机号，姓名....",
              width: 300
            },
            {
              type: "button",
              function: "search",
              name: "搜索",
            },
            {
              name: "新建",
              type: "button",
              function: "created", //按钮功能      
              dialogSetting: { //dialog弹框配置，不能为空
                target: '96d11298-164d-4d84-9811-581e7e3218a5', //页面dialog组件guid，不能为空
                title: '新建用户',
                prepareUrl: ':dasc/users/prepare', //准备数据接口，可以为空
                prepareMethod: 'get',
                executeUrl: ':dasc/realmUsers/addUser', //提交表单接口，不能为空
                executeParams: [{
                  publicParam: true,
                  key: "realmGuid",
                }],
                executeMethod: 'post',
                confirm: {
                  tip: "确认增加？",
                  success: "新增成功"
                },
                properties: [{
                    type: 'input',
                    label: '姓名',
                    name: 'userName',
                    required: true,
                    validateErrorMessage: "必填项不能为空"
                  },
                  {
                    type: 'input',
                    label: '登录名',
                    name: 'loginName',
                    required: true,
                    validateErrorMessage: "必填项不能为空"
                  },
                  {
                    type: 'password',
                    label: '登录密码',
                    name: 'loginPwd',
                    required: true,
                    validateErrorMessage: "必填项不能为空"
                  },
                  {
                    type: 'password',
                    label: '签字密码',
                    name: 'signPwd',
                    required: true,
                    validateErrorMessage: "必填项不能为空"
                  },
                  {
                    type: 'input',
                    label: '固定电话',
                    name: 'telephone',
                  },
                  {
                    type: 'input',
                    label: '手机',
                    name: 'mobilephone',
                  },
                  {
                    type: 'input',
                    label: '电子邮件',
                    name: 'email',
                  },

                  {
                    type: "select",
                    label: '级别',
                    name: 'level', //存储数据的字段名
                    defaultValue: '1',
                    data: 'levels', //准备数据对应字段名
                    dataMap: { //下拉框数据与准备数据对应关系
                      label: "label",
                      value: "value"
                    },
                    required: true,
                    validateErrorMessage: "必填项不能为空"
                  },
                  {
                    type: 'input',
                    label: '邮政编码',
                    name: 'postcode',
                  },
                  {
                    type: 'datePicker',
                    label: '参加工作事件',
                    name: 'workTime',
                  },
                  {
                    type: 'radio',
                    label: '是否在编',
                    name: 'isInStaff',
                    labelGroup: ['是', '否'],
                    defaultValue: 'true'
                  },
                  {
                    type: 'input',
                    label: '排序',
                    name: 'sortNo',
                  },
                  {
                    type: 'input',
                    label: '备注',
                    name: 'remark',
                  }
                ]
              },
            }
          ]
        },
        searchBar2: {
          name: "代理人列表",
          guid: '9f80c26c-a379-495a-80a6-32cacbb66f97',
          target: 'd0ef9dae-9c79-4b18-a870-45f0b1bc1019',
          properties: [{
              type: "input",
              paramName: "searchContent",
              placeholder: "请输入姓名，手机号，姓名....",
              width: 300
            },
            {
              type: "button",
              function: "search",
              name: "搜索"
            }
          ]
        },
        listSetting1: {
          guid: 'e00f6b73-7b71-41ff-9be1-7d2b78736c37',
          url: ":dasc/users/searchByState",
          showIndex: true,
          col: 18,
          grid: {
            columns: [{
                label: '用户姓名',
                data: 'userName',
              },
              {
                label: '登录名',
                data: 'loginName',
              },
              {
                label: '手机号码',
                data: 'mobilephone',
              },
              {
                label: '工号',
                data: 'jobNumber',
              },
              {
                label: '是否在编',
                data: 'isInStaff',
              },
              {
                label: '显示顺序',
                data: 'sortNo',
              },
              {
                label: '备注',
                data: 'remark',
              },

            ],
            buttons: [
              {
                name: "修改",
                loadUrl: ":dasc/users/get",
                params: [{
                  key: 'guid',
                  value: 'guid'
                }],
                method: 'get',
                function: "modify",
                body: ['guid'],
                dialogSetting: {
                  target: '96d11298-164d-4d84-9811-581e7e3218a5', //页面dialog组件guid，不能为空
                  refresh:'80ea7f07-5b16-463a-8278-0f758bdd72b9',
                  title: '修改用户',
                  prepareUrl: ':dasc/users/prepare', //准备数据接口，可以为空
                  prepareMethod: 'get',
                  executeUrl: ':dasc/users/modify', //提交表单接口，不能为空
                  executeMethod: 'post',
                  confirm: {
                    tip: "确认修改？",
                    success: "修改成功"
                  },
                  properties: [{
                      type: 'input',
                      label: '姓名',
                      name: 'userName',
                      required: true,
                      validateErrorMessage: "必填项不能为空"
                    },
                    {
                    type: 'input',
                      label: '标志',
                      name: 'guid',
                      hide: true,
                    },
                    {
                      type: 'input',
                      label: '登录名',
                      name: 'loginName',
                      disabled: true,
                    },
                    {
                      type: 'input',
                      label: '固定电话',
                      name: 'telephone',
                    },
                    {
                      type: 'input',
                      label: '手机',
                      name: 'mobilephone',
                    },
                    {
                      type: 'input',
                      label: '电子邮件',
                      name: 'email',
                    },

                    {
                      type: "select",
                      label: '级别',
                      name: 'level', //存储数据的字段名
                      defaultValue: '1',
                      data: 'levels', //准备数据对应字段名
                      dataMap: { //下拉框数据与准备数据对应关系
                        label: "label",
                        value: "value"
                      },
                      required: true,
                      validateErrorMessage: "必填项不能为空"
                    },
                    {
                      type: 'input',
                      label: '邮政编码',
                      name: 'postcode',
                    },
                    {
                      type: 'datePicker',
                      label: '参加工作事件',
                      name: 'workTime',
                    },
                    {
                      type: 'radio',
                      label: '是否在编',
                      name: 'isInStaff',
                      labelGroup: ['是', '否'],
                      defaultValue: 'true'
                    },
                    {
                      type: 'input',
                      label: '排序',
                      name: 'sortNo',
                    },
                    {
                      type: 'input',
                      label: '备注',
                      name: 'remark',
                    }
                  ]

                }
              },
              {
                name: "设置密码",
                size: 'mini',
                function:'modify',
                loadUrl:':dasc/users/preparePwd',
                method:'get',
                params:[{
                    key:'userGuid',
                    value:'guid'
                  }],
                dialogSetting: {
                  target: '96d11298-164d-4d84-9811-581e7e3218a5', //页面dialog组件guid，不能为空
                  refresh:'80ea7f07-5b16-463a-8278-0f758bdd72b9',
                  title: '设置密码',
                  executeUrl: ':dasc/users/changePwd', //提交表单接口，不能为空
                  executeMethod: 'post',
                  confirm: {
                    tip: "确认修改？",
                    success: "修改成功"
                  },
                  properties: [
                    {
                      type: 'password',
                      label: '新登录密码',
                      name: 'newLoginPwd',
                      required: true,
                      validateErrorMessage: "必填项不能为空"
                    },
                    {
                 type: 'password',
                      label: '确认新登录密码',
                      required: true,
                      name: 'confirmLoginPwd',
                    },
                    {
                  type: 'password',
                      label: '新签字密码',
                      required: true,
                      name: 'newSignPwd',
                    },
                    {
                      type: 'password',
                      label: '确认新签字密码',
                      required: true,
                      name: 'confirmSignPwd',
                    },
                    {
                      type: 'input',
                      label: '标志',
                      name: 'userGuid',
                      hide:true
                    }
                  ]

                }
              },
              {
                name: "调离",
                function: "remove",
                url: ':dasc/users/transferOut',
                params: [{
                  key: "userGuid",
                  value: "guid"
                }],
                body: ['guid', 'levelName', 'sortNo'],
                method: 'post',
                confirm: {
                  tip: "确认调离该用户？",
                  success: "调离成功"
                },
                size: 'mini'
              },
              {
                name: "挂起",
                function: "remove",
                url: ":dasc/users/hangup",
                size: 'mini',
                body: ['guid'],
                method: 'post',
                confirm: {
                  tip: "确认挂起该用户？",
                  success: "挂起成功"
                },
                precondition: {
                  name: 'state',
                  value: 1
                }
              },
              {
                name: "离职",
                function: 'delete',
                size: 'mini',
                url: ":dasc/users/delete",
                body: ['guid'],
                method: 'post',
                confirm: {
                  tip: "确认离职？",
                  success: "离职成功"
                },
              }
            ],
            event: {
              rowClick: {
                target: ['72c6e3cb-bd7c-4cbe-b603-7128102b0609'],
                function: 'toShow'
              },
            }
          },
          pagination: {
            size: 10
          }
        },
        listSetting2: {
          guid: '3aec9f99-21d5-4312-965e-fdcca1163d03',
          url: ":dasc/orgUsers/listOrgs",
          paramName: "userGuid",
          col: 24,
          grid: {
            columns: [{
                label: '简称',
                data: 'shortName',
              },
              {
                label: '类型',
                data: 'orgTypeName',
              }
            ]
          }
        },
        listSetting3: {
          guid: '7f2b57d1-9929-490b-90b5-484bb9777042',
          url: ":dasc/users/listUserSecretKeys",
          paramName: "userGuid",
          col: 24,
          grid: {
            columns: [{
              label: '密钥名称',
              data: 'strValue',
            }],
            buttons: [
              {
                name: '修改',
                function:'modify',
                loadUrl:':dasc/users/modifyUserSecretKeys/get',
                params:[{
                  key:'secretKeyGuid',
                  value:'guid',
                }],
                method:'get',
                dialogSetting:{
                  target:'96d11298-164d-4d84-9811-581e7e3218a5',
                  prepareUrl:':dasc/users/prepareAddSecretKeys',
                  prepareMethod:'get',
                  executeUrl:':dasc/users/modifyUserSecretKeys',
                  executeParams:[{
                    cacheData:true,
                    key:'userGuid',
                    value:'guid'
                  }],
                  executeMethod:'post',
                  confirm:{
                    tip:'确认增加',
                    success:'修改成功'

                  },
                  properties:[{
                    type:'input',
                    label:'密钥名称',
                    name:'strValue',
                  },
                  {
                    type:'input',
                    label:'密钥',
                    name:'clobValue',
                  },
                  {
                    type:'input',
                    label:'fieldName',
                    name:'fieldName',
                    hide:true,
                  },
                   {
                    type:'input',
                    label:'subjectIdentity',
                    name:'subjectIdentity',
                    hide:true,
                  },
                  {
                    type:'input',
                    label:'guid',
                    name:'guid',
                    hide:true,
                  },
                  ]
                }
              },
              {
                name: '删除',
                function:'delete',
                url:':dasc/users/deleteUserSecretKeys',
                method:'post',
                body:['guid'],
                confirm:{
                  tip:'确认删除？',
                  success:'删除成功'
                }
              }
            ]
          }
        },
        listSetting4: {
          guid: 'b9dc4f57-8617-4cb9-9f80-3d18d0aa9f03',
          url: ":dasc/userroles/roles/list",
          paramName: "userGuid",
          defaultParams: [{
            key: 'types',
            value: '1,2'
          }],
          col: 24,
          grid: {
            columns: [{
                label: '角色名称',
                data: 'roleName',
              },
              {
                label: '角色类型',
                data: 'roleTypeName',
              }
            ]
          }
        },
        listSetting5: {
          guid: 'ffba8dc6-0730-4146-9f29-26472eba392d',
          url: ":dasc/userroles/roles/list",
          paramName: "userGuid",
          defaultParams: [{
            key: 'types',
            value: '4'
          }],
          col: 24,
          grid: {
            columns: [{
              label: '职位名称',
              data: 'roleName',
            }]
          }
        },
        listSetting6: {
          guid: '28636055-2943-49ce-9566-fad84e95ad82',
          url: ":dasc/users/listUserAgents",
          paramName: "clientGuid",
          col: 24,
          grid: {
            columns: [{
                label: '用户姓名',
                data: 'agentName',
              },
              {
                label: '登录名',
                data: 'agentLoginName',
              },
              {
                label: '开始时间',
                data: 'agentName',
              },
              {
                label: '结束时间',
                data: 'agentName',
              }
            ],
            buttons: [{
                name: '修改'
              },
              {
                name: '删除'
              }
            ]
          }
        },
        listSetting7: {
          guid: 'd0ef9dae-9c79-4b18-a870-45f0b1bc1019',
          url: ":dasc/users/prepareUserAgent?clientGuid=3eb8c5f0-fdea-4cca-a099-479832d1c054",
          target: '96d11298-164d-4d84-9811-581e7e3218a5',
          checkbox: {
            type: 'single',
          },
          col: 24,
          grid: {
            columns: [{
                label: '名称',
                data: 'userName',
              },
              {
                label: '登录名',
                data: 'loginName',
              }
            ]
          },
          pagination: {
            size: 10
          }
        },
        dialogSetting1: { //第一层弹框类实例
          guid: '96d11298-164d-4d84-9811-581e7e3218a5',
        },
        dialogSetting2: { //第二层弹框类实例
          guid: 'e0e85fc0-4544-4661-8d7d-547b38534226'
        },
        collapseSetting: { //手风琴组件实例
          col: 6,
          hide: true,
          guid: '72c6e3cb-bd7c-4cbe-b603-7128102b0609',
          properties: [{
              title: '所属机构',
              button: [
            {
                name: '刷新',
                target: '3aec9f99-21d5-4312-965e-fdcca1163d03'
              }]
            },
            {
              title: '密钥',
              button: [{
                name: '新建',
                 dialogSetting:{
                  target:'96d11298-164d-4d84-9811-581e7e3218a5',
                  executeUrl:':dasc/users/addUserSecretKeys',
                  executeParams:[{
                    cacheData:true,
                    key:'userGuid',
                    value:'guid'
                  }],
                  executeMethod:'post',
                  confirm:{
                    tip:'确认增加',
                    success:'添加成功'

                  },
                  properties:[{
                    type:'input',
                    label:'密钥名称',
                    name:'strValue',
                  },
                  {
                    type:'input',
                    label:'密钥',
                    name:'clobValue',
                  },
                  ]
                }
              }, {
                name: '刷新',
                target: '7f2b57d1-9929-490b-90b5-484bb9777042'
              }]
            },
            {
              title: '所属角色',
              button: [
                {
                name: '刷新',
                target: 'b9dc4f57-8617-4cb9-9f80-3d18d0aa9f03'
              }]
            },
            {
              title: '职位',
              button: [
                {
                name: '刷新',
                target: 'ffba8dc6-0730-4146-9f29-26472eba392d'
              }]
            },
            {
              title: '代理人',
              button: [{
                name: '添加代理人',
                dialogSetting:{
                  target:'96d11298-164d-4d84-9811-581e7e3218a5',
                  executeUrl:':dasc/users/addUserSecretKeys',
                  executeParams:[{
                    cacheData:true,
                    key:'userGuid',
                    value:'guid'
                  }],
                  executeMethod:'post',
                  properties:[{
                    type:'input',
                    label:'密钥名称',
                    name:'strValue',
                  },
                  {
                    type:'input',
                    label:'密钥',
                    name:'clobValue',
                  },
                  ]
                }
              }, {
                name: '刷新',
                target: '28636055-2943-49ce-9566-fad84e95ad82'
              }]
            }
          ]
        }
      }
    },
    methods: {

    },
    created() {}
  }
</script>
<style lang="scss" scoped>
</style>