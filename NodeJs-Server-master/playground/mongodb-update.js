const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/usersV',(err,db) => {
    if(err){
        console.log('unable to connect tp mnggdb');
    }
    console.log('connected to db');
    db.collection('userv').findOneAndUpdate({
_id: new ObjectID("58d377bd1f2d0532818b4036")

    } ,{ $set:{name : "aaaaaa"} },//new value to update
    {returnOriginal: "AlaaZme"}/*what is supposed to be returned*/  ).then((result)=>{
        console.log(result);
    });

 
 });