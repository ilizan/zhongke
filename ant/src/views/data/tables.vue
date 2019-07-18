<template>
  <div class="pages bgMain">
    <div class="topTool">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href>列表</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>分页</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="title">xxx模块</h1>
    </div>
    <div class="dataList">
      <div class="dataForm">
        <a-form layout="inline">
          <a-row :gutter="20">
            <a-col :span="8">
              <a-form-item label="条件1">
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="条件2">
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>
            <div v-show="advanced">
              <a-col :span="8">
                <a-form-item label="条件3">
                  <a-select
                    mode="multiple"
                    placeholder="请选择"
                    :defaultValue="['a1', 'b2']"
                  >
                    <a-select-option
                      v-for="i in 25"
                      :key="(i + 9).toString(36) + i"
                    >{{(i + 9).toString(36) + i}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </div>
            <a-col :span="!advanced && 8 ||24">
              <a-form-item :style="advanced && {float:'right'} || {}">
                <a-button type="primary">查询</a-button>
                <a-button style="margin-left: 8px;">重置</a-button>
                <a @click="advanced=!advanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item style="float:right">
                <a-button type="primary" @click="visible = true">新增</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table :columns="columns" :dataSource="data" :loading="loading">
        <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
        <span slot="customTitle">
          <a-icon type="smile-o" />Name
        </span>
        <span slot="tags" slot-scope="tags">
          {{tags}}
          <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
        </span>
        <span slot="action" slot-scope="text, record">{{record.name}}</span>
      </a-table>
    </div>
    <a-modal
      title="Title"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="visible = false"
      okText="确认"
      cancelText="取消"
    >
      <a-form layout="horizontal">
        <a-form-item :label-col="{span:4}" :wrapper-col="{span:18}" label="信息1">
          <a-input placeholder="请输入" />
        </a-form-item>
        <a-form-item :label-col="{span:4}" :wrapper-col="{span:18}" label="信息2">
          <a-input placeholder="请输入" />
        </a-form-item>
        <a-form-item :label-col="{span:4}" :wrapper-col="{span:18}" label="信息3">
          <a-select
            mode="multiple"
            placeholder="请选择"
            :defaultValue="['a1', 'b2']"
          >
            <a-select-option
              v-for="i in 25"
              :key="(i + 9).toString(36) + i"
            >{{(i + 9).toString(36) + i}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
export default {
  name: "tables",
  data() {
    return {
      advanced: false,
      data,
      columns,
      visible: false,
      loading: true,
      confirmLoading: false
    };
  },
  methods: {
    handleOk(e) {
      console.log(1);
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 500);
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
</style>