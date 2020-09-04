import httpUtil from '../../../util/httpUtil'
import dateFtt from '../../../util/dateFtt'
Page({
  data: {
    guid: '',//guid
    views: {}//详细信息对象
  },
  onLoad(query) {
    this.data.guid = query.guid;
    // msg, url, method, data
    var data = { Type: 'GetRepeatedAudit', Guid: this.data.guid }
    httpUtil.httpReq('加载中...', '/Order/Handler/order_save.ashx', 'post', data).then((res) => {
      let resData = res.data;
      if (resData.code == 0) {
        let views = JSON.parse(resData.data);
        if (views.End_Time) {
          views.End_Time = dateFtt.dateFtt(views.End_Time, 'yyyy-MM-dd hh:mm');
        }
        if (views.Start_Time) {
          views.Start_Time = dateFtt.dateFtt(views.Start_Time, 'yyyy-MM-dd hh:mm');
        }
        this.setData({
          views: views
        })
      } else {

      }
    })

  },
  previewImage0() {
    dd.previewImage({
      current: 0,
      urls: [
        'http://dxt01.zgyxl.com:8992' + this.data.views.Go_Img
      ],
    });
  },
  previewImage1() {
    dd.previewImage({
      current: 0,
      urls: [
        'http://dxt01.zgyxl.com:8992' + this.data.views.Return_Img
      ],
    });
  },
});
