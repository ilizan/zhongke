import httpUtil from '../../util/httpUtil'
import dateFtt from '../../util/dateFtt'
Page({
  data: {
    isSelDate: false,//日历遮罩层
    thisSelTask: {},//当前操作的项
    arr: [],//复审列表
    selMonth: '',//当前显示的日历月份
    monthList: [],//切换日历
    fsDateList: [],//日历遍历的日期[1,2,3,...31]
    weekList: ['一', '二', '三', '四', '五', '六', '日'],//日历上显示的星期
    searchValue: '',
    page: 1,
    db: false
  },
  onLoad() {
    // this.pageInit();
  },
  onShow() {
    this.setData({
      searchValue: '',
      page: 1,
      arr: []
    })
    this.pageInit();
    this.data.monthList = dateFtt.getMonthList();
    this.data.selMonth = this.data.monthList[0];
  },
  pageInit() {
    // msg, url, method, data
    var data = { Type: 'GetRepeatedAuditList', SearchValue: this.data.searchValue, Page: this.data.page }
    httpUtil.httpReq('加载中...', '/Order/Handler/order_save.ashx', 'post', data).then((res) => {
      let resData = res.data;
      if (resData.code == 0) {
        let param = resData.data;
        param = JSON.parse(param);
        param.forEach(v => {
          v.isShow = true
        });
        this.setData({
          arr: this.data.arr.concat(param)
        });
        if (param.length == 0 && this.data.db && this.data.arr.length != 0) {
          dd.showToast({
            type: 'success',
            content: '已滚动到底部',
            duration: 1000
          });
        }
      } else {
        dd.showToast({
          content: resData.message,
          type: 'fail'
        })
      }
    })
  },
  bindHandleShow(e) {
    // let id = e.currentTarget.dataset.show.Id;
    // let arr = this.data.arr;
    // arr.forEach(v => {
    //   if (id == v.Id) {
    //     v.isShow = !v.isShow;
    //   }
    // })
    // this.setData({
    //   arr: arr
    // })
  },
  selDate(e) {
    this.setData({
      isSelDate: true,
      fsDateList: [],
      thisSelTask: e.currentTarget.dataset.thisSelTask,
      selMonth: this.data.monthList[0]
    });
    this.selectMoFn();
  },
  selectMoFn() {
    // msg, url, method, data
    var data = { Type: 'IsAboutDate', Date: this.data.selMonth }
    var _this = this;
    httpUtil.httpReq('加载中...', '/Order/Handler/order_save.ashx', 'post', data).then((res) => {
      let resData = (res.data);
      if (resData.code == 0) {
        let param = resData.data;
        param = JSON.parse(param);
        param.forEach(v => {
          v.Day = dateFtt.dateFttDay(v.Date)
        })
        let arr = dateFtt.getMyDay(this.data.selMonth + '/1');
        _this.setData({
          fsDateList: arr.concat(param)
        });
      } else {
        dd.alert({ content: '2' })
        dd.showToast({
          content: resData.message,
          type: 'fail'
        })
      }
    })
  },
  selDateHide(e) {
    this.setData({
      isSelDate: false
    })
  },
  selMonthList() {
    dd.showActionSheet({
      title: '选择月份',
      items: this.data.monthList,
      cancelButtonText: '取消',
      success: (res) => {
        if (res.index != -1) {
          this.setData({
            selMonth: this.data.monthList[res.index]
          })
          this.selectMoFn();
        }
      },
    });

  },
  dateSubmit(e) {
    let selDate = e.currentTarget.dataset.date;
    if (!selDate) {
      return;
    }
    if (selDate.Surplus == 0) {
      dd.alert({ content: `您选择的日期不可以预定`, buttonText: '好的' });
      return;
    }
    let date = e.currentTarget.dataset.date.Date//选择的复审日期
    let start_Time = dateFtt.getStartDate(date)
    let end_Time = dateFtt.getEndDate(date)

    if (!dateFtt.getDateJudge(date)) {
      dd.alert({ content: `不能预定当日之前的日期`, buttonText: '好的' });
      return;
    }
    dd.confirm({
      title: '提示',
      content: `您选择日期为：${start_Time}-${end_Time}`,
      confirmButtonText: '确定提交复审',
      cancelButtonText: '取消',
      success: (result) => {
        if (result.confirm) {
          let data = {
            Type: 'SubReserve',
            Start_Time: start_Time,
            End_Time: end_Time,
            Guid: this.data.thisSelTask.Guid,
            TaskId: this.data.thisSelTask.TaskId
          }
          this.dateSubmitFn(data)
        }
      },
    });
  },
  dateSubmitFn(data) {
    httpUtil.httpReq('提交中...', '/Order/Handler/order_save.ashx', 'post', data).then((res) => {
      let resData = res.data;
      if (resData.code == 0) {
        dd.showToast({
          type: 'success',
          content: '提交成功',
          duration: 2000,
          success: () => {
            this.setData({
              isSelDate: false,
              page: 1,
              arr: []
            });
            this.pageInit();
          },
        });
      } else {
        dd.alert({
          content: resData.message,
          buttonText: '我知道了',
          success: () => {
            this.setData({
              isSelDate: false
            })
          },
        });
      }
    })
  },
  bindKeyInput(e) {
    this.setData({
      searchValue: e.detail.value,
    });
  },
  onReachBottom() {
    // 页面被拉到底部
    this.setData({
      db: true,
      page: this.data.page + 1
    });
    this.pageInit();
  },
  searchBtn() {
    this.setData({
      db: false,
      page: 1,
      arr: []
    });
    this.pageInit();
  }
});
