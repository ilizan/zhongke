export default {
  getMonthList() {//月份列表，当前月份的上一个月+当前月份+当前月份的后两个月
    // let date_0 = new Date(new Date().setMonth(parseInt(new Date().getMonth()) - 1));
    // date_0 = date_0.getFullYear() + '/' + parseInt(date_0.getMonth() + 1);
    let y = '';
    let date_1 = new Date();
    y = parseInt(date_1.getMonth() + 1)
    if ((y + '').length == 1) {
      y = '0' + y
    }
    date_1 = date_1.getFullYear() + '/' + y;

    let date_2 = new Date(new Date().setMonth(parseInt(new Date().getMonth()) + 1));
    y = parseInt(date_2.getMonth() + 1)
    if ((y + '').length == 1) {
      y = '0' + y
    }
    date_2 = date_2.getFullYear() + '/' + y;

    let date_3 = new Date(new Date().setMonth(parseInt(new Date().getMonth()) + 2));
    y = parseInt(date_3.getMonth() + 1)
    if ((y + '').length == 1) {
      y = '0' + y
    }
    date_3 = date_3.getFullYear() + '/' + y;
    return [date_1, date_2, date_3];
  },
  dateFtt: function(date, fmt) { //author: meizz 
    date = new Date(date);
    var o = {
      "M+": date.getMonth() + 1,     //月份 
      "d+": date.getDate(),     //日 
      "h+": date.getHours(),     //小时 
      "m+": date.getMinutes(),     //分 
      "s+": date.getSeconds(),     //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds()    //毫秒 
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  dateFttDay: function(date) {
    date = new Date(date);
    return date.getDate();
  },
  getMyDay(date) {
    date = new Date(date);
    var week;
    if (date.getDay() == 0) week = ['', '', '', '', '', '']//周日
    if (date.getDay() == 1) week = []
    if (date.getDay() == 2) week = ['']
    if (date.getDay() == 3) week = ['', '']
    if (date.getDay() == 4) week = ['', '', '']
    if (date.getDay() == 5) week = ['', '', '', '']
    if (date.getDay() == 6) week = ['', '', '', '', '',]
    return week;
  },
  getStartDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' 12:00:00';
  },
  getEndDate(date) {
    date = new Date(date);
    date.setDate(date.getDate() + 1);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' 23:59:59';
  },
  getDateJudge(date) {
    let flag = true;
    let date0 = new Date(date)//选中日期
    let date1 = new Date();//当前日期
    date1 = date1.getFullYear() + '/' + parseInt(date1.getMonth() + 1) + '/' + date1.getDate() + ' 00:00:00';
    date1 = new Date(date1);
    if (date0 < date1) {
      flag = false;
    }
    return flag;
  }
}