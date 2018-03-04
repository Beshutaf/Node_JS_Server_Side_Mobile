const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/usersV',(err,db) => {
    if(err){
        console.log('unable to connect tp mnggdb');
    }
    console.log('connected to db');
    db.collection('userv').find({text:"ala"}).toArray().then((docs)=>{
   console.log("users");
     console.log( JSON.stringify(docs,undefined,2));//{
 //     console.log("FOUND");
 // }
  //console.log(JSON.stringify(docs,undefined,2).name==);
    },(err)=>{
console.log("unable to fetch user");
    });
  
 //  db.close();
});
