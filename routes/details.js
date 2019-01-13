const express=require('express');

const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

const superagent=require('superagent');
//   -------------进入博客页面   地址  例   /details?id=4
router.get('/',function(req,res){
    let aid=req.query;

    let url='http://wlgzs.org:9090/mock/42/blog/getdetails';
    superagent
        .get(url)
        .query(aid)
        .end(function (err, data) {
            superagent
                .get('http://wlgzs.org:9090/mock/42/personal/statistical')
                .end(function (err,ress) {
                    if(!err){
                        /*result  用户登录信息以及登录用户是否关注博主
                        * datas   本文章的相关数据   label  文章标签
                        * other   博主其他文章   before 下一篇  after上一篇
                        * comment  评论相关信息
                        * users   博主信息
                        * */

                        const result=JSON.parse(data.text).result;
                        const datas=JSON.parse(data.text).data;
                        const label=datas.label.split('，');
                        const other=JSON.parse(data.text).database.other;
                        const before=JSON.parse(data.text).database.before;
                        const after=JSON.parse(data.text).database.after;
                        const comment=JSON.parse(data.text).datacomments;
                        const data3=JSON.parse(ress.text).data;
                        const users=JSON.parse(data.text).user.user;

                        res.render('details',{
                            data3,
                            aid,
                            users,
                            result:result,
                            datas:datas,
                            label:label,
                            other:other,
                            before:before,
                            after:after,
                            comment:comment
                        })
                    }
                });
        })
});

//  ------------------取消与点赞  地址 例  /details/savelike?id=3
router.get('/savelike',function (req,res) {

    let url='http://wlgzs.org:9090/mock/42/blog/savelike';
    superagent
        .get(url)
        .query(req.query)
        .end(function (err,data) {
            if(!err){
                const savelike=JSON.parse(data.text);

                if(savelike.code == 0){
                    res.json({
                        code:0,
                        data:'成功！',
                    })
                }else{
                    res.json({
                        code:-1,
                        data:'失败！',
                    })
                }


            }
        });

})

// ----------------取消收藏与收藏    地址 例  /details/savecollect?id=3
router.get('/savecollect',function (req,res) {

    let url='http://wlgzs.org:9090/mock/42/blog/savecollect';
    superagent
        .get(url)
        .query(req.query)
        .end(function (err,data) {
            if(!err){
                const savecollect=JSON.parse(data.text);
                console.log(savecollect);
                if(savecollect.code == 0){
                    res.json({
                        code:0,
                        data:'成功！',
                    })
                }else{
                    res.json({
                        code:-1,
                        data:'失败！',
                    })
                }


            }
        });

})




module.exports = router;   /*暴露这个 router模块*/