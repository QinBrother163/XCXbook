//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.removeStorage({
      key: 'forwardingUrl',
    })



    wx.login({
      success: res1 => {
        // 获取用户设置信息
        // wx.getSetting({
        //   success(res2) {
        //     // 未授权=》获取授权
        //     if (!res2.authSetting['scope.userInfo']) {
        //       wx.authorize({
        //         scope: 'scope.userInfo',
        //         success() {
        //           wx.setStorageSync('authorize', 1)
        //           // 授权成功=》获取用户信息
        //           that.getUser(res1.code);
        //         },
        //         fail() {
        //           // 授权失败=》跳转到授权页
        //           wx.redirectTo({
        //             url: "/pages/againAuthorization/againAuthorization"
        //           })
        //         }
        //       })
        //     } else {
        //       wx.setStorageSync('authorize', 0)
        //       that.getUser(res1.code);
        //     }
        //   },
        // })
      }
    })


  },
  //   获取用户信息
  getUser: function (code) {
    var that = this;
    
    wx.getUserInfo({
      success: res1 => {
        // 请求后台，获取openid
        
        wx.request({
          url: 'https://api.shenshuge.cn/index.php/index/login/getUserInfo',
          data: {
            'code': code,
            'rawData': res1.userInfo,
            'signature': res1.signature,
          },
          success: res2 => {
            console.log(res2);
            // 登录成功=》缓存用户信息、跳转到首页
            if (res2.data.code == 1) {
              wx.setStorageSync('openid', res2.data.openid)
              wx.setStorageSync('user_id', res2.data.user_id)

              wx.setStorageSync('avatarUrl', res1.userInfo.avatarUrl);
              wx.setStorageSync('nickName', res1.userInfo.nickName);

              


              if (wx.getStorageSync('authorize')) {
                var sex = (res1.userInfo.gender == 2) ? 3 : 2;
                wx.setStorageSync('sex', sex);

                wx.reLaunch({
                  url: '/pages/index/index'
                })
              }


            } else {
              // 登录失败=》跳转授权页
              wx.redirectTo({
                url: "/pages/againAuthorization/againAuthorization"
              })
            }

          },
          fail: res2 => {
            // 请求失败=》提示用户
            wx.showToast({
              title: '请求失败',
              icon: 'none',
              duration: 1500
            })
          }
        })

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res)
        }
      }
    })
  },

  getUsers: function (code,e) {
   
    var that = this;
    wx.request({
      url: 'https://api.shenshuge.cn/index.php/index/login/getUserInfo',
      data: {
        'code': code,
        'rawData': e.detail.userInfo,
        'signature': e.detail.signature,
      },
      success: res2 => {
        // console.log(res2);
        // 登录成功=》缓存用户信息、跳转到首页
        if (res2.data.code == 1) {
          wx.setStorageSync('openid', res2.data.openid)
          wx.setStorageSync('user_id', res2.data.user_id)

          wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl);
          wx.setStorageSync('nickName', e.detail.userInfo.nickName);
          wx.setStorageSync('throughState', 1);

          var sex = (e.detail.userInfo.gender == 2) ? 3 : 2;
          wx.setStorageSync('sex', sex);
          wx.reLaunch({
            url: '/pages/index/index'
          })


        } else {

          // 登录失败=》跳转授权页
          // wx.redirectTo({
          //   url: "/pages/againAuthorization/againAuthorization"
          // })
        }
        wx.hideLoading();
      },
      fail: res2 => {
        // 请求失败=》提示用户
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})

