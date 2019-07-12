<template>
  <div class="user">
    <el-row>
      <el-col :span="24" :offset="0">
        <div class="pageToolbar">
          <el-form :inline="true" :size="GLOBAL.size" :model="formInline" class="demo-form-inline">
            <el-form-item label="xxx">
              <el-input v-model="formInline.user" placeholder="xxx"></el-input>
            </el-form-item>
            <el-form-item label="下拉">
              <el-select v-model="formInline.region" placeholder="下拉">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
              <el-button icon="el-icon-plus" type="primary" @click="addForm()">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" :size="GLOBAL.size" stripe style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
        <el-col :span="24" class="bottomPage">
          <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
        </el-col>
      </el-col>
    </el-row>
    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" :size="GLOBAL.size" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" :size="GLOBAL.size">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" :size="GLOBAL.size">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      form:{
        name:'',
        region: ''
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit");
    },
    addForm() {
      this.dialogVisible = true;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
* {
  //   border: 1px solid #ddd;
}
</style>