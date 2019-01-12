$(function () {

//判断传过来的值
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        switch (context) {
            case 'tab1':
                $('.pubc').removeClass('line');
                $('.'+context).addClass('line');

                // $('.tabm').hide();
                // $('#'+context).show();

                $('.i_contain').html(localStorage.getItem("str"));
                localStorage.removeItem("str");
                break;
            case 'tab2':
                $('.pubc').removeClass('line');
                $('.'+context).addClass('line');

                // $('.tabm').hide();
                // $('#'+context).show();

                $('.i_contain').html(localStorage.getItem("str"));
                localStorage.removeItem("str");
                break;
            case 'tab3':
                $('.pubc').removeClass('line');
                $('.'+context).addClass('line');

                // $('.tabm').hide();
                // $('#'+context).show();

                $('.i_contain').html(localStorage.getItem("str"));
                localStorage.removeItem("str");
                break;
            case 'tab4':
                $('.pubc').removeClass('line');
                $('.'+context).addClass('line');

                $('.tabm').hide();
                $('#'+context).show();

                $('#w4').html(localStorage.getItem("str"));
                localStorage.removeItem("str");
                break;
            case 'tab5':
                $('.pubc').removeClass('line');
                $('.'+context).addClass('line');

                $('.tabm').hide();
                $('#'+context).show();

                $('#w5').html(localStorage.getItem("str"));
                localStorage.removeItem("str");
                break;
            case 'tab6':
                $('.pubc').removeClass('line');
                $('.'+context).addClass('line');

                $('.tabm').hide();
                $('#'+context).show();

                $('#w6').html(localStorage.getItem("str"));
                $('#i_fans').html(localStorage.getItem('len'));
                localStorage.removeItem("str");
                localStorage.removeItem("len");
                break;
            case 'tab7':
                $('.pubc').removeClass('line');
                $('.'+context).addClass('line');

                $('.tabm').hide();
                $('#'+context).show();

                $('#w7').html(localStorage.getItem("str"));
                $('#i_info').html(localStorage.getItem('info'));
                localStorage.removeItem("str");
                localStorage.removeItem("info");
                break;
            case 'tab8':
                $('.pubc').removeClass('line');
                $('.'+context).addClass('line');

                $('.tabm').hide();
                $('#'+context).show();

                $('#w8').html(localStorage.getItem("str"));
                localStorage.removeItem("str");
                break;
        }
        reg = null;
        r = null;
        if(context == null || context == "" || context == "undefined"){
           return context=''
        } else{
           return context=context;
        }
    }
    GetQueryString("txt");
    //li单击
    $('.pubc').click(function(){

        $('.pubc').each(function(){
            $(this).removeClass('line');
        });

        $(this).addClass('line');
        let tab=$(this).attr('tab');   //tab1 tab2......
        $('.tabm').hide();
        $('#'+tab).show();

        let Eid = $(this).attr("tab");
        let _url="/owner/"+Eid;
        $.get(_url,function (result) {
            $(".i_contain").html(result);
        })


    });


});

//兴趣爱好
function add(e) {
    const target = e.target;
    const copy=target.cloneNode(true);
    const list = document.getElementById("listdemo");
    //解决重复
    if (!$(target).attr("data-use")){
        list.append(copy);
        $(target).attr({'data-use':"true"})
    }
}

// 我的粉丝 button 按钮 
function fans(self){
    const _this=self;
    $(_this).parent().css("display","none");
}

//我的消息  按钮
function del(self) {
    const _this=self;
    $(_this).parent().css("display","none");
}