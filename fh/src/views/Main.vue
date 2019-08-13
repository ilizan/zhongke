<template>
  <div>
    <a-row>
      <a-col :xs="{ span: 24, offset: 0 }" :lg="{ span: 16, offset: 4 }">
        <div class="roomMain">
          <div class="logoD">
            <img src="../assets/logo.png" alt />
          </div>
          <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="温都水城标间" key="1">
              <div class="sx">
                <a-radio-group @change="onChange" v-model="sx">
                  <a-radio :style="radioStyle" :value="-1">所有房间</a-radio>
                  <a-radio :style="radioStyle" :value="0">可用房间</a-radio>
                  <a-radio :style="radioStyle" :value="1">已用房间</a-radio>
                </a-radio-group>
              </div>
              <a-table
                :pagination="false"
                rowKey="Room_NO"
                :locale="locale"
                :columns="columns"
                :dataSource="data"
              >
                <span slot="Room_state" slot-scope="text,record">
                  <a-tag color="#5cb85c" v-if="text == 0">可用</a-tag>
                  <a-tag color="#5bc0de" v-if="text == 1">已用</a-tag>
                  <a-tag color="#777" v-if="text == 2">锁定</a-tag>
                  <a-tag color="#d9534f" v-if="text == 4">停用</a-tag>
                </span>
              </a-table>
            </a-tab-pane>
            <a-tab-pane tab="花水湾酒店标间" key="2" forceRender>
              <div class="sx">
                <a-radio-group @change="onChange" v-model="sx">
                  <a-radio :style="radioStyle" :value="-1">所有房间</a-radio>
                  <a-radio :style="radioStyle" :value="0">可用房间</a-radio>
                  <a-radio :style="radioStyle" :value="1">已用房间</a-radio>
                </a-radio-group>
              </div>
              <a-table
                :pagination="false"
                rowKey="Room_NO"
                :locale="locale"
                :columns="columns"
                :dataSource="data"
              >
                <span slot="Room_state" slot-scope="text,record">
                  <a-tag color="#5cb85c" v-if="text == 0">可用</a-tag>
                  <a-tag color="#5bc0de" v-if="text == 1">已用</a-tag>
                  <a-tag color="#777" v-if="text == 2">锁定</a-tag>
                  <a-tag color="#d9534f" v-if="text == 4">停用</a-tag>
                </span>
                <span slot="UserName" slot-scope="text,record">
                  <span v-if="text">{{text}}</span>
                  <span v-if="!text">无</span>
                </span>
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const locale = { emptyText: "暂无数据" };
const columns = [
  {
    dataIndex: "Room_NO",
    key: "Room_NO",
    title: "房间号",
    scopedSlots: { customRender: "Room_NO" }
  },
  {
    dataIndex: "Room_state",
    title: "房间状态",
    scopedSlots: { customRender: "Room_state" }
  },
  {
    title: "住宿人员",
    dataIndex: "UserName",
    key: "UserName",
    scopedSlots: { customRender: "UserName" }
  },
  {
    title: "办理时间",
    dataIndex: "Change_Time",
    key: "Change_Time"
  }
];

const data = [];
import moment from "moment";
import { postRoomApi } from "../api/index";
export default {
  data() {
    return {
      data,
      columns,
      locale,
      ins: 1,
      sx: -1,
      radioStyle: {
        height: "30px",
        lineHeight: "30px"
      }
    };
  },
  methods: {
    initData() {
      var _this = this;
      var obj = { type: "GetAllUserList", RoomKingId: this.ins };
      postRoomApi(obj)
        .then(res => {
          if (res.code == 0) {
            _this.data = JSON.parse(res.data);
            _this.data.forEach(item => {
              if (item.Change_Time) {
                item.Change_Time = moment(new Date(item.Change_Time)).format(
                  "YYYY年MM月DD日 HH:mm:ss"
                );
              }
              if (item.Room_state != 1) {
                item.Change_Time = "无";
              }
            });
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
    callback(key) {
      this.ins = key;
      this.initData();
      this.sx = -1;
    },
    onChange(e) {
      var _this = this;
      var obj = { type: "GetAllUserList", RoomKingId: this.ins };
      postRoomApi(obj)
        .then(res => {
          if (res.code == 0) {
            _this.data = JSON.parse(res.data);
            _this.data.forEach(item => {
              if (item.Change_Time) {
                item.Change_Time = moment(new Date(item.Change_Time)).format(
                  "YYYY年MM月DD日 HH:mm:ss"
                );
              }
              if (item.Room_state != 1) {
                item.Change_Time = "无";
              }
            });

            _this.sx = e.target.value;
            if (_this.sx == 0 || _this.sx == 1) {
              var arr0 = _this.data;
              var arr = [];
              arr0.forEach(item => {
                if (item.Room_state == _this.sx) {
                  arr.push(item);
                }
              });
              _this.data = arr;
            }
          } else {
            _this.$message.error(res.message);
            console.log(res.message);
          }
        })
        .catch(() => {
          console.log(res);
          _this.$message.error("请求失败");
        });
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
.logoD {
  text-align: center;
  img {
    height: 90px;
    margin: 0 auto;
  }
}
.roomMain {
  margin: 0 auto;
  padding-top: 50px;
}
.sx {
  margin: 10px 0;
}
</style>