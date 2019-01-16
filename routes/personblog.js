const express=require('express');

const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/



const superagent=require('superagent');

router.get('/',function (req,res) {
    // const url='http://10.0.75.1:8085/personal/personHome?pageNumber=1';
    const url='http://wlgzs.org:9090/mock/42/blog/list?id=12';
    let aid=req.query;
    superagent
        .get(url)
        // .query(aid)
        .end(function (err, data) {
            superagent
                .get('http://wlgzs.org:9090/mock/42/personal/statistical')
                .end(function (err, ress) {
                    if (!err) {
                        const datas = JSON.parse(data.text).data;
                        const result= JSON.parse(data.text).result;
                        const cotegory= JSON.parse(data.text).cotegory;
                        const data3 = JSON.parse(ress.text).data;
                        const user=JSON.parse(data.text).user.user;
                        const code=JSON.parse(data.text).code;

                        // const database=JSON.parse(data.text).database;
                        // const personInformation=JSON.parse(data.text).datacomments.personInformation;
                        // const dataother=JSON.parse(data.text).dataother;

                        for (var i in datas){
                            let labels=datas[i].label.split('，');
                            datas[i].label=labels;
                        }

                        res.render('personblog', {
                            datas,
                            result,
                            cotegory,
                            data3,
                            user,
                            code,
                            // database:database,
                            // personInformation:personInformation[0],
                            // dataother:dataother,
                        })
                    }
                })
        })
});
router.get('/attention',function (req,res) {
    const url='http://wlgzs.org:9090/mock/42/blog/attention';
    let aid =req.query;
    superagent
        .get(url)
        .query(aid)
        .end(function (err,data) {
            if(!err){
                res.json(JSON.parse(data.text));
            }
        })
        


})


module.exports = router;   /*暴露这个 router模块*/