/* 页面滚动事件 */
window.onscroll = function(){
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    if(scrollTop>=70){
        $('#top').addClass('active-none');
        $('#nav').addClass('active-none')
        $('#renav').removeClass('active-none')
    }else{
        $('#top').removeClass('active-none');
        $('#nav').removeClass('active-none')
        $('#renav').addClass('active-none')
    }
}
/* 注册按钮点击发起Ajax请求 */
$('button').click(function(){
    console.log(1);
    let url = 'http://jx.xuzhixiang.top/ap/api/reg.php'
    let username = $('#username').val()
    let password = $('#password').val();
    $.ajax({
        url,
        type:'get',
        data:{
            username,
            password
        },
        success:function(res){
            alert(res.msg)
            if(res.code == 1){
                location.href = 'login.html'
            }
        }
    })
})
