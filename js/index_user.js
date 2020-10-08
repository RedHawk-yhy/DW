/* 选项卡 */

let oLis = document.querySelectorAll('#nav li')
let oLists1 = document.querySelectorAll('#list1 div')
let oTop = document.getElementById('top')
let uid = localStorage.getItem('uid')
console.log(uid);
console.log(oLists1);
for (let i = 0; i < oLis.length; i++) {
    oLis[i].onmouseover = function () {
        // console.log(111);
        for (let j = 0; j < oLists1.length; j++) {
            oLists1[j].style.display = 'none'
        }
        oLists1[i].style.display = 'block'
    }
    oLists1[i].onmouseleave = function () {
        for (let j = 0; j < oLists1.length; j++) {
            oLists1[j].style.display = 'none'
        }
    }
}
oTop.onmouseover = function () {
    for (let j = 0; j < oLists1.length; j++) {
        oLists1[j].style.display = 'none'
    }
}

/* 登录注册点击事件 */
$('.icon-yonghu').click(function (e) {
    $('.regLogin').removeClass('active')
    e.stopPropagation()
})
$('body').click(function (e) {
    // console.log(111);
    $('.regLogin').addClass('active')
})
let uname = localStorage.getItem('uname')
if (uname) {
    $('.icon-yonghu').html(uname + `<span class="cancel">注销</span>`)
}

/* 注销点击事件 */
$('.cancel').click(function () {
    localStorage.setItem('uname', '')
    location.href = 'index.html'
})

/* $('.login-div').click(function(){
    location.href = 'login.html'
}) */


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
    for (let j = 0; j < oLists1.length; j++) {
        oLists1[j].style.display = 'none'
    }
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
    e.stopPropagation()
    // $(e.target).removeClass('border-add')
    $(e.target).siblings().removeClass('border-add')
    $(e.target).addClass('border-add')
    // $('.col1').addClass('border-add')
    $(e.target).parent().next().children().addClass('active');
    $(e.target).parent().next().children().first().removeClass('active');
})

$('.watch-list').on('click', '.col2', function (e) {
    e.stopPropagation()
    $(e.target).siblings().removeClass('border-add')
    $(e.target).addClass('border-add')
    $(e.target).parent().next().children().addClass('active');
    $(e.target).parent().next().children().last().removeClass('active');
})


/* 商品展示 */

/* 有用户名时 */
showProduct();

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
            $('.col1').click(function(e){
                e.stopPropagation()
            })
            $('.co2').click(function(e){
                e.stopPropagation()
            })
            $('.iconic-watch-list').html(htmlIconic);
            $('.classic-watch-list').html(htmlClassic);
            $('.petite-watch-list').html(htmlPetite);

            $('.watch-demo').click(function (e) {
                let pid = $(e.target).parent().parent().data('id')
                if(!pid){
                    pid = $(e.target).parent().parent().parent().data('id')
                    if(!pid){
                        pid = $(e.target).data('id')
                    }
                }
                // console.log(pid);
                location.href = `detail.html?pid=${pid}`
            })
        }
    })
}

/*------------------------- 购物车 ----------------------*/
function showCart() {
    $('.cart').animate({
        right: '-36px'
    }, 400)
    $('.mask').removeClass('active')
    /* 锁定滚动条 禁止滚动 */
    $(document.body).css({
        // "overflow-x": "hidden",
        "overflow-y": "hidden"
    });
}
$('.icon-gouwuche').click(function (e) {
    showCart()
    showCartProduct()
    /* 发起Ajax请求向购物车中传入数据 */
    e.stopPropagation();
})

