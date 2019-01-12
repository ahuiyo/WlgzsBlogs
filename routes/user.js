const express=require('express');

const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

const superagent=require('superagent');

router.get('/',function (req,res) {

    const url='http://wlgzs.org:9090/mock/42/personal/personHome?pageNumber=1';
    superagent
        .get(url)
        .end(function (err, data) {
            superagent
                .get('http://wlgzs.org:9090/mock/42/personal/statistical')
                .end(function (err,ress) {
                    if(!err){
                        const datas=JSON.parse(data.text).data;
                        const database=JSON.parse(data.text).database;
                        const personInformation=JSON.parse(data.text).datacomments.personInformation;
                        const dataother=JSON.parse(data.text).dataother;
                        const data3=JSON.parse(ress.text).data;
                        for (var i in datas){
                            let labels=datas[i].label.split(',');
                            datas[i].label=labels;
                        }
                        res.render('user',{
                            data3,
                            datas:datas,
                            database:database,
                            personInformation:personInformation[0],
                            dataother:dataother,
                        })
                    }
                })
        });
});


module.exports = router;   /*暴露这个 router模块*/