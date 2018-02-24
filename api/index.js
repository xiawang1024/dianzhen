//api
const newsBaseUrl = "https://mp.weixin.hndt.com/api"
const appId = 'wx08ec90eff9fd1d36'
/**
 * 提交用户信息
 */
const postUserInfo = (code, iv, encryptedData) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: newsBaseUrl + '/miniprogram/index',
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      data:{
        appId,
        code,
        iv,
        encryptedData
      },
      method:'GET',
      success: (res) => {
        resolve(res.data)
      }
    })
  })
}


module.exports = {
  postUserInfo
}