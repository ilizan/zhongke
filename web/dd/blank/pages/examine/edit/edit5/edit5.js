import httpUtil from '../../../../util/httpUtil'
import dateFtt from '../../../../util/dateFtt'
Page({
  data: {
    guid: '',//guid
    views: {},//详细信息对象
    imageList: {
      Go_Img: '',//去程
      Return_Img: ''//返程
    }
  },
  onLoad(query) {
    dd.setNavigationBar({
      title: '复审-复审完成确认（摄像）',
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
  uploadImages0() {
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 1,
      success: res => {
        const path = (res.filePaths && res.filePaths[0]) || (res.apFilePaths && res.apFilePaths[0]);
        let formData = {
          Type: 'UploadTripImg',
          Attachment_Kind: 16,
          name: new Date().getTime() + '.jpg'
        }
        httpUtil.uploadFile('/Order/Handler/order_save.ashx', path, formData).then((res) => {
          let resData = res.data;
          resData = JSON.parse(resData);
          if (resData.code == 0) {
            this.setData({
              imageList: {
                Go_Img: resData.data,
                Return_Img: this.data.imageList.Return_Img
              }
            })
          }
        })
      },
    });
  },
  uploadImages1() {
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 1,
      success: res => {
        const path = (res.filePaths && res.filePaths[0]) || (res.apFilePaths && res.apFilePaths[0]);
        let formData = {
          Type: 'UploadTripImg',
          Attachment_Kind: 16,
          name: new Date().getTime() + '.jpg'
        }
        httpUtil.uploadFile('/Order/Handler/order_save.ashx', path, formData).then((res) => {
          let resData = res.data;
          resData = JSON.parse(resData);
          if (resData.code == 0) {
            this.setData({
              imageList: {
                Go_Img: this.data.imageList.Go_Img,
                Return_Img: resData.data
              }
            })
          }
        })
      },
    });
  },
  updateImg() {
    dd.confirm({
      title: '提示',
      content: `确定提交吗？`,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          let data = {
            Type: 'UpdateImg',
            Go_Img: this.data.imageList.Go_Img,
            Return_Img: this.data.imageList.Return_Img,
            Guid: this.data.views.Guid,
            TaskId: this.data.views.TaskId
          }
          this.updateImgFn(data)
        }
      },
    });
  },
  updateImgFn(data) {
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
        'http://dxt01.zgyxl.com:8992'+this.data.imageList.Go_Img
      ],
    });
  },
  previewImage1() {
    dd.previewImage({
      current: 0,
      urls: [
        'http://dxt01.zgyxl.com:8992'+this.data.imageList.Return_Img
      ],
    });
  },
});
