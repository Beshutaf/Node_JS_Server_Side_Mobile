const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');

var id = "58d40ea5689466941e03159a";
if(!ObjectID.isValid(id)){
    console.log("id not valid");
    return;
}
todo.find({
    _id:id
}).then((todos)=>{

    console.log('todos',todos);
})

todo.findOne({
    _id:id
}).then((todo)=>{

    console.log("todo",todo);
});

todo.findById(id).then((todo)=>{
    if(!todo){
   console.log("wrong username");
    }
else
    console.log("todo by id ",todo);
}).catch((e)=>console.log(e));
