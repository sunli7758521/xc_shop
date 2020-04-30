// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userName:''
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   *  key:"userinfo",
   */
  onLoad: function (options) {
    let that = this;
    // 取出缓存的数据
    wx.getStorage({
      key: 'userinfo',
      success (res) {
        console.log(res.data.userName)
        that.setData({
          userName:res.data.userName
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
  // 自助查询
  toSelect:function(e){
    console.log("111",111)
    wx.redirectTo({
      url: "/pages/select/select",
    })
  }, 
  // exit 退出
  exitBindtap :function(e){
    wx.removeStorage({
      key: 'userinfo',
      success (res) {
        // 打开modal 
        wx.showModal({
          cancelColor: 'red',
          content:"欢迎下次再来"
        })
        console.log(res)
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })
  }
 
})