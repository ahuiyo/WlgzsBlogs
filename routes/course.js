const express = require('express');
const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
const bodyParser = require('body-parser');
const superagent = require('superagent');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());





//  博客主页分页
router.get('/',function (req,res) {
    let aid=req.query;
    var userids = req.session.user.userID;
    // const url='http://wlgzs.org:9090/mock/42/blog/deleteblog?id=51';
        superagent
            .get('http://fcb55d3a76b1d123.natapp.cc/blog/list')
            .query({id:aid.id})
            .query({userid:userids})
            .query({pageNumber: aid.page})
            .end(function (err, data) {
                superagent
                    .get('http://fcb55d3a76b1d123.natapp.cc/home/index')
                    .query({userid : userids})
                    .end(function (err,ress) {
                        if (!err) {
                            const datas = JSON.parse(data.text).data;
                            const result= JSON.parse(data.text).result;
                            const cotegory= JSON.parse(data.text).cotegory;
                            const database = JSON.parse(data.text).database;
                            const user=JSON.parse(data.text).user.user;
                            const code=JSON.parse(data.text).code;
                            const past=JSON.parse(data.text).past;
                            const page=JSON.parse(data.text).page;
                            const number = JSON.parse(ress.text).dataother['information'];  //顶部各个部分的数量
                            // console.log(datas);

                            for (var i in datas){
                                let labels=datas[i].label.split(',');
                                datas[i].label=labels;
                            }

                            res.render('personblog', {
                                datas,
                                result,
                                cotegory,
                                database,
                                user,
                                code,
                                past,
                                ID:userids,
                                page:page,
                                number,
                            })
                        }
                    })


            })


});

module.exports = router;   /*暴露这个 router模块*/
