<template>
  <div class="pages bgMain">
    <div class="topTool">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href>系统管理</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>用户管理</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="title">用户管理</h1>
    </div>

    <div class="dataList">
      <div class="dataForm" style="    overflow: hidden;">
        <a-form layout="inline">
          <a-row :gutter="20">
            <a-col :span="7">
              <a-form-item label="用户名称">
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
            <a-button type="primary" @click="visible = true">新建用户</a-button>
          </a-form-item>
        </a-form>
      </div>

      <a-table :columns="columns" :dataSource="data">
        <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="editRole(record)">编辑</a>
          <a-popconfirm title="您确定要禁用此用户吗?" @confirm="delRole(record)" okText="禁用" cancelText="取消">
            <a href="javascript:;" style="margin-left: 10px;color:red;">禁用</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <a-modal width="800px" title="用户" v-model="visible" @ok="handleOk">
      <a-form>
        <a-form-item label="用户名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input placeholder="请输入" name="name" />
        </a-form-item>
        <a-form-item label="性别" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-radio-group name="radioGroup" :defaultValue="1">
            <a-radio :value="1">男</a-radio>
            <a-radio :value="2">女</a-radio>
          </a-radio-group>
        </a-form-item>
        
      </a-form>
      <a-card title="角色列表">
        <div>
          <a-table rowKey="record_id" :columns="treeColumns" :dataSource="treeData"></a-table>
        </div>
      </a-card>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  { title: "用户名", dataIndex: "name", key: "name", width: "20%" },
  { title: "性别", dataIndex: "remarks", key: "remarks" },
  { title: "状态", dataIndex: "sta", key: "sta" },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
let data = [
  { key: "1", name: "username1", remarks: "男", sta: "正常" },
  { key: "2", name: "username2", remarks: "女", sta: "正常" }
];
const treeColumns = [];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};
import { treeData } from "../../mock/treeData";
export default {
  name: "role",
  data() {
    return {
      columns,
      data,
      visible: false,
      treeColumns,
      treeData: treeData.list,
      rowSelection
    };
  },
  methods: {
    editRole(item) {
      this.visible = true;
      console.log(item);
    },
    delRole(item) {
      console.log(item);
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>