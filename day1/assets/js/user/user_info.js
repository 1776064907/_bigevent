$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return '字符不能超过6个'
            }
        } 
    })

    initToUser();
    

 
function initToUser() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: (res) => {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            console.log(res)
            // 调用form.val()快速为表单赋值
            form.val('formUserInfo',res.data)
        }
     })
    }

    // 为表单重置按钮注册事件
    $('#btnReset').on('click', (e) => {
        // 取消重置默认行为
        e.preventDefault();
        // 重新调用initToUser函数，恢复初始状态
        initToUser();
    })


    // 为表单提交修改按钮注册事件
    $('.layui-form').on('submit',(e) => {
        // 取消表单默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data:$(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新信息成功');
                console.log(res)
                getuseInfo();
            }
            
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
})

