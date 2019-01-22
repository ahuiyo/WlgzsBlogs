$(function () {
    //左边 li单击
    $('.pubc').click(function(){
        $('.pubc').each(function(){
            $(this).removeClass('line');
            $(this).find('i').removeClass('a');
        });
        $(this).addClass('line');
        $(this).find('i').addClass('a');

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
 
//个人资料---兴趣模块
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

//删除我的消息
function delinfo(that){
    const _this=that;
    var id = $(_this).parent().siblings('.meg_left').find('a').attr('data_id'); //找到博客id
    const data={
        id
    };
    $.ajax({
        url:'/owner/delinfo',
        type:'post',    /* 使用get请求的时候会把data参数放在url后面，不是我们想要的结果 */
        data:data,
        success:function(result){
            if(result.code==0){
                $(_this).parents('.present-panel').css({'display':'none'});
            }
        }
    })
}

// 清空全部
function delAll(that){
    var _this = that;
    if(window.confirm("确定要清空所有记录?")){
        $.ajax({
            url:'/owner/delAllinfo',
            type:'post',   
            success:function(result){
                if(result.code==0){
                    $('#w7').css({'display':'none'});
                }
            }
        })
    }
}
// 删除我的评论
function del_comont(that){

}

//个人资料模块  保存修改按钮
function btn_update(that){
    var str='';
    var _id = $('#hiden').attr('value');
    $('#listdemo').find('li').each(function(){
        str+=$.trim($(this).attr('data_id'))+','  //拿到已经选择的值，保存到字符串中(去掉空格)
    })
   console.log(str);
   //发送请求
   $.ajax({
       url:'/owner/update',
       type:'post',
       data:{
           str,
           _id
       },
       success:function(result){
           var len = result.length;
           console.log(len);
        }
   })
}

//测试分页

function spiltPage(){
    console.log('spilt')
}










