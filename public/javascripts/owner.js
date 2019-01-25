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

//删除我的消息
function delinfo(that){
    const _this=that;
    var _id = $(_this).parent().siblings('.meg_left').find('a').attr('data_id'); //找到博客id
    const data={
        _id
    };
    $.ajax({
        url:'/owner/delinfo',
        type:'post',    /* 使用get请求的时候会把data参数放在url后面，不是我们想要的结果 */
        data:data,
        success:function(result){
            if(result.code==0){
                $(_this).parents('.present-panel').css({'display':'none'});
            }else if(result.code==-1){
                alert('删除失败!')
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
                    $('#tab7').css({'display':'none'});
                }else{
                    alert('清理失败!')
                }
            }
        })
    }
}

// 删除我的评论
function del_comont(that){
    var _id = $('#idc').attr('data-id');
    var data = {
        _id,
    }
    $.ajax({
        url:'/owner/decomment',
        type:'post',
        data:data,
        success:function(result){
            if(result.code==0){
                $('.subject-item').css({'display':'none'});
            }
        }
    })

}

//个人资料模块  保存修改按钮
function btnUpdate(that){
    var str='';
    var _id = $('#hiden').attr('value');
    var lens = $('#listdemo').find('li').length;
    $('#listdemo').find('li').each(function(i){
        if(i==lens-1){
            str+=$.trim($(this).attr('data_id'));    //最后一个不加逗号
        }else{
             str+=$.trim($(this).attr('data_id'))+','  //拿到已经选择的值，保存到字符串中(去掉空格)
        }
    })
   //发送请求
   $.ajax({
       url:'/owner/update',
       type:'post',
       data:{
           str,
           _id
       },
       success:function(result){
           if(result.code == 0){
               alert('保存成功!')
           }else{
               alert('修改失败!')
           }
        }
   })
}

//我的粉丝
function fans(that){
    var _this = that;
    var id = $('#spid').attr('data-bid');  //关注这篇博客主人的id 
    $.ajax({
        url:'/personblog/attention',
        type:'get',
        data:{
            id:id,
        },
        success:function(data){
            if(data.code==0){
                $(_this).html('关注')
            }else if(data.code==1){
                $(_this).html('取消关注')
            }else{
                alert('操作失败！')
            }
        }
    })

}

//取消点赞/收藏
function cancelG(that,_url){
    var _id = $('#idg').attr('data-id');
    var data = {
        _id
    };
    $.ajax({
        url:_url,
        type:'post',
        data:data,
        success:function(result){
            if(result.code == 0){
                $('.g_list').css({'display':'none'});
            }else{
                alert('操作失败！')
            }
        }
    })
}

// function cancelColl(that){
//     var _id = $('#id').attr('data-id');
//     var data ={
//         _id
//     };
//     $.ajax({
//         url:'/owner/cancelGood',
//         type:'post',
//         data:data,
//         success:function(result){
//             console.log(result);
//         }
//     })
// }


//测试分页

function spiltPage(){
    console.log('spilt')
}










