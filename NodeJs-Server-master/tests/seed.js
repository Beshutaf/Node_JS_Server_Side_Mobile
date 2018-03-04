const {ObjectID} = require('mongodb');
const {user} = require('./../../models/user');
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{

    '_id':userOneId ,
    email:'alaazme@live.com',
    password: 'userOnePass',
    tokens: [{
        access:'auth',
        token: jwt.sign({_id: userOneId,access: 'auth'},'abc123').toString()
    }]
},{
     '_id':userTwoId ,
    email:'alaazme@live.com',
    password: 'userTwoPass'
}];
const populateUsers= (done)=>{
    user.remove({}).then(()=>{
 var userOne = new user(users[0]).save();
 var userTwo = new user(users[1]).save();

 return Promise.all([userOne,userTwo])
    }).then(()=>done());
};

module.exports= {users,populateUsers}