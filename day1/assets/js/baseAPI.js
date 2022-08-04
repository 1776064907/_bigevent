// 注意：每次调用$.get,$.post,$.ajax的时候
// 会先用到 ajaxprefilter这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function (options) {
    // option就是 jquery里ajax 的配置属性
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    
    // 统一为有访问权限的网页设置 headers 
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete= function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1.强制清除 localstorage里的token
            localStorage.removeItem('token')
            // 2.强制跳转到登录页面
            location.href = '/day1/login.html'
        }
    }
})