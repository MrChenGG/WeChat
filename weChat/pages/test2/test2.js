// pages/test2/test2.js

const APPid = 33393;
const APPsign = '5941da3ca07d4e598c4b37953d1da446';

const Applist = 'http://route.showapi.com/955-1';
const Appdetail = 'http://route.showapi.com/955-2';

Page({
  data:{
    storylist: [],
    storydetail: '',
    list: true,
    detail: false,
    pages: 1,
    allpage: 0,
    pageT: 1,
    allpageT: 0,
    nowId: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // 请求列表
    var that = this;
    wx.request({
      url: Applist,
      data: {
          type: 'yy',
          page: 1,
          showapi_sign: APPsign,
          showapi_appid: APPid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success(res){
          that.setData({
              //获取故事列表
              storylist: res.data.showapi_res_body.pagebean.contentlist,
              allpage: res.data.showapi_res_body.pagebean.allPages
          })
          console.log(res.data.showapi_res_body.pagebean.allPages);
      }
    })
  },
  //点击故事
checkstory:function(e){
    this.setData({
      list: false,
      detail: true,
      pageT: 1,
      nowId: e.target.dataset.id
    });
    var that = this;
    wx.request({
      url: Appdetail,
      data: {
        id: that.data.nowId,
        showapi_sign: APPsign,
        showapi_appid: APPid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success(res){
          console.log(res.data.showapi_res_body);
          that.setData({
          storydetail: res.data.showapi_res_body.text.replace(/shoye\_336\(\)\;/,""),
          allpageT: res.data.showapi_res_body.allPages
          })
      }
    });
  },
  onReachBottom(){
    console.log("到底了");
    //上拉到底请求新数据
    var that = this;
    //请求加载更多列表
    //如果故事列表页显示
    console.log("sss"+that.data.list)
    if(that.data.list){
      if(that.data.pages>=that.data.allpage){
          return;
      }
      ++that.data.pages;
      wx.request({
        url: Applist,
        data: {
            type: 'yy',
            page: that.data.pages,
            showapi_sign: APPsign,
            showapi_appid: APPid
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success(res){
          var old = that.data.storylist;
          var now = res.data.showapi_res_body.pagebean.contentlist;
            that.setData({
                //获取故事列表
                storylist: old.concat(now)
            })
        }
      })
    }
    //请求加载更多内容
    //如果故事详情页显示
    if(that.data.detail){
      if(that.data.pageT>=that.data.allpageT){
          return;
      }
      ++that.data.pageT;
      wx.request({
        url: Appdetail,
        data: {
          id: that.data.nowId,
          showapi_sign: APPsign,
          showapi_appid: APPid
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success(res){
            console.log(res.data.showapi_res_body);
            var old = that.data.storydetail;
            var now =  res.data.showapi_res_body.text
            that.setData({
            storydetail: old.concat(now),
            })
        }
      });
    }
  },
  //返回列表
  backlist:function(){
     this.setData({
        list: true,
        detail: false
      });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})