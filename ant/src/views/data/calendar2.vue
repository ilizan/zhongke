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
      <h1 class="title">日历2</h1>
    </div>
    <div class="dataList">
      <!-- <div id='draggable-el' data-event='{ title: "my event", duration: "02:00" }'>drag me</div> -->
      <a-button @click="infoMol = true">添加事项</a-button>
      <hr />
      <div style="width:500px;">
        <FullCalendar
        @dateClick="handleDateClick"
        @select="selectDateClick"
        defaultView="dayGridMonth"
        :plugins="calendarPlugins"
        :locale="zhcnLocale"
        :events='fcEvents'
        selectable=true
        selectMirror=true
        unselectAuto=false
        unselectCancel="cla1"
        droppable=true
        :header="headers"
        />
      </div>
      <a-modal title="添加事项" :visible="infoMol" @ok="addData" @cancel="infoMol = false">
        <div>
          <a-form @submit="addData">
            <a-form-item label="事项" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-input v-model="matter.title" />
            </a-form-item>
            <a-form-item label="时间段" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-range-picker
                showTime
                format="YYYY/MM/DD HH:mm:ss"
                @change="onChange"
              />
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue"; //组件
import zhcnLocale from "@fullcalendar/core/locales/zh-cn"; //语言
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import listPlugin from "@fullcalendar/list";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import moment from "moment";
var demoEvents = [
  {
    title: "事项标题",
    start: "2019-07-24 15:00:00",
    end: "2019-07-25 21:00:00"
  }
];
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      matter: {
        title: "",
        start: "",
        end: ""
      },
      infoMol: false,
      fcEvents: demoEvents,
      headers: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
      },
      calendarPlugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
      zhcnLocale
    };
  },
  methods: {
    moment,
    onChange(dates, dateStrings) {
      this.matter.start = moment(dates[0]).format("YYYY-MM-DD HH:mm:ss");
      this.matter.end = moment(dates[1]).format("YYYY-MM-DD HH:mm:ss");
      this.fcEvents = this.fcEvents.concat(this.matter);
    },
    handleDateClick(arg) {
      // console.log(arg);
      var s = moment(arg.date).format("YYYY年MM月DD日");
      console.log(s);
      console.log("Clicked on: " + arg.dateStr);
      console.log(
        "Coordinates: " + arg.jsEvent.pageX + "," + arg.jsEvent.pageY
      );
      console.log("Current view: " + arg.view.type);
      // arg.dayEl.style.backgroundColor = "#ccc";
    },
    selectDateClick(info) {
      console.log(info);
      console.log("selected " + info.startStr + " to " + info.endStr);
      // var t = prompt(`请输入${info.startStr}-${info.endStr}的事项：`);
      // if (t) {
      //   console.log(t);
      // }
    },
    addData() {
      this.infoMol = false;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
@import "~@fullcalendar/list/main.css";
.cla1 {
  background-color: red;
}
</style>