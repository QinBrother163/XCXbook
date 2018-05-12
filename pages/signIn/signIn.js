// pages/signIn/signIn.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  getUserInfo: function (e) {
    util.showLoading();
    var that = this;
    console.log(e)
    // console.log('userInfo  :' + e.detail.userInfo)
    // console.log('signature  :' + e.detail.signature)

    wx.login({
      success: res => {
        var code = res.code;
        wx.getSetting({

          success(res) {

            // setTimeout(function () {
            //   wx.hideLoading();
            //   wx.setStorageSync('authorize', 1)
            //   app.getUser(code);
            // }, 1200)
            app.getUsers(code, e);
          }
        })

      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})