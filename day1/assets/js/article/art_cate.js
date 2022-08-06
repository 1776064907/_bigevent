$(function () {
    var form = layui.form
    var layer = layui.layer
    getData();

    function getData() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let htmlstr = template('body-table', res)
                $('tbody').html(htmlstr)
            }
        })
    }

    let index = null;
    $('#btnadd').on('click', function () {
        index = layer.open({
            content: $('#form-add').html(),
            type: 1,
            area: ['500px', '250px'],
            title: '添加表单分类'
        })
    })

    $('body').on('submit', '#tanchu', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                getData();
                layer.close(index)
            }
        })
    })


    var indexEdit = null
    // 动态渲染出来的都要使用 代理绑定事件
    $('tbody').on('click', '#btnEdit', function () {
        indexEdit = layer.open({
            content: $('#form-edit').html(),
            type: 1,
            area: ['500px', '250px'],
            title: '修改表单分类'
        })

        var id = $('#btnEdit').attr('data-id')
        console.log(id)

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // if (res.status !== 0) {
                //     return layer.msg(res.message)
                // }
                form.val('form-tanchu', res.data)
            }
        })

    })

    $('body').on('submit', '#form-tanchu', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                getData();
                layer.close(indexEdit)
            }
        })
    })

    // 
    $('tbody').on('click', '#btnRemove', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除吗？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    getData();
                }
           })

            
        });
    })
})