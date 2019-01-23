const express = require('express');
const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
const bodyParser = require('body-parser');
const superagent = require('superagent');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());




router.get('/', function (req, res) {
    // let aid = req.body;
    let aid = req.query;
    const name=req.query.name;
    superagent
        .post('http://10.1.32.20:18080/personal/listblog')
<<<<<<< HEAD

        // .post('http://wlgzs.org:9090/mock/42/personal/listblog')
=======
>>>>>>> 85f9b939173fbf7517720c7ae44347a41f88aeb0
        .send({ 'name': name })
        .end(function (err, dataname) {
            superagent
                .get('http://10.1.32.20:18080/blog/list')
                .query({id:aid.id})
                .end(function (err, data) {



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

                                res.render('bloglist', {
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


});


module.exports = router;   /*暴露这个 router模块*/
