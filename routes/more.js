const express =require('express');
const router = express.Router();
const superagent=require('superagent');

router.get('/',function(req,res){
    superagent
        .get("http://10.1.32.20:18080/home/many")
        .end(function (err,data) {
            var list = JSON.parse(data.text).data
            res.render('more',{
                list
            })
        })
}) 
 
module.exports = router;