const express =require('express');
const router = express.Router();
const superagent=require('superagent');


router.get('/',function (req,res) {
    res.render('admin/admin')
    // superagent
    //     .get('http://wlgzs.org:9090/mock/42/home/getArticleType')   //进入后台时显示类型管理
    //     .end(function (err,data) {
    //         let list=JSON.parse(data.text).data;
    //         res.render('admin/admin',{
    //             list:list
    //         });
    //     })
});

// 侧边栏单击加载不同的页面
// get请求
function AskG(_href,name,res){
    superagent
        .get(_href)    //每个li请求的地址不同
        .end(function (err,data) {
            let list=JSON.parse(data.text).data;
            res.render('admin/everyviews/'+name,{
                list:list
            });
        })
}
// post请求
function AskP(_href,name,res){
    superagent
        .post(_href)    //每个li请求的地址不同
        .type('form')
        .end(function (err,data) {
            let list=JSON.parse(data.text).data;
            res.render('admin/everyviews/'+name,{
                list:list
            });
        })
}

//侧边栏点击不同内容时 请求不同的地址
router.post('/:pathname',function (req,res) {
    let _name=req.params.pathname;
    if (_name=='type1'){
        AskP("http://wlgzs.org:9090/mock/42/backstage/addtype",_name,res);
    }else if (_name=='type2'){
        AskG("http://wlgzs.org:9090/mock/42/backstage/allblogs",_name,res);
    }else if(_name=='type3'){

    }else if(_name=='type4'){
        AskG('http://wlgzs.org:9090/mock/42/backstage/check?id=3',_name,res);
    }else if(_name=='type7'){
        AskG('http://wlgzs.org:9090/mock/42/backstage/check?id=5',_name,res);
    }
});
 
module.exports = router;