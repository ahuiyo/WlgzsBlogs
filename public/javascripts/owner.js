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
 
//删除我的博客
function delBlog(that){
    var _this = that;
    if(confirm('确定要删除次博客？')){
        var id = $(_this).attr('data-id')
        console.log(id)
        $.ajax({
            url:'/personblog/deleteblog',
            type:'get',
            data:{
                id:id,
            },
            success:function(data){
                if(data.code==0){
                    $(_this).parents('.g_list').css({'display':'none'})
                }else{
                    alert('操作失败！')
                }
            }
        })
    }else{
        return false;
    }
    
}

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
    var _this = that;
    var id = $(_this).attr('data-id');
    $.ajax({
        url:'/details/detele',
        type:'get',
        data:{
            id:id
        },
        success:function(data){
            if(data.code==0){
                $(_this).parents('.subject-item').css({'display':'none'});
            }else{
                alert('操作失败！')
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
    var id = $(_this).attr('data-bid');  //关注这篇博客主人的id 
    $.ajax({
        url:'/personblog/attention',
        type:'get',
        data:{
            id:id,
        },
        success:function(data){
            if(data.code==1){
                $(_this).html('取消关注')
            }else if(data.code==0){
                $(_this).html('关注')
            }else{
                alert('操作失败！')
            }
        }
    })
}

//取消点赞
function cancelG(that){
    var _this = that;
    var id = $(_this).attr('data-id');
    $.ajax({
        url:'/details/savelike', 
        type:'get',
        data:{id:id},
        success:function(result){
            if(result.code == 0){
                $(_this).parents('.g_list').css({'display':'none'})
            }else{
                alert('操作失败！')
            }
        }
    })
}

//我的收藏
function cancelColl(that){
    var _this = that;
    var _id = $('#idb').attr('data-id');
    $.ajax({
        url:'/details/savecollect',
        type:'get',
        data:{
            id:_id
        },
        success:function(result){
            if(result.code==0){
                $(_this).parents('.g_list').css({'display':'none'})
            }else{
                alert('操作失败！')
            }
        }
    })
}


//测试分页

function spiltPage(){
    console.log('spilt')
}










