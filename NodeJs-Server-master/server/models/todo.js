var mongoose = require('mongoose');

var todo = mongoose.model('todo', {
	text: {
		type: String
	},
	pass: {
		type: String
	},
	mail: {
		type: String,
	}
});

module.exports = {
	todo
};

/*var newUser = new user({

    name:'alaZme'
});

var newUserr = new user({
  name:'ala',
  pass:"123",
 mail:"alaazme1@live.com"

});
newUserr.save().then((doc) =>{
    console.log("saved user", doc);
},(e)=>{
    console.log("saved user err doc",e);
})


*/