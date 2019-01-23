const express=require('express');
const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const superagent=require('superagent');



//登录
router.get('/',function(req,res){
    res.render('login');
});

//处理数据
router.post('/dologin',function (req,res) {
    var username = req.body.username;   //获取输入的用户名和密码
    var password = req.body.password;
    superagent
        .get('http://10.1.32.20:18080/login')
        .type("form")     
        .query({
            username: username, 
            password: password
        })
        .end(function (err, data) {
            var code = JSON.parse(data.text).code;
            var data1 = JSON.parse(data.text).data;   //博客
            var user = JSON.parse(data.text).user.user;
            var past = JSON.parse(data.text).past;    //
            var cotegory = JSON.parse(data.text).cotegory;  //类型

            //用户名保存session
            req.locals.userinfo = users;
            req.session.userinfo = users;  

            // code=0 老用户 code=-1是新用户
            // if (code==0){
            //     console.log(req.session.userinfo);     //打印显示
            //     res.render('index'); 
            // } else{
            //     console.log("555");
            // }
        });
});


module.exports = router;   /*暴露这个 router模块*/
