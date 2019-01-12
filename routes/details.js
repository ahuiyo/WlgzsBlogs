const express=require('express');

const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

const superagent=require('superagent');

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
                        const result=JSON.parse(data.text).result;
                        const datas=JSON.parse(data.text).data;
                        const label=datas.label.split(',');
                        const other=JSON.parse(data.text).database.other;
                        const before=JSON.parse(data.text).database.before;
                        const after=JSON.parse(data.text).database.after;
                        const comment=JSON.parse(data.text).datacomments;
                        const data3=JSON.parse(ress.text).data;
                        res.render('details',{
                            data3,
                            aid,
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

module.exports = router;   /*暴露这个 router模块*/