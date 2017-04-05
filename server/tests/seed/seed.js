const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');

const userIdOne = new ObjectID();
const userIdTwo = new ObjectID();

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userIdOne
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userIdTwo
}];

const populateTodos = (done) => {
  Todo.remove({})
    .then(Todo.insertMany(todos)
      .then(() => done()));
};

const users = [
  {
    _id: userIdOne,
    email: 'John.Doe@example.com',
    password: 'UserOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userIdOne, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
  },
  {
    _id: userIdTwo,
    email: 'Janette.Doe@example.com',
    password: 'UserTwoPass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userIdTwo, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
  }
];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
