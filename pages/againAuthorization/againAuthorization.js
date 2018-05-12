// pages/againAuthorization/againAuthorization.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow: function () {
  },
  getUserInfo: function (e) {
    var that = this;
    util.showLoading();
    var pageUrl = wx.getStorageSync('forwardingUrl');
    wx.login({
      success: res => {
        var code = res.code;

        wx.getSetting({

          success(res) {

            if (pageUrl) {
              wx.reLaunch({
                url: pageUrl
              })
              wx.removeStorage({
                key: 'forwardingUrl',
              })
            } else {
              app.getUsers(code, e);

              // setTimeout(function () {
              // wx.setStorageSync('authorize', 1)
              // app.getUser(code);
              // }, 1200)
            }
            wx.hideLoading();
          }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})