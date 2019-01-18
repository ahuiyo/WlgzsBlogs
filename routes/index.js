const express = require('express');
const router = express.Router();
const superagent=require('superagent');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


//引入模板
const details =require('./details');
const owner =require('./owner');
const admin=require('./admin');
const user = require('./user');
const login = require('./login');
const more = require('./more.js');
const personblog =require('./personblog');
const bloglist =require('./bloglist');

//主页
router.get('/',function (req,res) {

    superagent
    //首页全部
       .get('http://wlgzs.org:9090/mock/42/index')
       .end(function (err,data) {
        const list=JSON.parse(data.text).data;  //左边分类下面的推荐阅读
        const past=JSON.parse(data.text).past;  //右边推荐博客
        const cotegory = JSON.parse(data.text).cotegory;   //左边顶部分类标签
        //左边最新博客
            superagent
                .get('http://wlgzs.org:9090/mock/42/home/getnew')
                .end(function (err, resu) {
                     const list2=JSON.parse(resu.text).data;
                    //右上角数量
                    superagent
                        .get('http://wlgzs.org:9090/mock/42/personal/statistical')
                        .end(function (err, data) {
                            const list3=JSON.parse(data.text).data;
                            res.render('index',{
                                data1:list,
                                past,
                                cotegory,
                                data2:list2,
                                data3:list3,
                            })
                        });
                })
       });
});


function path1(res,url){
    superagent
        .get(url)
        .end(function (err,data) {
            const list=JSON.parse(data.text).data;
            res.render('articel/blog',{
                data:list
            })
        });
}

//http://wlgzs.org:9090/mock/42/home/getBlogByCaId?id=4
//.query({id:_id})

//li  根据id进行查询博客
function path2(res,_id,url){
    superagent
        .get(url)
        .query({id:_id})
        .end(function (err,result) {
            const list=JSON.parse(result.text).data;
            const code=JSON.parse(result.text).code;
            //判断是否有内容
            // if (code == -1){
            //     res.render('articel/no-data')
            // } else{
            //     res.render('articel/blog',{
            //         data:list
            //     })
            // }
            res.render('articel/blog',{
                data:list
            })
        })
}

router.get('/articel/:name',function (req,res) {
    
    if (req.params.name=='getnew'){
        path1(res,'http://wlgzs.org:9090/mock/42/home/getnew')
    }
    else if (req.params.name=='recommend'){
        path1(res,'http://wlgzs.org:9090/mock/42/home/recommend')
    }
     //剩下的几个标li签
     else{
        const val=req.params.name;
        path2(res,val,'http://wlgzs.org:9090/mock/42/home/getblogby')
    }
});

//处理点击搜索
router.post('/search',function (req, res) {
    const key=req.body.key;
    superagent
        .get('http://wlgzs.org:9090/mock/42/home/searchfor')  //?inquiries=js
        // .query({inquiries:key})
        .end(function (err,data) {
            const list=JSON.parse(data.text).data;
            res.send(list);
        })
});

//详情页
router.use('/details',details);

//本人资料页
router.use('/owner',owner);

//后台用户管理界面
router.use('/admin',admin);

//用户个人界面
router.use('/user',user);
 
//登录
router.use('/login',login);

//博客更多页面
router.use('/more',more);

//博主页面
router.use('/personblog',personblog);

//博主分类页面
router.use('/bloglist',bloglist);
//登出
router.get('/logout',function (req, res) {
    req.session.destroy(function (err) {
        if (err){
            console.log(err);
        } else{
            res.send('/login')
        }
    })
});
module.exports = router;
