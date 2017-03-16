const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({
}).then((todos) => {
  console.log('remove', todos);
});

// Todo.findByIdAndRemove('58cad98af44306f160ddf699').then((todo) => {
//   console.log('find by id and remove', todo);
// });

// Todo.findById('58c75e054b294d380591a260')
//   .then((todo) => {
//   console.log('find by id', todo);
// });

// User.findById('58c3033546e9ca300ef67c7e22').then((user) => {
//   if (!user) {
//     return console.log('No user found');
//   }
//   console.log('find user by id', user);
// }).catch((e) => {
//   console.log('unable to find user by id', e);
// });
