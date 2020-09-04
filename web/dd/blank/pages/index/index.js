import httpUtil from '../../util/httpUtil'

Page({
  onLoad(query) {
    console.info('App onLaunch');
    dd.getAuthCode({
      success: function(res) {
        httpUtil.loginPost(res.authCode).then((res) => {
          if (res.data.code == 0) {
            dd.setStorage({
              key: 'user',
              data: {
                data: res.data.data,
                message: res.data.message
              }
            });
            dd.redirectTo({url:'/pages/examine/examine'})
          }
        })
      },
      fail: function(err) {
      }
    });
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '复审',
      desc: '',
      path: 'pages/index/index',
    };
  },
});
