const express = require('express');
const router = express.Router();
const superagent = require('superagent');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


//引入模板
const details = require('./details');
const owner = require('./owner');
const admin = require('./admin');
const user = require('./user');
const more = require('./more.js');
const personblog = require('./personblog');
const bloglist = require('./bloglist');
const hobbies = require('./hobbies')
const personblog =require('./personblog');
const bloglist =require('./bloglist');
const hobbies=require('./hobbies');
const allhobbs=require('./allhobbs');


//主页
router.get('/', function (req, res) {
    superagent
        //首页全部
        .get('http://10.1.32.20:18080/home/index')
        .end(function (err, data) {
           
            const list = JSON.parse(data.text).data;  //左边分类下面的推荐阅读
            const past = JSON.parse(data.text).past;  //右边推荐博客
            const cotegory = JSON.parse(data.text).cotegory;   //左边顶部分类标签
            const number = JSON.parse(data.text).dataother['information'];  //顶部各个部分的数量
            const userinfo = JSON.parse(data.text).user['user'];
            const ID = userinfo.id;   //登录用户的ID
            // indexImages   博客图片字段
            
            const imgarr = [];
            for(var i = 0;i<list.length;i++){
                imgarr.push(list[i].indexImages);
            }
            res.render('index', {
                data1: list,
                past,
                cotegory,
                number,
                imgarr,
                ID
            })
        });
});
//最新博客、推荐博客
function path1(res, url) {
    superagent
        .get(url)
        .end(function (err, data) {
            const list = JSON.parse(data.text).data;
            res.render('articel/blog', {
                data: list
            })
        });
}

//li  根据id进行查询博客
function path2(res, _id, url) {
    superagent
        .get(url)
        .query({ id: _id })
        .end(function (err, result) {
            const list = JSON.parse(result.text).data;
            const code = JSON.parse(result.text).code;
            //判断这个分类下面是否有内容
            if (code == -1){
                res.render('articel/no-data')
            } else{
                res.render('articel/blog',{
                    data:list
                })
            }
            res.render('articel/blog', {
                data: list
            })
        })
}

//类型的搜索(推荐、最新、li)
router.get('/articel/:name', function (req, res) {
    //最新博客
    if (req.params.name == 'getnew') {
        path1(res, 'http://10.1.32.20:18080/home/getnew')
    }
    else if (req.params.name == 'recommend') {
        path1(res, 'http://10.1.32.20:18080/home/recommend')
    }
    //剩下的几个标li签
    else {
        const val = req.params.name;
        path2(res, val, 'http://10.1.32.20:18080/home/getblogby')
    }
});

//处理点击搜索(模糊搜索)
router.post('/search', function (req, res) {
    const key = req.body.key;
    superagent
        .post('http://10.1.32.20:18080/home/searchfor')
        .query({ inquiries: key })
        .end(function (err, data) {
            const list = JSON.parse(data.text).data;
            res.send(list);
        })
});

//选择兴趣模块
router.use('/hobbies', hobbies)

//详情页
router.use('/details', details);

//本人资料页
router.use('/owner', owner);

//后台用户管理界面
router.use('/admin', admin);

//用户个人界面
router.use('/user', user);

//博客更多页面
router.use('/more', more);

//博主页面
router.use('/personblog', personblog);

//用户第一次登陆  选择兴趣
router.use('/hobbies',hobbies);

//用户所选择的所有兴趣词条页面
router.use('/allhobbs',allhobbs);

//博主分类页面
router.use('/bloglist', bloglist);

//登录
router.get('/login', function (req, res) {
    res.render('login');
});

//处理数据
router.post('/dologin', function (req, res) {
    var username = req.body.username;   //获取输入的用户名和密码
    var password = req.body.password;
    superagent
        .get('http://wlgzs.org:9090/mock/42/login')
        .type("form")
        .query({
            username: username,
            password: password
        })
        .end(function (err, data) {
            var code = JSON.parse(data.text).code;
            if (code == 0 || code == 1) {
                req.session.user = {
                    username,
                    password
                }
            }
            res.json(code);
        })
})

//登出
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.send('/login')
    })
});
module.exports = router;
