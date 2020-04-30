// pages/login/login.js
const base = require("../../utils/base.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errinfo: '',
    username: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  },
  searchBox:function(e){
   console.log("===", )
    let that = this;
    wx.request({
      url: base.url+ '/login',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      success:function(res){
        console.log("====",res)
        if(res.data.status){
            wx.setStorage({
              key:"userinfo",
              data:res.data.obj
            })
            // 跳转tab 项
            wx.switchTab({
              url: '/pages/process/process',
            })
        }else{ 
          // 重定向跳转页面
          // wx.redirectTo({
          //   url: '/pages/login/login',
          // })
        }
        // 显示提示信息
        that.setData({
          errinfo: res.data.msg
        })
        
      }
      
    })
  }

})