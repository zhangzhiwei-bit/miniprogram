// pages/community/community.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        comments:'',
    },
    handletap:function(){
        // var user=wx.getStorage("user");
        wx.getStorage({
            key:'user',
            success:(res)=>{
                wx.navigateTo({
                    url: '/pages/addcomment/addcomment',
                  })
            },
            fail:()=>{
                wx.showToast({
                  title: '请先登录',
                  icon:"error"
                })
            }
        })
       
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

    getLocalTime(nS) {  
      return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');  
     },
    changeObj(obj){
      for(let i=0;i<obj.length;i++){
        console.log(this.getLocalTime(obj[i].time))
      }
    },

    onShow: function () {
        wx.request({
          url: 'https://www.zzwwork.xyz:8081/getAllcomments',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: (res)=>{
            // console.log(res.data[0].imageurls)
            // let datacom=JSON.parse(res.data)
            // console.log(datacom)
            var datas=res.data;
            for(let i=0;i<datas.length;i++){
              datas[i].time=this.getLocalTime(datas[i].time);
              if(datas[i].imageurls){
                datas[i].imageurls=datas[i].imageurls.replace('[','').replace(']','').replaceAll('"','').split(',')
                for(let j=0;j<datas[i].imageurls.length;j++){
                  datas[i].imageurls[j]='https://www.zzwwork.xyz:8081/'+datas[i].imageurls[j]
                }
              }
            }
            this.setData({comments:datas})
          }
        })
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