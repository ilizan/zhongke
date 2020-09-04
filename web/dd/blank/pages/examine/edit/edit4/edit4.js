import httpUtil from '../../../../util/httpUtil'
import dateFtt from '../../../../util/dateFtt'
Page({
  data: {
    guid: '',//guid
    views: {},//详细信息对象
    tripInfo: '',
  },
  onLoad(query) {
    dd.setNavigationBar({
      title: '复审-复审信息确认',
    })
    this.data.guid = query.guid;
    // msg, url, method, data
    var data = { Type: 'GetRepeatedAudit', Guid: this.data.guid }
    httpUtil.httpReq('加载中...', '/Order/Handler/order_save.ashx', 'post', data).then((res) => {
      let resData = res.data;
      if (resData.code == 0) {
        let views = JSON.parse(resData.data);
        if (views.Start_Time) {
          views.Start_Time = dateFtt.dateFtt(views.Start_Time, 'yyyy-MM-dd hh:mm');
        }
        if (views.End_Time) {
          views.End_Time = dateFtt.dateFtt(views.End_Time, 'yyyy-MM-dd hh:mm');
        }
        this.setData({
          views: views
        })
      } else {

      }
    })

  },
  onInput: function(e) {
    this.setData({ tripInfo: e.detail.value });
  },
  updateTrip(e) {
    let tripInfo = this.data.tripInfo;
    if (!tripInfo) {
      dd.alert({ content: `输入行程备注后才能提交`, buttonText: '好的' });
      return;
    }
    dd.confirm({
      title: '提示',
      content: `您输入的行程备注为：${tripInfo}，确定提交吗？`,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          let data = {
            Type: 'UpdateTrip',
            Trip: tripInfo,//编导id
            Guid: this.data.views.Guid,
            TaskId: this.data.views.TaskId
          }
          this.updateTripFn(data)
        }
      },
    });
  },
  updateTripFn(data) {
    httpUtil.httpReq('提交中...', '/Order/Handler/order_save.ashx', 'post', data).then((res) => {
      let resData = res.data;
      if (resData.code == 0) {
        let data = JSON.parse(resData.data);
        dd.showToast({
          content: '操作成功',
          type: 'success',
          success: () => {
            dd.navigateBack({ delta: 1 });
          }
        })
      } else {
        dd.showToast({
          content: resData.message,
          type: 'fail',
          success: () => {
            dd.navigateBack({ delta: 1 });
          }
        })
      }

    })
  }
});
