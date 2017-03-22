const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'TopSecret123!';
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hassh) => {
//     console.log(hassh);
//   });
// });

var hashedPassword = '1$2a$10$K6u8QXEGd8ocG/e2ofZL2uxbUUDm5rVm0HTe.UBmOX93pj3jaky36';
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log((res));
});


// var data = {
//   id: 10
// };
//
//
// var token = jwt.sign(data, 'TopSecret123');
// console.log('token', token);
//
// var decoded = jwt.verify(token, 'TopSecret123');
// console.log('decoded', decoded);


// var message = 'I am the user no 3';
// var hash = SHA256(message).toString();
//
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
// };
//
// // token.data.id = 4;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// hashResult = SHA256(JSON.stringify(token.data) + 'someSecret').toString();
//
// if (hashResult === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was change. Do not trust!d');
// }
