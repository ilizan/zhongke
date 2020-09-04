let httpUrl = 'http://dxt01.zgyxl.com:8992';
export default {
  loginPost: function(code) {
    return new Promise(function(resolve, reject) {
      dd.showLoading({
        content: '登陆中...'
      });
      dd.httpRequest({
        url: httpUrl + '/Order/Ding_Form/DingFormHandler.ashx',
        method: 'POST',
        data: {
          code: code,
          type: "GetUserdata"
        },
        dataType: 'json',
        success: function(res) {
          dd.hideLoading();
          if (res.status == 200) {
            resolve(res)
          } else {
            reject(res);
          }
        },
        fail: function(res) {
          dd.hideLoading();
          reject();
        }
      });
    }).catch(function(res) {
      dd.hideLoading();

      reject()
    })
  },
  httpReq: function(msg, url, method, data) {
    let userId = JSON.parse(dd.getStorageSync({ key: 'user' }).data.data).userid;
    // userId = 181018+'';
    return new Promise(function(resolve, reject) {
      dd.showLoading({
        content: msg
      });
      let _dd = dd;
      dd.httpRequest({
        headers: {
          "UserId": userId
        },
        url: httpUrl + url,
        method: method,//'POST',
        data: data,
        dataType: 'json',
        success: function(res) {
            _dd.hideLoading();
          if (res.status == 200) {
            resolve(res)
          } else {
            reject(res);
          }
        },
        fail: function(res) {
          dd.hideLoading();
          reject();
        }
      });
    }).catch(function(res) {
      dd.hideLoading();
      reject()
    })
  },
  uploadFile: function(url, path, formData) {
    let userId = JSON.parse(dd.getStorageSync({ key: 'user' }).data.data).userid;
    // userId = 181018+'';
    return new Promise(function(resolve, reject) {
      dd.showLoading({
        content: '上传中'
      });
      dd.uploadFile({
        headers: {
          "UserId": userId
        },
        url: httpUrl + url,
        fileType: 'image',
        fileName: formData.name,
        filePath: path,
        formData: formData,
        success: res => {
          dd.hideLoading()
          // dd.alert({ title: `上传成功：${JSON.stringify(res)}` });
          resolve(res)
        },
        fail: function(res) {
          dd.hideLoading()
          // dd.alert({ title: `上传失败：${JSON.stringify(res)}` });
          reject(res);
        },
      });
    }).catch(function(res) {
      dd.hideLoading()
      reject()
    })
  },

}