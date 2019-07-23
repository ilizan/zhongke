<template>
  <div class="pages bgMain">
    <div class="topTool">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href>列表</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>日历</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="title">日历</h1>
    </div>
    <div class="dataList">
      <h3>
        你选中的日期：{{sa2}}
        <template v-if="infos.length>0">
          ，事项：
          <a-tag v-for="item in infos" :key="item.id">{{ item.content }}</a-tag>
        </template>
      </h3>
      <a-calendar :value="defaultValues" @select="onSelect" @panelChange="onPanelChange">
        <p class="events" slot="dateCellRender" slot-scope="value">
          <span v-for="item in getListData(value)" :key="item.content">
            {{item.content}}
            <br />
          </span>
        </p>
      </a-calendar>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "calendar",
  data() {
    return {
      sa: "",
      sa2: "",
      defaultValues: moment(),
      infos: [],
      dataList: [
        {
          time: "2019-07-05",
          info: "fljksda"
        },
        {
          time: "2019-07-15",
          info: "fljksdaf55"
        },
        {
          time: "2019-07-18",
          info: "fljksdafsd"
        },
        {
          time: "2019-07-18",
          info: "22"
        }
      ]
    };
  },
  methods: {
    getListData(value) {
      let listData = [];
      //   console.log(moment(value).format('YYYY-MM-DD'))
      //   switch (value.date()) {
      //     case 8:
      //       listData = [
      //         { type: "warning", content: "This is warning event." },
      //         { type: "success", content: "This is usual event." }
      //       ];
      //       break;
      //     default:
      //   }
      this.dataList.forEach(item => {
        if (moment(value).format("YYYY-MM-DD") === item.time) {
          listData.push({
            type: "success",
            content: item.info
          });
        }
      });
      return listData || [];
    },
    onSelect(date) {
      this.sa2 = moment(date).format("YYYY年MM月DD日");
      this.infos = [];
      this.dataList.forEach(item => {
        if (moment(date).format("YYYY-MM-DD") === item.time) {
          this.infos.push({
            id: this.infos.length,
            content: item.info
          });
        }
      });
      // var s = moment("20111031", "YYYYMMDD").fromNow();
      // console.log(s)
    },
    onPanelChange(value, mode) {
      console.log(value, mode);
    },
    getDateDay() {
      let thisDate = new Date();
      let preDate = moment(new Date(thisDate.getTime() - 24 * 60 * 60 * 1000)).format('YYYY-MM-DD');
      this.defaultValues = moment(preDate);
    }
  },
  mounted() {
    this.getDateDay();
  }
};
</script>

<style lang="scss" scoped>
</style>