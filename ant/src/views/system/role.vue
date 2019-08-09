<template>
  <div class="pages bgMain">
    <div class="topTool">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href>系统管理</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>角色管理</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="title">角色管理</h1>
    </div>

    <div class="dataList">
      <div class="dataForm" style="    overflow: hidden;">
        <a-form layout="inline">
          <a-row :gutter="20">
            <a-col :span="7">
              <a-form-item label="角色名称">
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item>
                <a-button type="primary">查询</a-button>
                <a-button style="margin-left: 10px;">重置</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-form layout="inline">
          <a-form-item style="float:right;overflow: hidden;">
            <a-button type="primary" @click="visible = true">新建</a-button>
          </a-form-item>
        </a-form>
      </div>

      <a-table :columns="columns" :dataSource="data">
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="editRole(record)">编辑</a>
          <a-popconfirm title="您确定要删除此角色吗?" @confirm="delRole(record)" okText="删除" cancelText="取消">
            <a href="javascript:;" style="margin-left: 10px;color:red;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <a-modal width="800px" title="角色" v-model="visible" @ok="handleOk">
      <a-form>
        <a-form-item label="角色名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input placeholder="请输入" name="name" />
        </a-form-item>
        <a-form-item label="角色备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-textarea placeholder="请输入" :autosize="{ minRows: 2, maxRows: 6 }" />
        </a-form-item>
      </a-form>
      <a-card title="选择菜单权限">
        <div>
          <a-table rowKey="record_id" :columns="treeColumns" :dataSource="treeData" >
              <span slot="actions" slot-scope="actions">
121
              </span>
          </a-table>
        </div>
      </a-card>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  { title: "角色名称", dataIndex: "name", key: "name", width: "20%" },
  { title: "角色备注", dataIndex: "remarks", key: "remarks" },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
let data = [
  { key: "1", name: "角色1", remarks: "角色1备注" },
  { key: "2", name: "角色2", remarks: "角色2备注" }
];
const treeColumns = [
  {
    title: "菜单名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "动作权限",
    dataIndex: "actions",
    key: "actions",
    scopedSlots: { customRender: 'actions'}
  },
  {
    title: "资源权限",
    dataIndex: "resources",
    key: "resources"
  }
];
import { treeData } from "../../mock/treeData";
export default {
  name: "role",
  data() {
    return {
      columns,
      data,
      visible: false,
      treeColumns,
      treeData: treeData.list
    };
  },
  methods: {
    editRole(item) {
      console.log(item);
    },
    delRole(item) {
      console.log(item);
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>