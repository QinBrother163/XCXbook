// pages/recharge/recharge.js
var util = require('../../utils/util.js');
Page({
  data: {
    flag: '',
    sex: '',
    fireBg: '',
    amount: '',
    cuxiao: [],
    topUpIntroduce: '充值后书币实时到账，如有其他问题请联系客服微信号：zhihao908，或拨打客服电话：181 4876 0795',
    workDate: '工作时间：周一到周五 9:00 - 21:00',
    productId: '',
    optionsVip: '',
    page_show:false,
  },
  // 充值类型选择
  setFlag: function (val) {
    this.setData({
      flag: val.currentTarget.dataset.num,
      productId: val.currentTarget.dataset.id,
    })
  },
  // 页面加载、获取用户余额
  onLoad: function (options) {
    
    if (options.vip) {
      this.setData({
        flag: 4,
        optionsVip: options.vip
      })
    } else {
      this.setData({
        flag: 1,
      })
    }
  },

  onShow: function () {
    util.showLoading();
    util.authorization();
    this.queryPageData();
    this.setData({
      sex: wx.getStorageSync('sex'),
    })
    if (wx.getStorageSync('sex') == 2) {
      this.setData({
        fireBg: '../../imgs/ico/novel-h5-hot@2x.png'
      })
    } else {
      this.setData({
        fireBg: '../../imgs/ico/hot@2x.png'
      })
    }
  },
  submit: function (e) {
    var that = this;
    // console.log(e.detail.formId);
    if (!this.data.productId) {
      if (this.data.optionsVip)
        this.data.productId = 1;
      else
        this.data.productId = 6;
    }
    console.log('焦点 : ' + that.data.productId);
    console.log('formId : ' + e.detail.formId);

    function showToast(title) {
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 1500
      })
    }

    wx.request({
      url: 'https://api.shenshuge.cn/index.php/index/Payfor/pay',
      data: {
        'fee': that.data.productId,
        'formId': e.detail.formId
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("openid")
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 1) {
          wx.requestPayment({
            'timeStamp': String(res.data.arr.timeStamp),
            'nonceStr': String(res.data.arr.nonceStr),
            'package': String(res.data.arr.package),
            'signType': 'MD5',
            'paySign': String(res.data.arr.paySign),
            'success': function (res) {
              console.log(res);
              
              showToast('支付成功!')
            },
            'fail': function (res) {
              console.log(res);
              
              showToast('支付失败!')
            },
            'complete': function (res) {
              console.log(res);
            }
          })
        }
      }
    })

  },

  // 请求后台、获取数据
  queryPageData: function () {
    var that = this;
    wx.request({
      url: 'https://api.shenshuge.cn/index.php/index/index/cuxiao',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("openid")
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code == 1) {
          that.setData({
            cuxiao: res.data.cuxiao,
            amount: res.data.money,
            page_show:true,
          })
        }
        wx.hideLoading();
      }
    })
  }
})
