<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <a-row>
      <a-col class="topMain" :span="24">
        <div class="top">
          <ul>
            <li class="hands">
              <a-dropdown>
                <span class="userTop">{{user.loginusername}}，欢迎您</span>
                <a-menu slot="overlay">
                  <a-menu-item @click="logOut()">退出</a-menu-item>
                </a-menu>
              </a-dropdown>
            </li>
          </ul>
        </div>
      </a-col>
      <a-col class="main" :span="24">
        <a-row>
          <a-col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4 }">
            <a-row>
              <div class="logoD">
                <img src="../assets/logo.png" alt />
              </div>
              <h2 class="main_title">品牌峰会住宿登记系统</h2>
              <a-form class="form_Main" @submit="handleSubmit">
                <a-form-item label="请扫码" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
                  <a-input ref="inputs" id="inputs" v-model="inputs" placeholder />
                </a-form-item>
              </a-form>
            </a-row>
            <a-row class="main_list">
              <a-list
                :locale="locale"
                class="aList"
                :grid="{ gutter: 20, column: 4 }"
                :dataSource="listData"
              >
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-card>
                    <a-card-meta>
                      <template slot="description">
                        <span class="userNames">{{item.Per_Name}}</span>
                        <br />
                        {{item.Reg_State==1?'已办理':'未办理'}}
                      </template>
                    </a-card-meta>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-row>
            <a-row style="float:right;">
              <a-button v-show="listData.length>0" type="primary" @click="dataTj()">提交</a-button>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-modal :closable="false" :maskClosable="false" title="扫码结果" width="80%" v-model="visible_0">
      <div>
        <a-table :pagination="false" rowKey="Guid" :columns="columns" :dataSource="tableData">
          <span slot="xh" slot-scope="text">{{text}}</span>
          <span slot="Reg_State" slot-scope="text,record">
            <a-tag v-if="text == 0">未办理</a-tag>
            <a-tag v-if="text == 1">已办理</a-tag>
            <span v-if="text == 1">{{record.Room_No}}</span>
          </span>
          <span slot="Change_Time" slot-scope="text">{{text}}</span>
          <span slot="isScan" slot-scope="text">
            <span v-if="text">已扫码</span>
            <span v-if="!text">未扫码</span>
          </span>
        </a-table>
      </div>
      <template slot="footer">
        <a-button key="back" @click="backModal0()">返回</a-button>
        <a-button v-if="qxbl" type="danger" @click="cancelWith()">取消住宿</a-button>
        <a-button v-if="bl" type="primary" @click="handle()">办理</a-button>
      </template>
    </a-modal>
    <a-modal :closable="false" title="办理成功" v-model="cg.vis">
      <div>房间号：{{cg.Room_NO}}</div>
      <div>
        <a-list class="aList" :grid="{ gutter: 10, column: 2 }" :dataSource="cg.info">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card>
              <a-card-meta>
                <template slot="description">
                  <span class="userNames">{{item}}</span>
                </template>
              </a-card-meta>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <template slot="footer">
        <a-button key="back" type="primary" @click="cg.vis = false">完成</a-button>
      </template>
    </a-modal>
    <a-modal :closable="false" title="房间取消成功" v-model="qx.vis">
      <div>房间号：{{qx.Room_NO}}</div>
      <div>
        <a-list class="aList" :grid="{ gutter: 10, column: 2 }" :dataSource="qx.info">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-card>
              <a-card-meta>
                <template slot="description">
                  <span class="userNames">{{item}}</span>
                </template>
              </a-card-meta>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <template slot="footer">
        <a-button key="back" type="primary" @click="qx.vis = false">完成</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import moment from "moment";
import { postRoomApi } from "../api/index";
import { getQueryVariable } from "../util/util";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
const locale = { emptyText: "请扫码" };
const listData = [
];
const columns = [
  {
    title: "序号",
    dataIndex: "xh",
    key: "Guid",
    scopedSlots: { customRender: "xh" }
  },
  {
    title: "姓名",
    dataIndex: "Per_Name"
  },
  {
    title: "住宿情况",
    dataIndex: "Reg_State",
    scopedSlots: { customRender: "Reg_State" }
  },
  {
    title: "最后办理时间",
    dataIndex: "Change_Time",
    scopedSlots: { customRender: "Change_Time" }
  },
  {
    title: "扫码情况",
    dataIndex: "isScan",
    scopedSlots: { customRender: "isScan" }
  }
];

