const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.find({
//   _id: '58c75e054b294d380591a260'
// }).then((todos) => {
//   console.log('find', todos);
// });
//
// Todo.findOne({
//   _id: '58c75e054b294d380591a260'
// }).then((todo) => {
//   console.log('find onr', todo);
// });
//
// Todo.findById('58c75e054b294d380591a260')
//   .then((todo) => {
//   console.log('find by id', todo);
// });

User.findById('58c3033546e9ca300ef67c7e22').then((user) => {
  if (!user) {
    return console.log('No user found');
  }
  console.log('find user by id', user);
}).catch((e) => {
  console.log('unable to find user by id', e);
});
