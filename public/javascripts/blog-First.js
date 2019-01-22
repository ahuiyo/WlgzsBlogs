$(function () {
    //展开/收起
   $('.choice-icon').click(function () {
      if($('.show').height()!=100){
          $('.show').css({height:"100px"});
          $('.choice-icon-txt').html('收起');
          $('.Turn').css({"transform":"rotate(0deg)"})
      }
       if($('.show').height()!=40){
          $('.show').css({height:"40px"});
           $('.choice-icon-txt').html('展开');
           $('.Turn').css({"transform":"rotate(90deg)"})
      }
   });

    //监听滚动条
    $(window).scroll(function(){
        var s=$(window).scrollTop();
        // 分类列表展开/收起
        // if(s>=200){
        //     $('.label').css({
        //         "position":"fixed",
        //         "width":"850px",
        //         "z-index":"22",
        //         "top":'0',
        //         "box-shadow":"0px 4px 5px #ddd"
        //     });
        // }else{
        //     $('.label').css({'position':'static',"width":"100%"});
        // }

        //右边的推荐博客
        if(s>=400){
            $('.pix').css({
                "position":"fixed",
                "top":"0",
                "width":"340px"
            })            
        }else{
            $('.pix').css({'position':'static',"width":"100%"});
        }
    });

    //l_box
    $('.show li').click(function(){
        $('.show li').each(function(){
            $(this).removeClass('c_color')
        });
        $(this).addClass('c_color');
        //获取tab属性
        var tab=$(this).attr('tab');
        //先隐藏所有的div
        $('.l_box').hide();
        //点击显示
        $('#'+tab).show();
    });


});