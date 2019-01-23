const express = require('express');

const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


const superagent = require('superagent');

router.get('/', function (req, res) {
    // const url='http://10.0.75.1:8085/personal/personHome?pageNumber=1';


    // let aid = req.body;
    let aid = req.query;

    const name=req.query.name;
    superagent
        .post('http://10.1.32.20:18080/personal/listblog')

        .send({ 'name': name })

        .end(function (err, dataname) {


            superagent
                .get('http://10.1.32.20:18080/blog/list')
                .query({id:aid.id})
                .end(function (err, data) {

                    superagent
                        .get('http://10.1.32.20:18080/personal/statistical')
                        .end(function (err, ress) {

                            if (!err) {
                                const datas = JSON.parse(dataname.text).data;

                                const result = JSON.parse(data.text).result;
                                const cotegory = JSON.parse(data.text).cotegory;
                                const data3 = JSON.parse(ress.text).data;
                                const user = JSON.parse(data.text).user.user;
                                const code = JSON.parse(data.text).code;
                                const past = JSON.parse(data.text).past;

                                // const database=JSON.parse(data.text).database;
                                // const personInformation=JSON.parse(data.text).datacomments.personInformation;
                                // const dataother=JSON.parse(data.text).dataother;

                                for (var i in datas) {
                                    let labels = datas[i].label.split('，');
                                    datas[i].label = labels;
                                }

                                res.render('personblog', {
                                    datas,
                                    result,
                                    cotegory,
                                    data3,
                                    user,
                                    code,
                                    past,
                                })
                            }
                        })
                })

        })


});


module.exports = router;   /*暴露这个 router模块*/