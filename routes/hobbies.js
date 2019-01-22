const express=require('express');
const router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const superagent=require('superagent');



router.get('/',function (req,res) {
    var user=req.session.user

    res.render('hobbies',{user});
});





module.exports = router;   /*暴露这个 router模块*/