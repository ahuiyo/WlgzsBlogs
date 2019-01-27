$(document).ready(function() {
    if($("#pagination")){
        var pagecount = $('#pagination').data('pagecount');
        var pagesize = $('#pagination').data('pagesize');
        var currentpage = $('#pagination').data('current');
        var id=$('.attentionid').val();

        var counts,pagehtml="";
        if(pagecount%pagesize==0){
            counts = parseInt(pagecount/pagesize);
        }else{
            counts = parseInt(pagecount/pagesize)+1;
        }
        //只有一页内容
        if(pagecount<=pagesize){pagehtml="";}
        //大于一页内容
        if(pagecount>pagesize){
            if(currentpage>1){
                pagehtml+= `<li><a href="/course?id=${id}&page=1">首页</a></li><li><a href="/course?id=${id}&page=${currentpage-1}">上一页</a></li>`;
            }
            for(var i=0;i<counts;i++){
                if(i>=(currentpage-3) && i<(currentpage+3)){
                    if(i==currentpage-1){
                        pagehtml+= `<li class="active"><a href="/course?=${id}&page=${i+1}">${i+1}</a></li>`;
                    }else{
                        pagehtml+= `<li><a href="/course?id=${id}&page=${i+1}">${i+1}</a></li>`;
                    }

                }
            }
            if(currentpage<counts){
                pagehtml+= `<li><a href="/course?id=${id}&page=${currentpage+1}">下一页</a></li>`;
            }
        }
        $("#pagination").html(pagehtml);
    }
});
