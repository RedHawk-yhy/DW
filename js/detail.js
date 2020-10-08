/* 获取商品详情 */
let str = location.search;
let arr = str.split('=')
let pid = arr[1]
let uid = localStorage.getItem('uid');
/* console.log(pid);
console.log(uid); */
let detailUrl = 'http://jx.xuzhixiang.top/ap/api/detail.php'
$.ajax({
  url: detailUrl,
  type: 'get',
  data: {
    id: pid
  },
  success: function (res) {
    let arr = res.data;
    console.log(arr);
    let htmlImg = `
      <img src="${arr.pimg}" alt="">
    `
    let htmlSpan = `
    <span>${arr.pname}</span>
    <span>￥${arr.pprice}</span>
    `

    $('#slide1').html(htmlImg)
    $('#fun-title').html(htmlSpan)

    var mySwiper1 = new Swiper('#swiper1', {
      direction: 'horizontal',
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  },

})

/* 选项卡 */
$('#nav li').hover(function () {
  // console.log(111);
  $('#list1 div').eq($(this).index()).css('display', 'block')
  $('#list1 div').eq($(this).index()).siblings().css('display', 'none')
}, function () {
  $('#list1 div').eq($(this).index()).mouseleave(function () {
    // console.log(111);
    this.style.display = 'none'
  })
})
$('#top').hover(function () {
  $('#list1 div').css('display', 'none')
})

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

/* 导航栏变化  回到顶部 */
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
  $('#list1 div').css('display', 'none')
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




/* 颜色选择 */

$('.color-circle').on('click', '.color-circle1', function (e) {
  $(e.target).siblings().removeClass('border-add')
  $(e.target).addClass('border-add')

})

$('.color-circle').on('click', '.color-circle2', function (e) {
  $(e.target).siblings().removeClass('border-add')
  $(e.target).addClass('border-add')
})


/* main-bottom列表选择点击事件 */
$('.main-bottom-title').on('click', '.col1', function (e) {
  $('.col1').siblings().removeClass('border-add-col')
  $('.col1').addClass('border-add-col')
  $('.col1-list').removeClass('active-none')
  $('.col2-list').addClass('active-none')
  $('.col3-list').addClass('active-none')
  $('.col4-list').addClass('active-none')
})

$('.main-bottom-title').on('click', '.col2', function (e) {
  $('.col2').siblings().removeClass('border-add-col')
  $('.col2').addClass('border-add-col')
  $('.col2-list').removeClass('active-none')
  $('.col1-list').addClass('active-none')
  $('.col3-list').addClass('active-none')
  $('.col4-list').addClass('active-none')
  var mySwiper2 = new Swiper('#swiper2', {
    direction: 'horizontal',
    loop: true, // 循环模式选项
    // 如果需要分页器
    /* pagination: {
      el: '.swiper-pagination',
    }, */
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

})

$('.main-bottom-title').on('click', '.col3', function (e) {
  $('.col3').siblings().removeClass('border-add-col')
  $('.col3').addClass('border-add-col')
  $('.col3-list').removeClass('active-none')
  $('.col2-list').addClass('active-none')
  $('.col1-list').addClass('active-none')
  $('.col4-list').addClass('active-none')
})

$('.main-bottom-title').on('click', '.col4', function (e) {
  $('.col4').siblings().removeClass('border-add-col')
  $('.col4').addClass('border-add-col')
  $('.col4-list').removeClass('active-none')
  $('.col2-list').addClass('active-none')
  $('.col3-list').addClass('active-none')
  $('.col1-list').addClass('active-none')
})

/* 注册用户点击登录注册事件 */
$('.icon-yonghu').click(function (e) {
  $('.regLogin').removeClass('active-none')
  e.stopPropagation()
})
$('body').click(function (e) {
  // console.log(111);
  $('.regLogin').addClass('active-none')
})

$('.login-div').click(function () {
  location.href = 'login.html'
})
$('.register-div').click(function () {
  location.href = 'register.html'
})

/* 登录显示用户名字 */
let uname = localStorage.getItem('uname')
if (uname) {
  $('.icon-yonghu').html(uname + `<span class="cancel">注销</span>`)
}
/* 注销点击事件 */
$('.cancel').click(function () {
  localStorage.setItem('uname', '')
  location.href = 'index.html'
})

/* 点击购物车 */
function clickCart() {
  $('.cart').animate({
    right: '0px'
  }, 400)
  $('.mask').removeClass('active-none')

  /* 禁用滚动条 */
  $(document.body).css({
    // "overflow-x": "hidden",
    "overflow-y": "hidden"
  });

}
$('.icon-gouwuche').click(function (e) {
  clickCart()
  e.stopPropagation();
})

/* 关闭购物车 */
function deleteCart() {
  $('.cart').animate({
    right: '-550px'
  }, 400)
  $('.mask').addClass('active-none')
  /* 启动滚动条 */
  $(document.body).css({
    // "overflow-x": "auto",
    "overflow-y": "auto"
  });
}
$('.icon-guanbi').click(function (e) {
  deleteCart()
  e.stopPropagation();
})
$('body').click(function () {
  deleteCart()
})


/* 加入购物车 */
$('.buy-now').click(function (e) {
  e.stopPropagation()
  if (uname) {
    let url = 'http://jx.xuzhixiang.top/ap/api/add-product.php'
    $.ajax({
      url,
      type: 'get',
      data: {
        uid,
        pid,
        pnum: 1
      },
      success: function (res) {
        console.log(res);
        if (res.msg == '修改成功' || res.msg == '插入成功') {
          showCartProduct()
          clickCart()
        }
      }
    })
  } else {
    clickCart()
  }

})

/* 查看购物车 */
showCartProduct()

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
      // console.log(arr);
      let html = ''
      let cart_bottom = ''
      if (uname == '') {
        html = `
                  <p>登录后查看购物车</p>
                  <div class="cart-conmit">
                      登录
                  </div>`
        $('.cart-bottom').html(cart_bottom)
      } else if (arr.length == 0) {
        html = `
        <p>您的购物车是空的</p>
        <div class="continue-btn">继续购物</div>`
      } else {
        cart_bottom = `
          <div class="cart-distribution">
          <div>配送费用(顺丰包邮)</div>
          <div>￥ 0</div>
      </div>
      <div class="countAdd">
          <div class="countAdd-txt">累计</div>
          <div class="countAdd-price">￥1234</div>
      </div>
      <div class="cart-settlement">前往结账</div>
          `
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
        $('.cart-bottom').html(cart_bottom)
      }
      countPrice()
      $('.cart-content').html(html)
    }
  })
}

/* 购物车登录按钮 */
$('.cart-content').on('click', '.cart-conmit', function () {
  console.log(123);
  location.href = 'login.html'
})

/* 继续购物按钮事件 */
$('.cart-content').on('click', '.continue-btn', function (e) {
  deleteCart()
  e.stopPropagation()
})

/* 删除购物车中的商品 */
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
      if (uname == '') {
        $('.countAdd-price').html(0)
      } else {
        $('.countAdd-price').html(countPrice)
      }
    }
  })
}