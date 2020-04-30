// pages/process/process.js
const base = require("../../utils/base.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectNameArray:[],
    projectNameDefut:'请选择',
    projectId:'',
    taskNameArray:[],
    taskNameDefut:'请选择',
    taskCode:'',
    taskId:'',
    winNoDefult:'请选择',
    winNoArray:[],
    winModelId:'',
    winNo:'',
    winXing:'',
    tempArray:[],
    teamDefult:'请选择',
    teamGroup: '',
    tempIndex:'',
    winModelId:'',
    winModelName:'',
    tableView: false,
    teamBind:false,
    team_m:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
    wx.request({
      url: base.url + '/getProject',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("===",res.data)
        that.setData({
          projectNameArray: res.data
        })
      },
      fail: function () {
        wx.redirectTo({
          url: '/pages/login/login',
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
  // 查询项目
  bindProject :function(e){
    let that =this;
    that.setData({
      //赋值到输入框的值
      
      projectNameDefut: that.data.projectNameArray[e.detail.value].projectName,
      projectId:that.data.projectNameArray[e.detail.value].projectId
    })
    // console.log("=111==",that.data.projectNameArray[e.detail.value].projectId)
    wx.request({
      url: base.url + '/getTask',
      data: {
        projectId:that.data.projectNameArray[e.detail.value].projectId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          taskNameArray: res.data,
          taskNameDefut:'请选择',
          taskCode:'',
          winNoDefult:'请选择',
          winXing:'',
          tableView: false,
          teamDefult:'请选择'
        })
      },
      fail: function () {
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })
  },
  // 查询作业单位
  bindTask:function(e){
    let that =this;
    that.setData({
       //重新赋值
       taskCode:'',
       winNoDefult:'请选择',
       tableView: false,
       teamDefult:'请选择',
       winXing:'',
      //赋值到输入框的值
      taskNameDefut: that.data.taskNameArray[e.detail.value].taskName,
      taskCode: that.data.taskNameArray[e.detail.value].taskCode,
      taskId:that.data.taskNameArray[e.detail.value].taskId
    })
    // 请求查询窗号
    wx.request({
      url: base.url + '/getWinNo',
      data: {
        'taskId': that.data.taskId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("win==",res.data)
        that.setData({
          winNoArray: res.data
        })
      }
    })
  },
    // 查询窗号
winNo:function(e){
  let that = this;
  that.setData({
    //赋值到输入框的值
    winNoDefult: that.data.winNoArray[e.detail.value].winNo,
    winXing:that.data.winNoArray[e.detail.value].winModelName,
    winNo:that.data.winNoArray[e.detail.value].winNo,
    teamDefult:'请选择',
    tableView: false,
    teamBind:true,
    team_m:true
  })
  wx.request({
    url: base.url + '/getWinModel',
    data: {
      'winNo':that.data.winNo,
      'taskId':that.data.taskId
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log("res==",res.data)
      that.setData({
        winModelId:res.data.winModelId,
        winModelName:res.data.winModelName,
      })
    }
  })

  wx.request({
    url: base.url + '/getTeamGroup',
    data: {
      'winModelId': that.data.winNoArray[e.detail.value].winModelId
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      console.log("===",res.data)
      let tempArray =res.data;
      let temp = []
      for(let i = 0 ; i < tempArray.length ; i ++){
        if(tempArray[i] == "1"){
          temp.push("下料")
        }
        if (tempArray[i] == '2') {
          temp.push("加工")
        }
        if (tempArray[i] == '3') {
          temp.push("组装")
        }
        if (tempArray[i] == '4') {
          temp.push("五金")
        }
        if (tempArray[i] == '5') {
          temp.push("打胶")
        }
        if (tempArray[i] == '6') {
          temp.push("百叶")
        }
        if (tempArray[i] == '7') {
          temp.push("验收")
        }
      }
      
      that.setData({
        tempArray: temp,
        tempIndex:res.data
      })
    }
  })
},
// 通过工序组查询剩余数量
teamBind:function(e){
  let that = this;
     //  获取索引
console.log("==grop==",that.data.tempIndex[e.detail.value])

console.log("====",that.data.tempArray[e.detail.value])
  that.setData({
    teamDefult:that.data.tempArray[e.detail.value],
    teamGroup: that.data.tempIndex[e.detail.value]
  })

  wx.request({
    url: base.url + '/getProcess',
      data: {
        'projectId': that.data.projectId,
        'winModelId': that.data.winModelId,
        'winNo': that.data.winNo,
        'teamGroup': that.data.teamGroup,
        'taskId': that.data.taskId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("111",res)
        that.setData({
          processArray: res.data,
          tableView:true
        })
      }
    })
},
doneInput: function(e) {
  let that = this
  
  if (that.data.projectId == "") {
    that.setData({
      errInfoTable: "请选择项目"
    })
    return;
  }

  if (that.data.taskId == "") {
    that.setData({
      errInfoTable: '请选择作业单'
    })
    return;
  }

  if (that.data.winNo == "") {
    that.setData({
      errInfoTable: '请选择窗号'
    })
    return;
  }

  if (that.data.teamGroup == "") {
    that.setData({
      errInfoTable: '请选择工序组'
    })
    return;
  }

  // if (that.data.reportTime == "") {
  //   that.setData({
  //     errInfo: '请选择上报日期'
  //   })
  //   return;
  // }
console.log("上报===",e.detail.value)
console.log("获取本行剩余数量===",e.currentTarget.dataset.leftneednum)
  if (parseInt(e.detail.value) > parseInt(e.currentTarget.dataset.leftneednum)) {
    that.setData({
      errInfoTable: '报工数量必须小于剩余需求量',
      inputValue: '',
    })
    return;
  } else if (!/^[1-9]\d*$/.test(e.detail.value)) {
    that.setData({
      errInfoTable: '报工数量只能是正整数且不为空',
      inputValue: '',
    })
    return;
  } 
  wx.getStorage({
    key: 'userinfo',
    success: function (reso) {
      wx.showModal({
        content: '是否上报当前工序',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: base.url + '/reportSave',
              data: {
                'taskId': that.data.taskId,
                'taskDetailId': e.currentTarget.dataset.taskdetailid,
                'projectId': that.data.projectId,
                'winModelId': that.data.winModelId,
                'processNormId': e.currentTarget.dataset.processnormid,
                'winNo': that.data.winNo,
                'teamGroup': that.data.teamGroup,
                'reportNum': e.detail.value,
                'createBy': reso.data.loginName,
                'processType': e.currentTarget.dataset.processtype, 
                'isMilestone': e.currentTarget.dataset.ismilestone,
                'milestoneClassify': e.currentTarget.dataset.milestoneclassify,
                'price': e.currentTarget.dataset.price,
                // 'reportTime': that.data.reportTime,
                'dealStatus': '2',
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res3) {
                if (res3.data.status) {
                  wx.showToast({
                    title: '上报成功',
                    icon: 'success',
                    duration: 2000
                  })
                  that.setData({
                    inputValue:'',
                    // tableView:false
                  })
                  // 重新请求获取数量保存到页面列
                  wx.request({
                    url: base.url + '/getProcess',
                    data: {
                      'projectId': that.data.projectId,
                      'winModelId': that.data.winModelId,
                      'winNo': that.data.winNo,
                      'teamGroup': that.data.teamGroup,
                      'taskId': that.data.taskId
                    },
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success(res) {
                      that.setData({
                        processArray: res.data,
                        tableView: true,
                        errInfoTable: e.currentTarget.dataset.processnormname + '上报' + e.detail.value +e.currentTarget.dataset.unit+",成功"
                      })
                    }
                  })
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
  })

}

})