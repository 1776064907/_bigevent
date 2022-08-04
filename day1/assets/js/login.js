$(function () {
    // 点击 去注册页面 
    $('#go-reg a').on('click', function () {
        $('#go-reg').hide();
        $('.reg-box').show();
    })
    // 点击 去登录页面
    $('#go-login a').on('click', function () {
        $('#go-login').hide();
        $('.login-box').show();
    })

    // layui自定义表单验证
    const form = layui.form
    const layer = layui.layer
    form.verify({
        paw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        // 验证两次输入密码是否一致
        reppaw: function (value) {
            // value 是 input标签里的值
            const $pw = $('#go-login [name=password]').val();
            if ($pw !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单提交事件
    $('#form-reg').on('submit', function (e) {
        // 阻止提交默认刷新
        e.preventDefault();
        // 发起ajax请求
        $.post('/api/reguser', {
            username: $('#form-reg [name=title]').val(),
            password: $('#form-reg [name=password]').val()
        }, (res) => {
            console.log(res)
            if (res.status === 1) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link-go-login a').trigger('click');
        })
    })

    // 监听登录表单提交事件
    $('#form-login').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: {
                username: $('#go-reg [name=title]').val(),
                password: $('#go-reg [name=password]').val()
            },
            success: (res) => {
                if (res.status === 1) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = 'http://127.0.0.1:5500/day1/index.html'
            }   
        })
    })
})