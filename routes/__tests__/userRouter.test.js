import request from 'supertest';
import { initializeApp } from '../../app';
import { UserModel } from '../../models';

describe('User router', () => {
  let app, token, userOneId;
  const userOne = {
    login: 'user1',
    password: 'password123',
    isDeleted: false,
    age: 98,
  };
  beforeAll(async () => {
    app = await initializeApp();
  });

  beforeEach(async () => {
    await UserModel.destroy({
      truncate: true,
    });
    const response = await UserModel.create(userOne);
    userOneId = response.id;
  });

  test('should login successfully', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        login: 'user1',
        password: 'password123',
      })
      .expect(200);
    token = JSON.parse(response.text).token;
  });

  test('should return user by pk', async () => {
    await request(app)
      .get(`/users/${userOneId}`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200);
  });

  test('should return not found user', async () => {
    await request(app)
      .get(`/users/InvalidUserId`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(500);
  });

  test('should return all users', async () => {
    await request(app)
      .get('/users')
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200);
  });

  test('should create a new user', async () => {
    const userTwo = {
      login: 'user2',
      password: 'password1234',
      isDeleted: false,
      age: 42,
    };
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + token)
      .send(userTwo)
      .expect(200);
  });

  test('should update a user', async () => {
    const editedUserOne = {
      login: 'user1',
      password: 'password56',
      isDeleted: true,
      age: 99,
    };
    await request(app)
      .put(`/users/${userOneId}`)
      .set('Authorization', 'Bearer ' + token)
      .send(editedUserOne)
      .expect(200);
  });

  test('should delete a user', async () => {
    await request(app)
      .delete(`/users/${userOneId}`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200);
  });
});
