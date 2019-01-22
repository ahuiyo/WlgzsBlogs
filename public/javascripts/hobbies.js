var color=['#F0A24F','#DC6F58','#64A9D3','#B28AC6'];
//点击兴趣内容进行添加
$('.little').on('click',function () {
    var yestext=$(this).children('p').text();
    var yesid=$(this).children('p').data('id');

    addText(yestext,yesid);
    removeText();
})
//获取兴趣文字后 将其填入顶部方块  并修改颜色
function addText(text,id) {
    if(repet(text) == false){ return false;}
    var num=parseInt($('.per').length);
    if(num>=4){
        var lis=`<li></li>`;
        $('.list').append(lis);
    }
    var list=$('.list li');
    var retucolor =color[Math.floor(Math.random()*4)];
    $(list[num]).css({
        "border":function () { var aa='1px solid' + retucolor;return aa;},
        "background-color":function () {return retucolor;},
    });
    var listspan=`<span class="per" data-id="${id}" >${text}</span>`;
    $(list[num]).append(listspan);
}
//判断是否重复
function repet(texts) {
        var per=$('.per');
        // for (let i of per){
        //     if($(i).text()== texts){
        //         return false;
        //     }
        // }
        for (let i=0;i<per.length;i++){
            if($(per[i]).text()== texts){
                return false;
            }
        }

}
//获取此时已添加兴趣的集合
function removeArr() {
    var per=$('.per');
    var peres=[];
    // for (let i of per){
    //     peres.push($(i).text());
    // }
    for (let i=0;i<per.length;i++){
        peres.push($(per[i]).text());
    }
    if( peres.length != 0){
        $('.secele').hide();
        $('.yesnext').show();
    }else {
        $('.secele').show();
        $('.yesnext').hide();
    }
    return peres;
}
//点击已选的兴趣  进行删除
function removeText() {
    var list=$('.list li');
    var Arr =removeArr();
    $('.per').off('click');
    $('.per').on('click',function () {
        var bb= Arr.indexOf($(this).text());
        $(list[bb]).html(" ");
        $(list[bb]).css({
            "border":'1px dashed #677b92',
            "background-color":" #0000",
        });
        list.push(list[bb]);
        list.splice(bb,1);
        if(list.length>5){
            list.splice(list.length-1,1);
        }
        $('.list').html(" ");
        // for (let i of list){
        //     $('.list').append(i);
        // }
        for (let i=0;i<list.length;i++){
            $('.list').append(list[i]);
        }
        removeText();
    });
}
//获取用户最后的选择
function alls() {
    var str="";
    var all=$('.per');
    // for(let i of all){
    //     str=str+$(i).text()+',';
    //
    // }
    for(let i=0;i<all.length;i++){
        str=str+$(all[i]).data('id')+',';

    }
    str=str.substring(0,str.length-1);
    console.log(str);
    if(str!=null){
        $.ajax({
            url:'/hobbies/save',
            type:'get',
            data:{
                module:str,
            },
            success:function (data) {
                if(data.code==0){
                    console.log("成功");
                    location='/allhobbs';
                }

            }
            
        })
    }

}
$('.yesnext').on('click',function () {
    alls();
    
})