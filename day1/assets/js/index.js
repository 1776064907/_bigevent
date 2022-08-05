$(function () {
    getuseInfo()

    var layer = layui.layer
    // 为退出注册事件
    $('#btnLogout').on('click', function () {
        layer.confirm('is not?', { icon: 3, title: '提示' },
            function (index) {
                // console.log('ok')
            // 1.清空本地localstorage中的token
                localStorage.removeItem('token')
            // 2.返回登录页面
                location.href = '/day1/login.html'

            layer.close(index);
        });
    })


})


function getuseInfo() {
    $.ajax({
        method: 'GET',
        // 获取用户信息的节口
        url: '/my/userinfo',
        // 设置请求头  header
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: (res) => {
            // console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data);
        },
        // 不论成功还是失败，最终都会调用complete函数
        // complete回调函数中，可以使用res.responseJSOM属性拿到服务器响应回来的数据
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 1.强制清除 localstorage里的token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转到登录页面
        //         location.href = '/day1/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    // 获取用户的名字
    let name = user.nickname || user.username
    // 设置欢迎的文本
    $('.well').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic === null) {
        $('.layui-nav-img').hide();
        $('.user-touxian').show().html(name[0].toUpperCase())
    } else {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.user-touxian').hide()
    }
    }

   