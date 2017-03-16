const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var todos;

beforeEach((done) => {
  todos = [
    {_id: new ObjectID(), text: 'First test todo'},
    {_id: new ObjectID(), text: 'Second test todo'}
    ];
  Todo.remove({})
    .then(Todo.insertMany(todos)
    .then(() => done()));
});

describe('POST /todos', () => {
  it('create a new todo', (done) => {
    var text = 'walk the dog';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });

  it('should not create new todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });
});

describe('GET /todos', () => {
  it('should be able to fetch all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
});

describe('GET /todos/:id', () => {
  it('should be able to fetch todo by id', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(todos[0]._id.toHexString());
        expect(res.body.todo.text).toBe('First test todo');
      })
      .end(done);
  });

  it('should fetch nothing for unexisting id', (done) => {
    request(app)
      .get('/todos/58c75e054b294d380591a269')
      .expect(404)
      .expect((res) => {
        expect(res.body.todo).toBe(undefined);
      })
      .end(done);
  });

  it('should fetch nothing for invalid id', (done) => {
    request(app)
      .get('/todos/58c75e054b294d380591a26099')
      .expect(404)
      .expect((res) => {
        expect(res.body.todo).toBe(undefined);
      })
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should be able to delete todo by id', (done) => {
    var hexId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.text).toBe('First test todo');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should delete nothing for unexisting id', (done) => {
    request(app)
      .delete('/todos/58c75e054b294d380591a269')
      .expect(404)
      .expect((res) => {
        expect(res.body.todo).toBe(undefined);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });

  it('should delete nothing for invalid id', (done) => {
    request(app)
      .delete('/todos/58c75e054b294d380591a26099')
      .expect(404)
      .expect((res) => {
        expect(res.body.todo).toBe(undefined);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });
});

