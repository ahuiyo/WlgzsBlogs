const express=require('express');
const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
const superagent=require('superagent');

//   -------------进入博客页面   地址  例   /details?id=4
router.get('/',function(req,res){
    let aid = req.query;
    let userid = req.session.user.userID;
    let url='http://fcb55d3a76b1d123.natapp.cc/blog/getdetails';
    superagent
        .get(url)
        .query(aid)
        .query({userid : userid})
        .end(function (err, data) {
            superagent
                .get('http://fcb55d3a76b1d123.natapp.cc/home/index')
                .query({userid : userid})
                .end(function (err,ress) {
                    if(!err){
                        /*result  用户登录信息以及登录用户是否关注博主
                        * datas   本文章的相关数据   label  文章标签
                        * other   博主其他文章   before 下一篇  after上一篇
                        * comment  评论相关信息
                        * users   博主信息
                        * */
                        const code=JSON.parse(data.text).code;
                        const result=JSON.parse(data.text).result;
                        const datas=JSON.parse(data.text).data;
                        const label=datas.label.split(',');
                        const other=JSON.parse(data.text).database.other;
                        const before=JSON.parse(data.text).database.before;
                        const after=JSON.parse(data.text).database.next;
                        const comment=JSON.parse(data.text).datacomments;
                        const number = JSON.parse(ress.text).dataother['information'];  //顶部各个部分的数量
                        const users=JSON.parse(data.text).user.user;
                        const dataother=JSON.parse(data.text).dataother;
                        res.render('details',{
                            code,
                            aid,
                            users,
                            dataother,
                            result:result,
                            datas:datas,
                            label:label,
                            other:other,
                            before:before,
                            after:after,
                            comment:comment,
                            ID:userid,
                            number,
                        })
                    }
                });
        })
});

//  ------------------取消与点赞  地址 例  /details/savelike?id=3
router.get('/savelike',function (req,res) {
    let url='http://fcb55d3a76b1d123.natapp.cc/blog/savelike';
    let userid = req.session.user.userID;
    superagent
        .get(url)
        .query(req.query)
        .query({userid : userid})
        .end(function (err,data) {
            if(!err){
                const savelike=JSON.parse(data.text);
                if(savelike.code == 0){
                    res.json({
                        code:0,
                        data:'取消点赞成功！',
                    })
                }else if(savelike.code == 1){
                    res.json({
                        code:1,
                        data:'点赞成功！',
                    })
                }else{
                    res.json({
                        code:-1,
                        data:'失败！',
                    })
                }
            }
        });
});

// ----------------取消收藏与收藏    地址 例  /details/savecollect?id=3
router.get('/savecollect',function (req,res) {
    let url='http://fcb55d3a76b1d123.natapp.cc/blog/savecollect';
    let userid = req.session.user.userID;
    superagent
        .get(url)
        .query(req.query)
        .query({userid:userid})
        .end(function (err,data) {
            if(!err){
                const savecollect=JSON.parse(data.text);
                if(savecollect.code == 0){
                    res.json({
                        code:0,
                        data:'取消收藏成功！',
                    })
                }else if(savecollect.code == 1){
                    res.json({
                        code:1,
                        data:'收藏成功！',
                    })
                }else{
                    res.json({
                        code:-1,
                        data:'失败！',
                    })
                }
            }
        });
});

//  -------------对博客进行评论
router.post('/save',function (req,res) {

    let url='http://fcb55d3a76b1d123.natapp.cc/blog/save';
    let userid = req.session.user.userID;
    superagent
        .post(url)
        .type('form')
        .send({content : req.body.content})
        .send({userId : req.body.userId})
        .send({blId : req.body.blId})
        .send({title: req.body.title})
        .send({id : req.body.id})
        .send({userid:userid})
        .end(function (err,data) {
            if(!err){
                const save=JSON.parse(data.text);
                if(save.code==0){
                    res.json(save)
                }else{
                    res.json({
                        code:-1,
                        data:'评论失败！',
                    })
                }

            }
        });

});


//删除评论
router.get('/detele',function (req,res) {

    let url='http://fcb55d3a76b1d123.natapp.cc/blog/delete';
    let userid = req.session.user.userID;
    superagent
        .del(url)
        .query(req.query)
        .query({userid:userid})
        .end(function (err,data) {
            if(!err){
                const save=JSON.parse(data.text);
                if(save.code==0){
                    res.json(save)
                }else{
                    res.json({
                        code:-1,
                        msg:'删除失败！',
                    })
                }
            }
        });

});



module.exports = router;   /*暴露这个 router模块*/
