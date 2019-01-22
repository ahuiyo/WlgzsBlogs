const express=require('express');

const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

const superagent=require('superagent');

router.get('/',function (req,res) {
    // const url='http://10.0.75.1:8085/personal/personHome?pageNumber=1';
    const url='http://wlgzs.org:9090/mock/42/personal/get';
    superagent
        .get(url)
        .end(function (err, data) {
            if(!err){
                const datas=JSON.parse(data.text).database.module;
                console.log(datas);
                res.render('allhobbs',{
                    datas:datas,
                })
            }

        });
})


module.exports = router;   /*暴露这个 router模块*/