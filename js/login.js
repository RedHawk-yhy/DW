/* 登录的Ajax请求 */
$('.btn-default').click(function () {
    let url = 'http://jx.xuzhixiang.top/ap/api/login.php'
    let uIpt = $('#username').val();
    let pwdIpt = $('#password').val();
    console.log(uIpt, pwdIpt);
    $.ajax({
        //请求端口
        url,
        //请求方式
        type: 'GET',
        // 需要传递的参数
        data: {
            username: uIpt,
            password: pwdIpt,
        },
        // 请求成功
        success: function (res) {
            alert(res.msg)
            console.log(res);
            localStorage.setItem('uid', res.data.id);
            localStorage.setItem('uname', res.data.username)
            localStorage.setItem('token', res.data.token);
            if(uIpt == '' && pwdIpt == ''){
                location.href = 'index.html'
            }else{
                location.href = 'index_user.html'
            }
            
        },
        // 请求失败
        error: function (err) {
            alert('err.msg')
        }
    });
})

/* 滚动页面事件 */
window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop >= 70) {
        $('#top').addClass('active-none');
        $('#nav').addClass('active-none')
        $('#renav').removeClass('active-none')
    } else {
        $('#top').removeClass('active-none');
        $('#nav').removeClass('active-none')
        $('#renav').addClass('active-none')
    }
}


console.log($('.btn-default'));
console.log($('span'));