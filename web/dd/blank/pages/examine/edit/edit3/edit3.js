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
      title: '复审-分配编导',
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
  getExecutiveDirector() {
    // msg, url, method, data
    var data = {
      Type: 'GetExecutiveDirector',
      Start_Time: this.data.views.Start_Time,
      End_Time: this.data.views.End_Time,
      Group_Id: this.data.views.Processing_Director_Group_Id
    }
    httpUtil.httpReq('加载中...', '/Order/Handler/order_save.ashx', 'post', data).then((res) => {
      let resData = res.data;
      if (resData.code == 0) {
        let list = JSON.parse(resData.data);
        let arr = [];
        list.forEach(v => {
          arr.push(v.name);
        })
        dd.showActionSheet({
          title: '选择编导',
          items: arr,
          cancelButtonText: '取消',
          success: (res) => {
            if (res.index != -1) {
              dd.confirm({
                title: '提示',
                content: `您选择编导为：${list[res.index].name}，确定提交吗？`,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                success: (result) => {
                  if (result.confirm) {
                    let data = {
                      Type: 'UpdateExecutive_director',
                      Executive_director_id: list[res.index].guid,//编导id
                      Guid: this.data.views.Guid,
                      TaskId: this.data.views.TaskId
                    }
                    this.updateExecutive_director(data)
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
  updateExecutive_director(data) {
    httpUtil.httpReq('提交中...', '/Order/Handler/order_save.ashx', 'post', data).then((res) => {
      let resData = res.data;
      if (resData.code == 0) {
        let data = JSON.parse(resData.data);
        dd.showToast({
          content: '操作成功',
          type: 'success',
          success: () => {
            dd.navigateBack({delta: 1});
          }
        })
      } else {
        dd.showToast({
          content: resData.message,
          type: 'fail',
          success: () => {
            dd.navigateBack({delta: 1});
          }
        })
      }

    })
  }
});