const tableData = [];

export default {
  name: "home",
  data() {
    return {
      locale,
      inputs: "",
      listData,
      visible_0: false,
      columns,
      tableData,
      guidList: [],
      user: JSON.parse(Cookies.get("user")),
      cg: {
        vis: false,
        Room_NO: "",
        info: ""
      },
      qx: {
        vis: false,
        Room_NO: "",
        info: ""
      }
    };
  },
  computed: {
    qxbl: function() {
      var fl = false;
      if (this.tableData.length == 2) {
        if (
          this.tableData[0].Reg_State == 1 &&
          this.tableData[0].Reg_State == 1
        ) {
          fl = true;
        }
        if (this.tableData[0].Reg_State != this.tableData[1].Reg_State) {
          fl = false;
        }
        if(this.tableData[0].Room_No != this.tableData[1].Room_No){
          fl = false;
        }
      }
      if (this.tableData.length == 1) {
        if (this.tableData[0].Reg_State == 1) {
          fl = true;
        } else {
          fl = false;
        }
      }
      if(this.listData.length != this.tableData.length){
        fl = false
      }
      
      return fl;
    },
    bl: function() {
      var fl = true;
      if (this.tableData.length == 2) {
        if (
          this.tableData[0].Reg_State == 1 &&
          this.tableData[0].Reg_State == 1
        ) {
          fl = false;
        }
        if (this.tableData[0].Reg_State != this.tableData[1].Reg_State) {
          fl = false;
        }
      }
      if (this.tableData.length == 1) {
        if (this.tableData[0].Reg_State == 1) {
          fl = false;
        } else {
          fl = true;
        }
      }
      return fl;
    }
  },
  components: {
    // HelloWorld
  },
  methods: {
    logOut() {
      console.log("退出");
      this.$confirm({
        title: "提示",
        content: "您确定要退出吗?",
        okText: "退出",
        cancelText: "取消",
        onOk() {
          Cookies.remove("user");
          window.location.reload();
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      // this.inputs = getQueryVariable(this.inputs, "guid");

      if (this.guidList.indexOf(this.inputs) > -1) {
        this.$message.warning("已扫该码");
        this.$refs.inputs.focus();
        return;
      }
      if (this.guidList.length < 2) {
        this.guidList.push(this.inputs);
        var obj = { type: "GetUserList", GuidList: this.guidList.join(",") };
        var _this = this;
        postRoomApi(obj)
          .then(res => {
            console.log(res);
            if (res.code == 0) {
              _this.listData = JSON.parse(res.data);
              _this.listData.forEach((item, index) => {
                item.xh = index + 1;
                if (item.Change_Time) {
                  item.Change_Time = moment(new Date(item.Change_Time)).format(
                    "YYYY年MM月DD日 HH:mm:ss"
                  );
                } else {
                  item.Change_Time = "无";
                }
                item.isScan = true;
              });
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(res => {
            console.log(res);
            this.$message.error("请求失败");
          });
      } else {
        this.$message.warning("最多只能扫两次码");
        this.$refs.inputs.focus();
      }
      setTimeout(() => {
        this.inputs = "";
      }, 500);
    },
    dataTj() {
      console.log("提交");
      if (this.listData.length == 1) {
        //查询舍友
        if (this.listData[0].Reg_State == 1) {
          //已办理
          //查询舍友
          var _this = this;
          var obj = { type: "QueryUserList", GuidList: this.listData[0].Guid };
          postRoomApi(obj)
            .then(res => {
              _this.tableData = JSON.parse(res.data);
              _this.tableData.forEach((item, index) => {
                item.xh = index + 1;
                if (item.Change_Time) {
                  item.Change_Time = moment(new Date(item.Change_Time)).format(
                    "YYYY年MM月DD日 HH:mm:ss"
                  );
                } else {
                  item.Change_Time = "无";
                }
                item.isScan = true;
              });
              if(_this.tableData.length == 2){
                _this.tableData[1].isScan = false;
              }
            })
            .catch(() => {
              console.log(res);
              this.$message.error("请求失败");
            });
          this.tableData = this.listData;
        } else {
          this.tableData = this.listData;
        }
      } else {
        this.tableData = this.listData;
      }
      this.visible_0 = true;
    },
    hideModal0() {
      this.visible_0 = false;
    },
    backModal0() {
      this.listData = [];
      this.visible_0 = false;
      this.tableData = [];
      this.guidList = [];
      this.visible_0 = false;
    },
    cancelWith() {
      var _this = this;
      this.$confirm({
        title: "提示",
        content: "您确定取消该房间吗？",
        okText: "取消",
        cancelText: "返回",
        onOk() {
          var arr = [];
          var info = [];
          _this.listData.forEach((item, index) => {
            arr.push(item.Guid);
            info.push(item.Per_Name);
          });
          var obj = { type: "CancelHandle", GuidList: arr.join(",") };
          postRoomApi(obj)
            .then(res => {
              console.log(res);
              if (res.code == 0) {
                console.log("取消办理成功");
                _this.qx = {
                  vis: true,
                  info: info,
                  Room_NO: JSON.parse(res.data).Room_No
                };
                _this.$message.success("取消办理成功");
                _this.listData = [];
                _this.visible_0 = false;
                _this.tableData = [];
                _this.guidList = [];
              } else {
                _this.$message.error(res.message);
                console.log(res.message);
              }
            })
            .catch(() => {
              console.log(res);
              _this.$message.error("请求失败");
            });
        },
        onCancel() {}
      });
    },
    handle() {
      console.log("办理");
      var _this = this;
      this.$confirm({
        title: "提示",
        content: "您确定要办理吗？",
        okText: "办理",
        cancelText: "返回",
        onOk() {
          var arr = [];
          var info = [];
          _this.listData.forEach((item, index) => {
            arr.push(item.Guid);
            info.push(item.Per_Name);
          });
          var obj = { type: "SureHandle", GuidList: arr.join(",") };
          postRoomApi(obj)
            .then(res => {
              console.log(res);
              if (res.code == 0) {
                console.log("办理成功");
                _this.cg = {
                  vis: true,
                  info: info,
                  Room_NO: JSON.parse(res.data).Room_NO
                };
                _this.$message.success("办理成功");
                _this.listData = [];
                _this.visible_0 = false;
                _this.tableData = [];
                _this.guidList = [];
              } else {
                _this.$message.error(res.message);
                console.log(res.message);
              }
            })
            .catch(() => {
              console.log(res);
              _this.$message.error("请求失败");
            });
        },
        onCancel() {}
      });
    },
    save_onkeydown() {
      this.$refs.inputs.focus();
    }
  },
  mounted() {
    this.save_onkeydown();
    var _this = this;
    document.onkeydown = function(e) {
      let key = window.event.keyCode;
      if (key == 70) {
        window.event.preventDefault(); //关闭浏览器快捷键
        _this.save_onkeydown(); //;saveProject1()
      }
    };
  }
};
</script>
<style scoped lang="scss">
body * {
  // border: 1px solid red;
}
.logoD {
  padding-top: 100px;
  text-align: center;
}
.logoD img {
  height: 90px;
  margin: 0 auto;
}
.topMain {
  position: fixed;
  z-index: 10;
  background-color: #fff;
  .top {
    height: 50px;
    line-height: 50px;
    text-align: right;
    border-bottom: 1px solid #ccc;
    padding-right: 10px;
    .hands {
      cursor: pointer;
    }
    .userTop {
      display: inline-block;
      height: 50px;
      line-height: 50px;
    }
  }
}

.main {
  .iconTx {
    max-width: 200px;
    margin: 0 auto;
  }
  .main_title {
    padding: 10px 0 20px;
    text-align: center;
    font-size: 26px;
  }
  .main_list {
    min-height: 200px;
  }
}
.userNames {
  font-size: 24px;
}
</style>
