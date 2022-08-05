$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        oldPwd:[
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ] ,
        samePwd: function (val) {
            if (val === $('[name=oldPwd]').val()) {
                return '不能使用旧密码作为新密码'
            }
        },
        rePwd: function (val) {
            if (val !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    // 为重置按钮注册事件
    $('.layui-form').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 使用  原生js的 表单重置方法  reset
                $('.layui-form')[0].reset();
            }
        })
    })

})