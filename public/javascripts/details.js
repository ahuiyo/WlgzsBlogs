//跳到评论的地方
$('.Operspeak').click(function () {
    // var speak=$('.speak');
    mTop = $('.speak')[0].offsetTop;
    // sTop = $(window).scrollTop();
    // result = mTop - sTop;
    $('html,body').animate({
        scrollTop: mTop-200
    }, 800);

})
//评论时的字数限制

$('.textarea').on('keyup',function () {
    var textleng=150-parseInt($(this).val().length);
    if(textleng>0){
        $('.peotext').text( "还可评论" + textleng +"字");
    }
})



//一级评论下的评论显示

$('.twicetextbut').on('click',function () {
    if($(this).parent().next().css('display') == 'none')
         $(this).parent().next().fadeIn();
    else
        $(this).parent().next().fadeOut();
})

//二次评论显示

$('.essayblock').on('click',function () {
    cancelessay();
    var parent=$(this).parent().parent().next();
    console.log($(parent).css('display'));
    if($(parent).css('display') == "none"){
        $(parent).css('display','block');
    }
})
//取消二次评论

function cancelessay() {
    var chatessay=$('.chat-essay');
    for (var i =0;i<chatessay.length;i++){
        $(chatessay[i]).hide();
    }
}
$('.essaydel').click(function () {
    cancelessay();
})

//对一级评论进行评论

$('.room-text').click(function(){
    $('.room-control').show();
})
$('.del').click(function () {
    $('.room-control').hide();
});

// <!-- 一级评论 -->
$('.peobut').click(function () {
    $.ajax({
        url:'/details/save',
        type:'post',
        data:{
            content:$('.textarea').val(),
            // objects:1,
            userId:$('.userId').val(),
            blId:$('.dataid').val(),
            title:$('.blTitle').text(),
            id:0,
        },
        success:function (data) {
            if(data.code==0){
                console.log(data);
                location.reload();
            }else{
                alert("网络错误，请重试");
            }

        }
    })
})


// <!--二级-->
$('.review').on('click',function () {
    let pare=$(this).parent();
    $.ajax({
        url:'/details/save',
        type:'post',
        data:{
            content:$(pare).prev().val(),
            // objects:0,
            userId:$(this).prev().val(),
            blId:$('.dataid').val(),
            title:$('.blTitle').text(),
            id:$(this).next().val(),
        },
        success:function (data) {
            if(data.code==0){
                console.log(data);
                location.reload();

            }else{
                alert("网络错误，请重试");
            }

        }
    })
})
// <!--对二级进行评论-->
$('.essayreview').on('click',function () {
    let pare=$(this).parent().prev().val();
    let commpare=$(this).parent().parent().prev().children('div.chat-comment-autor').children('a.chat-autor-l').text();
    let content='@'+ commpare +pare;
    $.ajax({
        url:'/details/save',
        type:'post',
        data:{
            content:content,
            // objects:0,
            userId:$(this).prev().val(),
            blId:$('.dataid').val(),
            title:$('.blTitle').text(),
            id:$(this).next().val(),
        },
        success:function (data) {
            if(data.code==0){
                console.log(data);
                location.reload();

            }else{
                alert("网络错误，请重试");
            }

        }
    })
})



//滚动条滚到标题处  fixed定位的标题出现
$(window).scroll(function () {
    var hei=$('.contentTitle').offset().top - $(window).scrollTop();
    if(hei<0){
        $('.fixedtext').css('top','0px');
    }else {
        $('.fixedtext').css('top','-80px');
    }
    var line=$(window).height();
    line+=50;
    if($(document).scrollTop()>line){
        $('.returntop').show();
    }else {
        $('.returntop').hide();
    }
})
$('.returntop').on('click',function () {
    $('html,body').animate({
        scrollTop: 0
    }, 800);
});
$('.detalecomm').on('click',function () {
    let id=$(this).data('id');
    $.ajax({
        type:'get',
        url:'/details/detele',
        data: {
            id:id,
        },
        success:function (data) {
            if (data.code==0){
               location.reload();
                // location.reload();
            }else{
                alert(data.msg);
            }
        }
    })
})


$('.atten').click(function () {
    $.ajax({
        url: '/personblog/attention',
        type:'get',
        data:{
            id:$('.userId').val(),
        },
        success:function (data) {
            if(data.code==0){
                $('.atten').removeClass('yes');
                $('.atten').text("+ 关注");
            }else if(data.code==1){
                $('.atten').addClass('yes');
                $('.atten').text("已关注");
            }else{
                console.log(data.msg);
            }
        }
    })
})
