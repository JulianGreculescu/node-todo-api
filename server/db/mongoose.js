const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var dbUrl = process.env.MONGODB_URL;
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(dbUrl, {server: {socketOptions: {connectTimeoutMS: 30000, socketTimeoutMS: 10000}}});
} else {
  mongoose.connect(dbUrl);
}
