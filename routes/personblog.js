const express=require('express');
const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
const superagent=require('superagent');

router.get('/',function (req,res) {
    let userid = req.session.user.userID;
    const url='http://10.1.32.20:18080/blog/list';
    let aid=req.query;
    superagent
        .get(url)
        .query(aid)
        .query({userid:userid})
        .end(function (err, data) {
            // superagent
                // .get('http://10.1.32.20:18080/personal/statistical')
                // .end(function (err, ress) {
                    if (!err) {
                        const datas = JSON.parse(data.text).data;
                        const result= JSON.parse(data.text).result;
                        const cotegory= JSON.parse(data.text).cotegory;
                        const database = JSON.parse(data.text).database;
                        const user=JSON.parse(data.text).user.user;
                        const code=JSON.parse(data.text).code;
                        const past=JSON.parse(data.text).past;
                        // const database=JSON.parse(data.text).database;
                        // const personInformation=JSON.parse(data.text).datacomments.personInformation;
                        console.log(database);

                        for (var i in datas){
                            let labels=datas[i].label.split(',');
                            datas[i].label=labels;
                        }

                        res.render('personblog', {
                            datas,
                            result,
                            cotegory,
                            // data3,
                            user,
                            code,
                            past,
                            ID:userid,
                        })
                    }
                // })
        })
});
router.get('/attention',function (req,res) {
    const url='http://10.1.32.20:18080/blog/attention';
    let aid =req.query;
    let userid = req.session.user.userID;
    superagent
        .get(url)
        .query(aid)
        .query({userid:userid})
        .end(function (err,data) {
            if(!err){
                res.json(JSON.parse(data.text));
            }
        })
});

//删除博客
router.get('/deleteblog',function (req,res) {
    let aid=req.query;
    console.log(aid);
    const url='http://10.1.32.20:18080/blog/deleteblog';
    // const url='http://wlgzs.org:9090/mock/42/blog/deleteblog?id=51';
    superagent
        .get(url)
        .query(aid)
        .end(function (err,data) {
            console.log(JSON.parse(data.text));
               if(!err){
                   res.json( JSON.parse(data.text));
               }

        })
});



module.exports = router;   /*暴露这个 router模块*/