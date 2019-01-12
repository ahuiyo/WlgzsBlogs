$(function () {
   $('.L_list').find('li').click(function () {
       $('.L_list li').each(function () {
           $(this).removeClass('active');
           $(this).removeClass('on');
           $(this).css({"font-weight":"normal"});
           $(this).find('.ics').css({"display":"none"});
       });
           $(this).addClass('active');
           $(this).addClass('on');
           $(this).css({"font-weight":"bold"});
           $(this).find('.ics').css({"display":"block"});

     //根据id 进行加载页面
       let Eid = $(this).attr("id");
       let _url="/admin/type"+Eid;
       $.get(_url,function (result) {
           $("#wrapid").append().html(result);
       })
   });


});