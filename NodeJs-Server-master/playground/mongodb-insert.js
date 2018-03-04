const {MongoClient,ObjectID} = require('mongodb');
//var uri = 'mongodb://alaaZme:DSM@cluster0-shard-00-00-rw4h1.mongodb.net:27017,cluster0-shard-00-01-rw4h1.mongodb.net:27017,cluster0-shard-00-02-rw4h1.mongodb.net:27017/usersV?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
//var uri = "mongodb://alaaZme:DSM@mycluster0-shard-00-00-wpeiv.mongodb.net:27017,mycluster0-shard-00-01-wpeiv.mongodb.net:27017,mycluster0-shard-00-02-wpeiv.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin"

var uri = 'mongodb://alaaZme:123qwe@ds061676.mlab.com:61676/dsmdb';
//var uri = 'mongodb://localhost:27017/usersV';
MongoClient.connect(uri,(err,db) => {
    if(err){
        console.log('unable to connect tp mnggdb');
    }
    console.log('connected to db');

  /*  db.collection('userv').insertOne({
        text: "new user",
        pass :"123",
        mail: "unkown@gmail.com"              
    },(err,result)=>{
        if(err){
        return console.log("unable to insert");
        }
      console.log(JSON.stringify(result.ops,undefined,2))
      

});
   */
 // db.close();
});