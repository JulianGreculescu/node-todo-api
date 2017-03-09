const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').deleteMany({text: 'Eat lunch'})
  //   .then((result) => {
  //     console.log(result);
  // });

  // db.collection('Todos').deleteOne({text: 'Eat lunch'})
  //   .then((result) => {
  //     console.log(result);
  // });

  // db.collection('Todos').findOneAndDelete({completed: false})
  //   .then((result) => {
  //     console.log(result);
  // });
  //

  // db.collection('Users').deleteMany({name: 'Julian'})
  //   .then((result) => {
  //     console.log(result);
  // });
  //
  db.collection('Users').findOneAndDelete({_id: new ObjectID("58c0f466b0ca7b18506c7952")})
    .then((result) => {
      console.log(result);
  });

  // db.close();
});
