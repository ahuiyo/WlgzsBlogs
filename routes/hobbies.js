const express=require('express');

const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

const superagent=require('superagent');

router.get('/',function (req,res) {
    // const url='http://10.0.75.1:8085/personal/personHome?pageNumber=1';
    const url='http://10.1.32.20:18080/home/gettype';
    superagent
        .get(url)
        .end(function (err, data) {
            if(!err){
                const datas=JSON.parse(data.text).data;

                res.render('hobbies',{
                    datas:datas,
                })
            }

        });
});

router.get('/save',function (req,res) {
    // const url='http://10.0.75.1:8085/personal/personHome?pageNumber=1';
    const url='http://10.1.32.20:18080/personal/save';
    console.log(req.query);
    superagent
        .get(url)
        .query(req.query)
        .end(function (err, data) {
            if(!err){

                console.log(JSON.parse(data.text));
                res.json(JSON.parse(data.text));
            }

        });
});



module.exports = router;   /*暴露这个 router模块*/