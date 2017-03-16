const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/todo_app';
if (process.env.MONGODB_URL) {
  mongoose.connect(dbUrl, {server: {socketOptions: {connectTimeoutMS: 30000, socketTimeoutMS: 10000}}});
} else {
  mongoose.connect(dbUrl);
}
