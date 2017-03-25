const _ = require('lodash');
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

// describe('POST /todos', () => {
//   it('create a new todo', (done) => {
//     var text = 'walk the dog';
//
//     request(app)
//       .post('/todos')
//       .send({text})
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.text).toBe(text)
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         Todo.find({text}).then((todos) => {
//           expect(todos.length).toBe(1);
//           expect(todos[0].text).toBe(text);
//           done();
//         }).catch((e) => {
//           done(e);
//         });
//       });
//   });
//
//   it('should not create new todo with invalid body data', (done) => {
//     request(app)
//       .post('/todos')
//       .send({})
//       .expect(400)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(2);
//           done();
//         }).catch((e) => {
//           done(e);
//         });
//       });
//   });
// });
//
// describe('GET /todos', () => {
//   it('should be able to fetch all todos', (done) => {
//     request(app)
//       .get('/todos')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todos.length).toBe(2);
//       })
//       .end(done);
//   })
// });
//
// describe('GET /todos/:id', () => {
//   it('should be able to fetch todo by id', (done) => {
//     request(app)
//       .get(`/todos/${todos[0]._id.toHexString()}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo._id).toBe(todos[0]._id.toHexString());
//         expect(res.body.todo.text).toBe('First test todo');
//       })
//       .end(done);
//   });
//
//   it('should fetch nothing for unexisting id', (done) => {
//     request(app)
//       .get('/todos/58c75e054b294d380591a269')
//       .expect(404)
//       .expect((res) => {
//         expect(res.body.todo).toBe(undefined);
//       })
//       .end(done);
//   });
//
//   it('should fetch nothing for invalid id', (done) => {
//     request(app)
//       .get('/todos/58c75e054b294d380591a26099')
//       .expect(404)
//       .expect((res) => {
//         expect(res.body.todo).toBe(undefined);
//       })
//       .end(done);
//   });
// });
//
// describe('DELETE /todos/:id', () => {
//   it('should be able to delete todo by id', (done) => {
//     var hexId = todos[0]._id.toHexString();
//     request(app)
//       .delete(`/todos/${hexId}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo._id).toBe(hexId);
//         expect(res.body.todo.text).toBe('First test todo');
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         Todo.findById(hexId).then((todo) => {
//           expect(todo).toNotExist();
//           done();
//         }).catch((e) => done(e));
//       });
//   });
//
//   it('should delete nothing for unexisting id', (done) => {
//     request(app)
//       .delete('/todos/58c75e054b294d380591a269')
//       .expect(404)
//       .expect((res) => {
//         expect(res.body.todo).toBe(undefined);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(2);
//           done();
//         }).catch((e) => {
//           done(e);
//         });
//       });
//   });
//
//   it('should delete nothing for invalid id', (done) => {
//     request(app)
//       .delete('/todos/58c75e054b294d380591a26099')
//       .expect(404)
//       .expect((res) => {
//         expect(res.body.todo).toBe(undefined);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(2);
//           done();
//         }).catch((e) => {
//           done(e);
//         });
//       });
//   });
// });
//
// describe('PATCH /todos/:id', () => {
//   it('should update the todo', (done) => {
//     var hexId = todos[0]._id.toHexString();
//     var todoUpdate = {
//       text: 'First test todo updated',
//       completed: true
//     };
//
//     request(app)
//       .patch(`/todos/${hexId}`)
//       .send(todoUpdate)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo._id).toBe(hexId);
//         expect(res.body.todo.text).toBe('First test todo updated');
//         expect(res.body.todo.completed).toBe(true);
//         expect(res.body.todo.completedAt).toBeA('number');
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         done();
//       });
//   });
//
//   it('should clear the completedAt when todo is not completed', (done) => {
//     var hexId = todos[1]._id.toHexString();
//     var todoUpdate = {
//       text: 'Second test todo updated',
//       completed: false
//     };
//
//     request(app)
//       .patch(`/todos/${hexId}`)
//       .send(todoUpdate)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo._id).toBe(hexId);
//         expect(res.body.todo.text).toBe('Second test todo updated');
//         expect(res.body.todo.completed).toBe(false);
//         expect(res.body.todo.completedAt).toNotExist();
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         done();
//       });
//   });
//
//   it('should clear the completedAt when completed is not a boolean', (done) => {
//     var hexId = todos[1]._id.toHexString();
//     var todoUpdate = {
//       text: 'Second test todo updated',
//       completed: '25'
//     };
//     request(app)
//       .patch(`/todos/${hexId}`)
//       .send(todoUpdate)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo._id).toBe(hexId);
//         expect(res.body.todo.text).toBe('Second test todo updated');
//         expect(res.body.todo.completed).toBe(false);
//         expect(res.body.todo.completedAt).toNotExist();
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         done();
//       });
//   });
//
//   it('should update nothing for unexisting id', (done) => {
//     request(app)
//       .patch('/todos/58c75e054b294d380591a269')
//       .send({
//         text: 'Second test todo updated',
//         completed: false
//       })
//       .expect(404)
//       .expect((res) => {
//         expect(res.body.todo).toBe(undefined);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(2);
//           done();
//         }).catch((e) => {
//           done(e);
//         });
//       });
//   });
//
//   it('should update nothing for invalid id', (done) => {
//     request(app)
//       .patch('/todos/58c75e054b294d380591a26099')
//       .send({
//         text: 'Second test todo updated',
//         completed: false
//       })
//       .expect(404)
//       .expect((res) => {
//         expect(res.body.todo).toBe(undefined);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(2);
//           done();
//         }).catch((e) => {
//           done(e);
//         });
//       });
//   });
// });
//
// describe('GET /users/me', () => {
//   it('should return user if authenticated', (done) => {
//     request(app)
//       .get('/users/me')
//       .set('x-auth', users[0].tokens[0].token)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body._id).toBe(users[0]._id.toHexString());
//         expect(res.body.email).toBe(users[0].email);
//       })
//       .end(done);
//
//
//   });
//
//   it('should return 401 if not authenticated', (done) => {
//     request(app)
//       .get('/users/me')
//       .expect(401)
//       .expect((res) => {
//         expect(res.body).toEqual({});
//       })
//       .end(done);
//   });
// });
//
// describe('POST /users', () => {
//   it('should create a user', (done) => {
//     var email = 'Julian.Greculescu@example.com';
//     var password = 'TopSecret!123';
//     request(app)
//       .post('/users')
//       .send({email, password})
//       .expect(200)
//       .expect((res) => {
//         expect(res.headers['x-auth']).toExist();
//         expect(res.body.email).toBe(email);
//         expect(res.body._id).toExist();
//       })
//       .end((err) => {
//         if (err) {
//           return done(err);
//         }
//
//         User.findOne({email}).then((user) => {
//           expect(user).toExist();
//           expect(user.password).toExist();
//           expect(user.password).toNotBe(password);
//           expect(user.email).toBe(email);
//           done();
//         }).catch((e) => {
//           done(e);
//         });
//       });
//   });
//
//   it('should return validation errors if invalid e-mail', (done) => {
//     request(app)
//       .post('/users')
//       .send({email: 'Julian.GreculescuAtExample.com', password: 'TopSecret!123'})
//       .expect(400)
//       .end(done);
//   });
//
//   it('should return validation errors if invalid password', (done) => {
//     request(app)
//       .post('/users')
//       .send({email: 'Julian.Greculescu@example.com', password: 'Short'})
//       .expect(400)
//       .end(done);
//   });
//
//   it('should  not create user if e-mail in use', (done) => {
//     request(app)
//       .post('/users')
//       .send({email: users[0].email, password: 'TopSecret!123'})
//       .expect(400)
//       .end(done);
//   });
// });

// describe('POST /users/login', () => {
//   it('should login user and return the auth token', (done) => {
//     var token;
//     request(app)
//       .post('/users/login')
//       .send({email: users[1].email, password: users[1].password})
//       .expect(200)
//       .expect((res) => {
//         expect(res.body._id).toBe(users[1]._id.toHexString());
//         expect(res.body.email).toBe(users[1].email);
//         token = res.headers['x-auth'];
//         expect(token).toExist();
//       })
//       .end((err) => {
//       if (err) {
//         return done(err);
//       }
//       User.findOne({email: users[1].email}).then((user) => {
//         expect(user.tokens[0].token).toBe(token);
//         done();
//       }).catch((e) => done(e));
//     });
//   });
//
//   it('should reject invalid login - not subscribed e-mail', (done) => {
//     request(app)
//       .post('/users/login')
//       .send({email: users[0].email + 1, password: users[0].password})
//       .expect(400)
//       .expect((res) => {
//         expect(res.header['x-auth']).toNotExist();
//       })
//       .end((err) => {
//         if (err) {
//           return done(err);
//         }
//         User.findOne({email: users[1].email}).then((user) => {
//           expect(user.tokens.length).toBe(0);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
//
//   it('should reject invalid login - invalid password', (done) => {
//     request(app)
//       .post('/users/login')
//       .send({email: users[0].email, password: users[0].password+ 1})
//       .expect(400)
//       .expect((res) => {
//         expect(res.header['x-auth']).toNotExist();
//       })
//       .end((err) => {
//         if (err) {
//           return done(err);
//         }
//         User.findOne({email: users[1].email}).then((user) => {
//           expect(user.tokens.length).toBe(0);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
// });

describe('DELETE /users/me/token', () => {
  it('should delete user token', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not delete user token if wrong x-auth', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token + 1)
      .expect(401)
      .end(done);
  });
});
