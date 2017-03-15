const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if (process.env.PORT) {
  mongoose.connect('mongodb://julian:nailuj@ds131510.mlab.com:31510/todo_app',
    {server: {socketOptions: {connectTimeoutMS: 30000, socketTimeoutMS: 10000}}});
} else {
  mongoose.connect('mongodb://localhost:27017/todo_app');
}
//mongoose.connect('mongodb://localhost:27017/TodoApp');