function showCartProduct() {
    let url = 'http://jx.xuzhixiang.top/ap/api/cart-list.php'
    $.ajax({
        url,
        type: 'get',
        data: {
            id: uid
        },
        success: function (res) {
            let arr = res.data
            console.log(arr);
            let html = ''
            if (uname == '') {
                html = `
            <p>登录后查看购物车</p>
            <div class="cart-conmit">
                登录
            </div>`
            } else if (arr.length == '') {
                html = `
                    <p>您的购物车是空的</p>
                    <div class="continue-btn">继续购物</div>`
            } else {
                arr.forEach(v => {
                    html += `
            <div class="cart-content-list">
                <img src="${v.pimg}" alt="">
                <div class="cart-content-list-attr">
                    <p>${v.pname}</p>
                    <p class="cart-count-detail"><span class="count-num">${v.pnum}</span> <span>X ￥${v.pprice}</span></p>
                    <div class="cart-content-list-attr-size">
                        <div class="cart-content-list-attr-color"></div>
                        <div class="cart-content-list-attr-length">32MM</div>
                    </div>
                </div>
                <div class="cart-content-list-num">
                    <i class="iconfont icon-lajitong" data-id="${v.pid}"></i>
                    <div class="cart-content-list-option">
                        <div class="sub-btn" data-id="${v.pid}">-</div>
                        <span>${v.pnum}</span>
                        <div class="add-btn" data-id="${v.pid}">+</div>
                    </div>
                </div>
            </div>
                `
                })
            }
            countPrice()
            $('.cart-content').html(html)
        }
    })
}

/* 关闭购物车 */
function closeCart() {
    $('.cart').animate({
        right: '-550px'
    }, 400)
    $('.mask').addClass('active')
    /* 启动滚动条 */
    $(document.body).css({
        // "overflow-x": "auto",
        "overflow-y": "auto"
    });
}
$('.icon-guanbi').click(function (e) {
    closeCart()
    e.stopPropagation();
})
$('body').click(function () {
    closeCart()
})
/* 阻止购物车事件冒泡 */
$('.cart').click(function (e) {
    e.stopPropagation();
})

/* 继续购物点击事件 */
$('.cart-content').on('click', '.continue-btn', function (e) {
    closeCart()
    e.stopPropagation()
})

/* 删除购物车商品 */
deleteCartProduct()

function deleteCartProduct() {
    $('.cart-content').on('click', '.icon-lajitong', function (e) {
        let url = 'http://jx.xuzhixiang.top/ap/api/cart-delete.php'
        let pid = $(e.target).data('id')
        // console.log(pid);
        $.ajax({
            url,
            type: "get",
            data: {
                pid,
                uid
            },
            success: function () {
                $(e.target).parent().parent().remove()
                let showUrl = 'http://jx.xuzhixiang.top/ap/api/cart-list.php'
                $.ajax({
                    url: showUrl,
                    type: 'get',
                    data: {
                        id: uid
                    },
                    success: function (res) {
                        countPrice()
                        let arr = res.data;
                        if (arr.length == 0) {
                            html = `
                      <p>您的购物车是空的</p>
                      <div class="continue-btn">继续购物</div>`
                        }
                        $('.cart-content').html(html)
                    }
                })
            }
        })
    })
}
/* 数量加减 */
subProduct()
addProduct()

function subProduct() {
    $('.cart-content').on('click', '.sub-btn', function (e) {
        let pid = $(e.target).data('id')
        let num = parseInt($(e.target).next().html())
        if (num == 1) {
            $(e.target).next().html('1')
        } else {
            $(e.target).next().html(num - 1)
        }
        let pnum = parseInt($(e.target).next().html())
        $(e.target).parent().parent().prev().children().eq(1).children().eq(0).html(pnum)
        console.log(pid, pnum);
        let url = 'http://jx.xuzhixiang.top/ap/api/cart-update-num.php'
        $.ajax({
            url,
            type: 'get',
            data: {
                uid,
                pid,
                pnum
            },
            success: function () {
                countPrice()
            }
        })
    })
}

function addProduct() {
    $('.cart-content').on('click', '.add-btn', function (e) {
        let pid = $(e.target).data('id')
        let num = parseInt($(e.target).prev().html())
        $(e.target).prev().html(num + 1)
        let pnum = parseInt($(e.target).prev().html())
        $(e.target).parent().parent().prev().children().eq(1).children().eq(0).html(pnum)
        let url = 'http://jx.xuzhixiang.top/ap/api/cart-update-num.php'
        $.ajax({
            url,
            type: 'get',
            data: {
                uid,
                pid,
                pnum
            },
            success: function () {
                countPrice()
            }
        })
    })
}

/* 商品总价 */
function countPrice() {
    let url = 'http://jx.xuzhixiang.top/ap/api/cart-list.php'
    $.ajax({
        url,
        type: 'get',
        data: {
            id: uid
        },
        success: function (res) {
            let arr = res.data
            let countPrice = 0
            arr.forEach(v => {
                countPrice += v.pnum * v.pprice
            })
            $('.countAdd-price').html(countPrice)
        }
    })
}