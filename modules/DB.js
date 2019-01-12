const ObjectID =require('mongodb').ObjectID;
//引入数据库
const Mongodb =require('mongodb');
const MongoClient =Mongodb.MongoClient;
//数据库地址+数据库名称
const Dburl ='mongodb://localhost:27017/user';

function _connect(callback) {
    MongoClient.connect(Dburl,{ useNewUrlParser: true },function (err,db) {
        if (err) {
            console.log(err);
            return;
        }
        callback(db)
    })
}

//暴露 ObjectID
// exports.ObjectID=ObjectID;


//查找内容
exports.find=function (dataBase,collectionname,json,callback) {
    _connect(function (db) {
        const client=db.db(dataBase);
        const result=client.collection(collectionname).find(json);
        result.toArray(function (error,data) {
            db.close();
            callback(error,data)
        })
    })
};


//增加内容
exports.insert=function (dataBase,collectionname,json,callback) {
    _connect(function (db) {
        const client=db.db(dataBase);
        const result=client.collection(collectionname).insert(json,function (error,data) {
            callback(error,data);
        });
    })
};


//删除内容
exports.delete=function (dataBase,collectionname,json,callback) {
    _connect(function (db) {
        const client=db.db(dataBase);
        const result=client.collection(collectionname).delete(json,function (error,data) {
            callback(error,data);
        })
    })
};



//更新内容
exports.updata=function (dataBase,collectionname,json1,json2,callback) {
    _connect(function (db) {
        const client=db.db(dataBase);
        const result=client.collection(collectionname).updata(json1,{$set:json2},function (error,data){
            callback(error,data);
        })
    })
};







