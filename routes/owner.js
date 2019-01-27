const express = require('express');
const router = express.Router();
const superagent = require('superagent');


//owner页面
router.get('/', function (req, res) {
    let aid = req.query;
    req.session.userID = aid.id;   //得到登录用户id
    var name = aid.name;
    res.render('owner', {
        sID: req.session.userID,
        userName: req.session.user.username,
        name

    })
   
});

//直接返回data里的内容
function Ask(_href, name, res, sessionid) {
    superagent
        .get(_href)    //每个li请求的地址不同
        .query({})
        .end(function (err, data) {
            var list = JSON.parse(data.text).data;
            res.render('owner/' + name, {
                list,
                sessionid
            });
        })
}
//返回records里面的内容
function AskR(_href, name, res, sessionid) {
    superagent
        .get(_href)
        .end(function (err, rest) {
            var list = JSON.parse(rest.text).result.records;
            // var page = JSON.parse(rest.text).result;
            res.render('owner/' + name, {
                list,
                sessionid,
                // page
            });
        })
}
//需要分割label标签
function Asktags(_href, name, res, sessionid) {
    superagent
        .get(_href)
        .end(function (err, data) {
            var list = JSON.parse(data.text).data;
            for (var i in list) {
                var labels = list[i].label.split(',');
                list[i].label = labels;
            }
            res.render('owner/' + name, {
                list,
                sessionid
            });
        })
}
//侧边栏相应li点击
router.get('/:pathname', function (req, res) {
    //查询的时候带上参数
    let _name = req.params.pathname;
    var SID = req.session.userID;
    if (_name == 'tab1') {         //我的博客
        Asktags("http://10.1.32.20:18080/personal/listmy?id=" + SID, _name, res, SID);
    }
    else if (_name == 'tab2') {  //我的点赞
        Ask("http://10.1.32.20:18080/personal/listtwoparts?id=2&userid=" + SID, _name, res, SID);
    }
    else if (_name == 'tab3') {  //我的收藏
        Asktags("http://10.1.32.20:18080/personal/listtwoparts?id=7&userid=" + SID, _name, res, SID);
    }
    else if (_name == 'tab4') {  //我的评论
        AskR("http://10.1.32.20:18080/personal/listotherparts?id=3&userid=" + SID, _name, res, SID);
    }
    else if (_name == 'tab5') {  //我的关注
        AskR("http://10.1.32.20:18080/personal/listotherparts?id=1&userid=" + SID, _name, res, SID);
    }
    else if (_name == 'tab6') {  //我的粉丝
        AskR("http://10.1.32.20:18080/personal/myfan?id=9&userid=" + SID, _name, res, SID);
    }
    else if (_name == 'tab7') {   //我的消息
        AskR("http://10.1.32.20:18080/personal/listotherparts?id=5&userid=" + SID, _name, res, SID);
    }
    else if (_name == 'tab8') {
        //个人信息
        superagent
            .get('http://10.1.32.20:18080/personal/getinfo')
            .query({ userid: req.session.userID }) //传用户的id
            .end(function (err, data) {
                const list = JSON.parse(data.text).user.user;
                const datax = JSON.parse(data.text).data;
                const lable = JSON.parse(data.text).database.module;
                const cotegory = JSON.parse(data.text).cotegory;
                res.render('owner/' + _name, {
                    list,
                    lable,
                    cotegory,
                    dataID: datax.id
                });
                // console.log(data);
            })
    } else {
        Asktags('http://wlgzs.org:9090/mock/42/personal/listmy?id=18&status=draft', _name, res, SID)
    }
});

//删除我的消息
router.post('/delinfo', function (req, res) {
    var Bid = req.body._id;
    superagent
        .get('http://10.1.32.20:18080/personal/unsubscribe')
        .query({ id: Bid })
        .end(function (err, resu) {
            var list = JSON.parse(resu.text);
            res.send(list);
        })
});

// 清空全部消息
router.post('/delAllinfo', function (req, res) {
    superagent
        .get('http://10.1.32.20:18080/personal/delete')
        .query({ userid: req.session.userID }) //传用户的id
        .end(function (err, datat) {
            var list = JSON.parse(datat.text);
            res.send(list);
        })
});

//取消点赞
// router.post('/cancelGood', function (req, res) {
//     var _id = req.body._id;
//     superagent
//         .get('http://wlgzs.org:9090/mock/42/blog/savelike')
//         .query({ 'id': _id })
//         .end(function (err, result) {
//             var data = JSON.parse(result.text);
//             res.send(data);
//         }) 
// })

// 取消收藏
// router.post('/cancelcoll', function (req, res) {
//     var id = req.body._id;
//     superagent
//         .get('http://10.1.32.20:18080/blog/savecollect')
//         .query({'id': id}) 
//         .end(function (err, result) {
//             var data = JSON.parse(result.text);
//             res.send(data);
//         }) 
// })

//删除评论
// router.post('/decomment', function (req, res) {
//     var id = req.body._id;
//     superagent
//         .del('http://10.1.32.20:18080/blog/delete')    //DELETE请求 
//         .query({ 'id': id })
//         .end(function (err, data) {
//             var list = JSON.parse(data.text);
//             res.json(list);
//         })
// })

//我的粉丝  
// router.post('/fans',function(req,res){
//     var id = req.session.user.userID;
//     superagent
//         .get('http://10.1.32.20:18080/personal/myfan?id=9')
//         .query({userid:id})
//         .end(function(err,data){
//             var list = JSON.parse(data.text);
//             res.send(list);
//         })

// })

//个人资料页--保存按钮
router.post('/update', function (req, res) {
    var str = req.body.str;
    var _id = req.body._id;
    superagent
        .post('http://10.1.32.20:18080/personal/update')
        .type('form')  //想要以application/x-www-form-urlencoded格式发送数据 调用type()方法传入'form'默认json
        .send({ module: str })  //已经选择的所有标签的id
        .send({ id: _id })      //当前用户的主键
        .end(function (err, datas) {
            var list = JSON.parse(datas.text);
            res.send(list)
        })
})





//传回到页面中的参数
// res.send('hello')

module.exports = router;