<template>
  <div class="room">
    <a-row>
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
                        <!-- {{item.Reg_State==1?'已办理':'未办理'}} -->
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
            <a-tag color="#777 " v-if="text == 0">未办理</a-tag>
            <a-tag color="#5cb85c" v-if="text == 1">已办理</a-tag>
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
      <div class="roomNo">
        房间号：
        <span>{{cg.Room_NO}}</span>
      </div>
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
      <div class="roomNo">
        房间号：
        <span>{{qx.Room_NO}}</span>
      </div>
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
// import Cookies from "js-cookie";
import moment from "moment";
import { postRoomApi } from "../api/index";
import { getQueryVariable } from "../util/util";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
const locale = { emptyText: "请扫码" };
const listData = [];
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
  name: "room",
  data() {
    return {
      locale,
      inputs: "",
      listData,
      visible_0: false,
      columns,
      tableData,
      guidList: [],
      // user: JSON.parse(Cookies.get("user")),
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
        if (this.tableData[0].Room_No != this.tableData[1].Room_No) {
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
      if (this.listData.length != this.tableData.length) {
        fl = false;
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
    handleSubmit(e) {
      e.preventDefault();
      this.inputs = getQueryVariable(this.inputs, "guid");
      if (!this.inputs) {
        this.inputs = "";
        return;
      }
      if (this.guidList.indexOf(this.inputs) > -1) {
        this.$message.warning("已扫该码");
        this.inputs = "";
        this.$refs.inputs.focus();
        return;
      }
      if (this.guidList.length < 2) {
        this.guidList.push(this.inputs);
        var obj = { type: "GetUserList", GuidList: this.guidList.join(",") };
        var _this = this;
        postRoomApi(obj)
          .then(res => {
            if (res.code == 0) {
              _this.listData = JSON.parse(res.data);
              if (_this.listData.length != _this.guidList.length) {
                _this.$message.warning("此人无住宿信息");
              }
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
              if (_this.listData.length == 2) {
                setTimeout(() => {
                  _this.dataTj();
                }, 300);
              }
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
              if (_this.tableData.length == 2) {
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
        okType: "danger",
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
    blFn() {
      var arr = [];
      var info = [];
      var _this = this;
      _this.listData.forEach((item, index) => {
        arr.push(item.Guid);
        info.push(item.Per_Name);
      });
      var obj = { type: "SureHandle", GuidList: arr.join(",") };
      postRoomApi(obj)
        .then(res => {
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
            var LODOP = getLodop();
            LODOP.SET_LICENSES(
              "",
              "12AC6D772841C6D2DFF9968959673C41",
              "C94CEE276DB2187AE6B65D56B3FC2848",
              ""
            );
            LODOP.PRINT_INIT("住宿凭证打印"); //首先一个初始化语句
            LODOP.SET_PRINT_PAGESIZE(0, 500, 300, ""); //设定纸张大小\
            LODOP.ADD_PRINT_TEXT(20, 23, 170, 20, "中国行业影响力品牌峰会");
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 8);
            LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
            LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
            LODOP.ADD_PRINT_TEXT(46, 22, 60, 25, "房间号：");
            LODOP.ADD_PRINT_TEXT(40, 74, 100, 25, _this.cg.Room_NO);
            LODOP.SET_PRINT_STYLEA(0, "FontSize", 18);
            LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
            LODOP.ADD_PRINT_TEXT(70, 22, 60, 25, "姓  名：");
            LODOP.ADD_PRINT_TEXT(71, 74, 100, 25, _this.cg.info);

            LODOP.PRINT(); //最后一个打印(或预览、维护、设计)语句
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
    handle() {
      console.log("办理");
      if (this.tableData.length == 1) {
        var _this = this;
        this.$confirm({
          title: "提示",
          content: "该房间只办理当前一人，您确定要办理吗？",
          okText: "办理",
          cancelText: "返回",
          onOk() {
            _this.blFn();
          },
          onCancel() {}
        });
      } else {
        this.blFn();
      }
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

      if (
        _this.visible_0 &&
        _this.bl &&
        key == 13 &&
        _this.tableData.length == 2
      ) {
        _this.handle();
      } else if (_this.cg.vis && key == 13) {
        _this.cg.vis = false;
      } else {
        // if (key == 70) {
        // window.event.preventDefault(); //关闭浏览器快捷键
        // _this.save_onkeydown(); //;saveProject1()
        // }
      }
    };
  }
};
</script>
<style scoped lang="scss">
.logoD {
  padding-top: 50px;
  text-align: center;
  img {
    height: 90px;
    margin: 0 auto;
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
.roomNo {
  font-size: 25px;
  span {
    color: red;
  }
}
</style>
