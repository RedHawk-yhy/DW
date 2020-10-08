
/* jquery 选项卡 */

$('#nav li').hover(function(){
    console.log(111);
    $('#list1 div').eq($(this).index()).css('display','block')
    $('#list1 div').eq($(this).index()).siblings().css('display','none')
},function(){
   $('#list1 div').eq($(this).index()).mouseleave(function(){
       console.log(111);
    this.style.display = 'none'
   })
})
$('#top').hover(function(){
    $('#list1 div').css('display','none')
})


/* $('#renav li').hover(function(){
    console.log(111);
    $('#list2 div').eq($(this).index()).css('display','block')
    $('#list2 div').eq($(this).index()).siblings().css('display','none')
},function(){
   $('#list2 div').eq($(this).index()).mouseleave(function(){
    this.style.display = 'none'
   })
})
 */



/* 登录注册点击事件 */
$('.icon-yonghu').click(function (e) {
    $('.regLogin').removeClass('active')
    e.stopPropagation()
})
$('body').click(function (e) {
    // console.log(111);
    $('.regLogin').addClass('active')
})
$('.login-div').click(function () {
    location.href = 'login.html'
})
$('.register-div').click(function () {
    location.href = 'register.html'
})


/* 向下滑动时的选项卡 */
let oLis2 = document.querySelectorAll('.nav-option li')
console.log(oLis2);
let oLists2 = document.querySelectorAll('#list2 div')
let oUl = document.querySelector('.nav-option')
for (let i = 0; i < oLis2.length; i++) {
    oLis2[i].onmouseenter = function () {
        console.log(111);
        for (let j = 0; j < oLists2.length; j++) {
            oLists2[j].style.display = 'none'
        }
        oLists2[i].style.display = 'block'
    }
    oLists2[i].onmouseleave = function () {
        for (let j = 0; j < oLists2.length; j++) {
            oLists2[j].style.display = 'none'
        }
    }
}

/* 导航栏变化 && 回到顶部*/
let backTop = document.querySelector('#arrow')
$("#arrow").mouseover(function () {
    $("#arrow").animate({
        top: '-6px',
    }, 200);
});
$("#arrow").mouseout(function () {
    $("#arrow").animate({
        top: '0px',
        speed: 200
    }, 200);
});

window.onscroll = function () {
    /* 滚动条滚动登陆注册提示消失 */
    $('.regLogin').addClass('active')
    /* 滚动条滚动时选项卡消失 */
    $('#list1 div').css('display','none')
    let reNav = document.getElementById('renav')
    let top = document.getElementById('top')
    let nav = document.getElementById('nav')
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 0) {
        top.style.display = 'none';
        nav.style.display = 'none'
        reNav.style.display = 'block'
    } else {
        top.style.display = 'block';
        nav.style.display = 'block'
        reNav.style.display = 'none'
    }
    backTop.onclick = function () {
        var timer = setInterval(function () {
            document.documentElement.scrollTop -= 40
            document.body.scrollTop -= 40;
            var scrollEvent = document.documentElement.scrollTop || document.body.scrollTop
            if (scrollEvent <= 0) {
                clearInterval(timer)
            }
        }, 1)
    }
}



/* 手表颜色切换 */
$('.watch-list').on('click', '.col1', function (e) {
    // $(e.target).removeClass('border-add')
    $(e.target).siblings().removeClass('border-add')
    $(e.target).addClass('border-add')
    // $('.col1').addClass('border-add')
    $(e.target).parent().next().children().addClass('active');
    $(e.target).parent().next().children().first().removeClass('active');
    e.stopPropagation();
})

$('.watch-list').on('click', '.col2', function (e) {
    $(e.target).siblings().removeClass('border-add')
    $(e.target).addClass('border-add')
    $(e.target).parent().next().children().addClass('active');
    $(e.target).parent().next().children().last().removeClass('active');
    e.stopPropagation();
})


/* 商品展示 */
let uid = localStorage.getItem('uid')
console.log(uid);

