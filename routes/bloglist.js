const express = require('express');
const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
const bodyParser = require('body-parser');
const superagent = require('superagent');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());




router.get('/', function (req, res) {
    let aid = req.query;
    var userid = req.session.user.userID;
    const name=req.query.name;
    console.log(name);
    superagent
        .post('http://10.1.32.20:18080/personal/listblog')
        .type('form')
        .send({ 'name': name })
        .end(function (err, dataname) {
            superagent
                .get('http://10.1.32.20:18080/blog/list')
                .query({id:aid.id})
                .query({userid:userid})
                .end(function (err, data) {



                    if (!err) {
                        const datas = JSON.parse(dataname.text).data;
                        console.log(datas);
                        const result = JSON.parse(data.text).result;
                        const cotegory = JSON.parse(data.text).cotegory;

                        const user = JSON.parse(data.text).user.user;
                        const code = JSON.parse(data.text).code;
                        const past = JSON.parse(data.text).past;

                        // const database=JSON.parse(data.text).database;
                        // const personInformation=JSON.parse(data.text).datacomments.personInformation;
                        // const dataother=JSON.parse(data.text).dataother;

                        for (var i in datas) {
                            let labels = datas[i].label.split(',');
                            datas[i].label = labels;
                        }

                        res.render('personblog', {
                            datas,
                            result,
                            cotegory,

                            user,
                            code,
                            past,
                            ID:userid,
                        })
                    }

                })

        })


});


module.exports = router;   /*暴露这个 router模块*/