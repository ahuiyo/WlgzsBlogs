const express=require('express');

const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

const superagent=require('superagent');

router.get('/',function (req,res) {
    // const url='http://10.0.75.1:8085/personal/personHome?pageNumber=1';
    const url='http://fcb55d3a76b1d123.natapp.cc/personal/get';
    let userid = req.session.user.userID;
    superagent
        .get(url)
        .query({userid:userid})
        .end(function (err, data) {
            if(!err){
                const datas=JSON.parse(data.text).database.module;

                res.render('allhobbs',{
                    datas:datas,
                })
            }

        });
})


module.exports = router;   /*暴露这个 router模块*/