/* 无用户名时 */
showProductWithoutUid()
function showProductWithoutUid() {
    let url = 'http://jx.xuzhixiang.top/ap/api/productlist.php';
    $.ajax({
        url,
        type: 'get',
        success: function (res) {
            let arr = res.data
            console.log(arr);
            let html = ''
            arr.forEach(v => {
                html += `
                <div class="watch-demo" data-id="${v.pid}">
                <div class="watch-img"><img src="${v.pimg}" alt=""></div>
                <ul class="detail">
                    <li>${v.pname}</li>
                    <li>
                        <button class="col1 border-add"></button>
                        <button class="col2"></button>
                    </li>
                    <li>
                        <span class="txt1 ">玫瑰金色</span>
                        <span class="txt2 active">银色</span>
                    </li>
                    <li>￥
                    ${v.pprice}
                    </li>
                </ul>
            </div>
                `
            })
            $('.iconic-watch-list').html(html)
            $('.watch-demo').click(function (e) {
                let pid = $(e.target).parent().parent().data('id')
                // console.log(pid);
                if(!pid){
                    pid = $(e.target).parent().parent().parent().data('id')
                    if(!pid){
                        pid = $(e.target).data('id')
                    }
                }
                location.href = `detail.html?pid=${pid}`
            })
        }
    })
}
/* 有用户名时 */
// showProduct();
function showProduct() {
    let regIconic = /^ICONIC/
    let regClassic = /^CLASSIC/
    let regPetite = /^PETITE/
    let url = 'http://jx.xuzhixiang.top/ap/api/productlist.php'
    $.ajax({
        url,
        type: 'get',
        data: {
            uid
        },
        success: function (res) {
            // console.log(res);
            let arr = res.data
            console.log(arr);
            let htmlIconic = ''
            let htmlClassic = ''
            let htmlPetite = ''
            arr.forEach(v => {
                if (regClassic.test(v.pname)) {
                    htmlClassic += `
            <div class="watch-demo" data-id="${v.pid}">
                <div class="watch-img"><img src="${v.pimg}" alt=""></div>
                <ul class="detail">
                    <li>${v.pname}</li>
                    <li>
                        <button class="col1 border-add"></button>
                        <button class="col2"></button>
                    </li>
                    <li>
                        <span class="txt1 ">玫瑰金色</span>
                        <span class="txt2 active">银色</span>
                    </li>
                    <li>￥
                    ${v.pprice}
                    </li>
                </ul>
            </div>
                `
                }
                if (regIconic.test(v.pname)) {
                    htmlIconic += `
                <div class="watch-demo" data-id="${v.pid}">
                <div class="watch-img"><img src="${v.pimg}" alt=""></div>
                <ul class="detail">
                    <li>${v.pname}</li>
                    <li>
                        <button class="col1 border-add"></button>
                        <button class="col2"></button>
                    </li>
                    <li>
                        <span class="txt1 ">玫瑰金色</span>
                        <span class="txt2 active">银色</span>
                    </li>
                    <li>￥
                    ${v.pprice}
                    </li>
                </ul>
            </div>
                `
                }
                if (regPetite.test(v.pname)) {
                    htmlPetite += `
            <div class="watch-demo" data-id="${v.pid}">
                <div class="watch-img"><img src="${v.pimg}" alt=""></div>
                <ul class="detail">
                    <li>${v.pname}</li>
                    <li>
                        <button class="col1 border-add"></button>
                        <button class="col2"></button>
                    </li>
                    <li>
                        <span class="txt1 ">玫瑰金色</span>
                        <span class="txt2 active">银色</span>
                    </li>
                    <li>￥
                    ${v.pprice}
                    </li>
                </ul>
            </div>
                `
                }
                // console.log(reg1.test(v.pname)); 
            });
            $('.iconic-watch-list').html(htmlIconic);
            $('.classic-watch-list').html(htmlClassic);
            $('.petite-watch-list').html(htmlPetite);

            $('.watch-demo').click(function (e) {
                let pid = $(e.target).parent().parent().data('id')
                // console.log(pid);
                location.href = `detail.html?pid=${pid}`
            })
        }
    })
}

/* 购物车 */
$('.icon-gouwuche').click(function (e) {
    $('.cart').animate({
        right:'-36px'
    },400)
    $('.mask').removeClass('active')
    /* 锁定滚动条 禁止滚动 */
    $(document.body).css({
        "overflow-x":"hidden",
        "overflow-y":"hidden"
    });
    e.stopPropagation();
})
$('.icon-guanbi').click(function(e){
    $('.cart').animate({
        right:'-550px'
    },400)
    $('.mask').addClass('active')
    /* 启动滚动条 */
    $(document.body).css({
        "overflow-x":"auto",
        "overflow-y":"auto"
    });
    e.stopPropagation();
})
$('body').click(function(){
    $('.cart').animate({
        right:'-550px'
    },400)
    $(document.body).css({
        "overflow-x":"auto",
        "overflow-y":"auto"
    });
    $('.mask').addClass('active')
})

$('.cart-conmit').click(function () {
    location.href = 'login.html'
})