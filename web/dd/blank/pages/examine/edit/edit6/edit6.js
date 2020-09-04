import httpUtil from '../../../../util/httpUtil'
import dateFtt from '../../../../util/dateFtt'
Page({
  data: {
    guid: '',//guid
    views: {},//详细信息对象
    items: [
      { name: '成功', value: 8 },
      { name: '失败', value: 9 }
    ],
    selectItem: {}
  },
  onLoad(query) {
    dd.setNavigationBar({
      title: '复审-复审完成确认（制片）',
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
      }
    })
  },
  radioChange: function(e) {
    console.log('你选择的是：', e.detail)
    this.setData({
      selectItem: e.detail.value
    })
  },
  resultConfirmation() {
    dd.confirm({
      title: '提示',
      content: `您的选择是${this.data.selectItem.name}，确定提交吗？`,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          let data = {
            Type: 'ResultConfirmation',
            ResultConfirmation: this.data.selectItem.value,
            Guid: this.data.views.Guid,
            TaskId: this.data.views.TaskId
          }
          this.resultConfirmationFn(data)
        }
      },
    });
  },
  resultConfirmationFn(data) {
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
  },
  previewImage0() {
    dd.previewImage({
      current: 0,
      urls: [
        'http://dxt01.zgyxl.com:8992'+this.data.views.Go_Img
      ],
    });
  },
  previewImage1() {
    dd.previewImage({
      current: 0,
      urls: [
        'http://dxt01.zgyxl.com:8992'+this.data.views.Return_Img
      ],
    });
  },
});