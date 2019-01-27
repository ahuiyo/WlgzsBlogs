const express = require('express');
const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
const bodyParser = require('body-parser');
const superagent = require('superagent');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());





// 草稿
router.get('/',function (req,res) {
    let aid=req.query;
    var userids = req.session.user.userID;
    const url='http://wlgzs.org:9090/mock/42/personal/listmy';
    // const url='http://wlgzs.org:9090/mock/42/blog/deleteblog?id=51';
    superagent
        .get(url)
        .query(aid)
        .query({'status':'draft'})
        .end(function (err,dataname) {
            superagent
                .get('http://10.1.32.20:18080/blog/list')
                .query({id:aid.id})
                .query({userid:userids})
                .end(function (err, data) {
                    superagent
                        .get('http://10.1.32.20:18080/home/index')
                        .query({userid : userids})
                        .end(function (err,ress) {
                            if (!err) {
                                const datas = JSON.parse(dataname.text).data;
                                const result = JSON.parse(data.text).result;
                                const cotegory = JSON.parse(data.text).cotegory;
                                const number = JSON.parse(ress.text).dataother['information'];  //顶部各个部分的数量
                                const user = JSON.parse(data.text).user.user;
                                const code = JSON.parse(data.text).code;
                                const past = JSON.parse(data.text).past;
                                const page=JSON.parse(data.text).page;
                                const database=JSON.parse(data.text).database;
                                // const personInformation=JSON.parse(data.text).datacomments.personInformation;
                                // const dataother=JSON.parse(data.text).dataother;

                                for (var i in datas) {
                                    let labels = datas[i].label.split(',');
                                    datas[i].label = labels;
                                }

                                res.render('listmy', {
                                    datas,
                                    result,
                                    cotegory,
                                    database,
                                    user,
                                    code,
                                    past,
                                    page,
                                    ID:userids,
                                    number,
                                })
                            }
                        })





                })

        })
});

module.exports = router;   /*暴露这个 router模块*/