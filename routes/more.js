const express =require('express');
const router = express.Router();
const superagent=require('superagent');

router.get('/',function(req,res){
    superagent
        .get("http://wlgzs.org:9090/mock/42/home/many")
        .end(function (err,data) {
            var list = JSON.parse(data.text).data
            res.render('more',{
                list
            })
        })
})
 
module.exports = router;