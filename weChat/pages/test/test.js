

Page({
    data:{
        now: 1,
        song: [{"singername":"张碧晨","songname":"时间有泪 (Live)"},{"singername":"张杰","songname":"突然想爱你 (Live)"},
        {"singername":"李健","songname":"异乡人 (Live)"}],
        navimg : [],
        dataT: [],
        dataH: [],
        ntdata: []
    },
    onLoad: function () {
        var that = this;
        wx.request({
          url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1664367474&uin=616766349&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1489044594175',
          success: function(res){

            
            // success
             that.setData({
               navimg: res.data.data.slider,
               dataT: res.data.data.radioList,
               dataH: res.data.data.songList
             })
          },
          fail: function(err) {
            console.log(new Error(err));
          },
          complete: function(res) {
            console.log("请求完成");
          }
        });
        wx.request({
          url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?format=json&g_tk=1664367474&uin=616766349&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1489063672594',
          success: function(res){
            // success
             that.setData({
                ntdata: res.data.data.topList
             })
          },
          fail: function(err) {
            console.log(new Error(err));
          },
          complete: function(res) {
            console.log("请求完成");
          }
        });
  },
   buttonClick(e){
        this.setData({
            now: e.target.dataset.index,
        });
    }
})