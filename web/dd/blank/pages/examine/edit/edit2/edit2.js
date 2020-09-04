import httpUtil from '../../../../util/httpUtil'
import dateFtt from '../../../../util/dateFtt'
Page({
  data: {
    guid: '',//guid
    views: {},//详细信息对象
    edits: {},
  },
  onLoad(query) {
    dd.setNavigationBar({
      title: '复审-分配编导组',
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
  getDirector_Group() {
    // msg, url, method, data
    var data = {
      Type: 'GetDirector_Group'
    }
    httpUtil.httpReq('提交中...', '/Order/Handler/order_save.ashx', 'post', data).then((res) => {
      let resData = res.data;
      if (resData.code == 0) {
        let list = JSON.parse(resData.data);
        let arr = [];
        list.forEach(v => {
          arr.push(v.Group_Name);
        })
        dd.showActionSheet({
          title: '选择编导组',
          items: arr,
          cancelButtonText: '取消',
          success: (res) => {
            if (res.index != -1) {
              dd.confirm({
                title: '提示',
                content: `您选择编导组为：${list[res.index].Group_Name}，确定提交吗？`,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                success: (result) => {
                  if (result.confirm) {
                    let data = {
                      Type: 'UpdateGroup_Id',
                      Group_Id: list[res.index].Id,//编导组id
                      Guid: this.data.views.Guid,
                      TaskId: this.data.views.TaskId
                    }
                    this.updateGroup_Id(data)
                  }
                },
              });
            }
          },
        });
      } else {
        dd.alert({ content: resData.message })
      }
    })
  },
  updateGroup_Id(data) {
    httpUtil.httpReq('加载中...', '/Order/Handler/order_save.ashx', 'post', data).then((res) => {
      let resData = res.data;
      if (resData.code == 0) {
        let data = JSON.parse(resData.data);
        dd.showToast({
          content: '操作成功',
          type: 'success',
          success: () => {
            dd.navigateBack({delta: 1});
            // dd.redirectTo({ url: '/pages/examine/examine' })
          }
        })
      } else {
        dd.showToast({
          content: resData.message,
          type: 'fail',
          success: () => {
            dd.navigateBack({delta: 1});
            // dd.redirectTo({ url: '/pages/examine/examine' })
          }
        })
      }

    })
  }
});
