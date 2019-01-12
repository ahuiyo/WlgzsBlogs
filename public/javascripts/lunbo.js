let content=document.getElementById('content');
let control=document.getElementById('control');
// let lis=content.getElementsByTagName('li');
let timer=null;
let index=0;


//先清除定时器
clearInterval(timer);
timer=setInterval(autoplay,3000);

    function autoplay(){
        index++;
        if (index >= lis.length) {
            index=0;
        }
        content.style.marginTop=-index * 225+'px';
    }
    function change(){
        for(let i=0;i<lis.length;i++){
            lis[i].onmouseover=function(num){
                return function(){
                    content.style.marginTop= -num * 225 + 'px';
                    index=num;
                }
            }(i);
        }
    }
