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
      <h2>日历</h2>
      <div>
        <FullCalendar
          @dateClick="handleDateClick"
          @select="selectDateClick"
          defaultView="dayGridMonth"
          :plugins="calendarPlugins"
          :locale="zhcnLocale"
          selectable="true"
          selectMirror="true"
          unselectAuto="false"
          unselectCancel="cla1"
          :header="headers"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";//组件
import zhcnLocale from "@fullcalendar/core/locales/zh-cn";//语言
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";



import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      headers:{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      calendarPlugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
      zhcnLocale
    };
  },
  methods: {
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
      console.log("selected " + info.startStr + " to " + info.endStr);
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