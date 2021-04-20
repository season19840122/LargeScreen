const config = { baseURL: 'api.xxx.com' }
// params: url(请求路径), type(请求类型), data(post参数), isNeedToken(是否需要token), success(成功回调), error(失败回调), finally(不论成功失败都执行的回调)
const request = function(params) {
  $.ajax({
    url: config.baseURL + params.url,
    type: params.type || 'get',
    data: params.data,
    // Content-Type: 'application/json',
    // data: JSON.stringify(params.data)
    // 添加请求头
    beforeSend: function(request) {
      var isNeedToken = params.isNeedToken === undefined //isNeedToken 默认值为 true
      if (!isNeedToken) {
        return
      }
      var access_token = localStorage.getItem('access_token')
      if (access_token) {
        request.setRequestHeader('Authorization', 'Bearer ' + access_token)
      }
    },
    // 成功回调
    success: function(res) {
      if (res.State && parseInt(res.RespCode) === 200) {
        params.success && params.success(res)
      } else {
        const errMsg = res.Message ? res.Message : '请求失败'
        console.error(res.Message)
        params.error && params.error(new Error(errMsg))
      }
      params.finally && params.finally()
    },
    // 失败回调
    error: function(err) {
      if (err.status === 401) {
        //重新登录
        window.location.replace('/login')
        return
      }
      const errMsg = err.responseJSON ? err.responseJSON.Message : '请求失败'
      console.error(errMsg)
      params.error && params.error(new Error(errMsg))
      params.finally && params.finally()
    },
  })
}
