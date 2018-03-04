const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/usersV',(err,db) => {
    if(err){
        console.log('unable to connect tp mnggdb');
    }
    console.log('connected to db');
    db.collection('userv').insertOne({text:'ala',pass:'123'},(err,result ) => {
    if (err){
        return console.log("unable to insert to db");
    }
    console.log(JSON.stringify(result.ops,undefined,2));
    });
   db.close();
});
