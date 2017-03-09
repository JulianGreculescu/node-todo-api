const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID("58c1c103f44306f160dda144")
  // }).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //     console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log('Todos count:', count);
  // }, (err) => {
  //     console.log('Unable to count todos', err);
  // });

  db.collection('Users').find({name: 'Julian'}).toArray()
    .then((users) => {
      console.log('Users:');
      console.log(JSON.stringify(users, undefined, 2));
  }, (err) => {
      console.log('Unable to fetch users', err);
  });

  // db.close();
});
