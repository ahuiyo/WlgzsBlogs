const express =require('express');
const router = express.Router();
const superagent=require('superagent');


router.get('/',function (req,res) {
    superagent
        .get('http://wlgzs.org:9090/mock/42/home/getArticleType')   //进入后台时显示类型管理
        .end(function (err,data) {
            // let list=JSON.parse(data.text).data;
            res.render('admin/admin',{
                // list:list
            });
        })
});

function Ask(_href,name,res){
    superagent
        .get(_href)    //每个li请求的地址不同
        .end(function (err,data) {
            let list=JSON.parse(data.text).data;
            res.render('admin/everyviews/'+name,{
                list:list
            });
        })
}
//侧边栏点击不同内容时 请求不同的地址
router.get('/:pathname',function (req,res) {
    let _name=req.params.pathname;
    if (_name=='type1'){
        Ask("http://wlgzs.org:9090/mock/42/home/getArticleType",_name,res);
    }else if (_name=='type2'){
        Ask("http://wlgzs.org:9090/mock/42/home/getBestNewArticles",_name,res);
    }
});

module.exports = router;