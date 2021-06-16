import request from 'supertest';
import { initializeApp } from '../../app';
import { GroupModel, UserModel } from '../../models';

describe('Group router', () => {
  let app, token, groupOneId;
  const userOne = {
    login: 'user1',
    password: 'password123',
    isDeleted: false,
    age: 98,
  };
  const groupOne = { name: 'Share', permissions: ['READ', 'SHARE'] };

  beforeAll(async () => {
    app = await initializeApp();
    await UserModel.destroy({
      truncate: true,
    });
    await UserModel.create(userOne);
    const response = await request(app).post('/login').send({
      login: 'user1',
      password: 'password123',
    });
    token = JSON.parse(response.text).token;
  });

  beforeEach(async () => {
    await GroupModel.destroy({
      truncate: true,
    });
    const response = await GroupModel.create(groupOne);
    groupOneId = response.id;
  });

  test('should return group by pk', async () => {
    await request(app)
      .get(`/groups/${groupOneId}`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200);
  });

  test('should return not found group', async () => {
    await request(app)
      .get(`/groups/InvalidGroupId`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(500);
  });

  test('should return all groups', async () => {
    await request(app)
      .get('/groups')
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200);
  });

  test('should create a new group', async () => {
    const groupTwo = { name: 'Read', permissions: ['READ'] };

    await request(app)
      .post('/groups')
      .set('Authorization', 'Bearer ' + token)
      .send(groupTwo)
      .expect(200);
  });

  test('should update a group', async () => {
    const editedGroupOne = {
      name: 'Share',
      permissions: ['READ', 'WRITE', 'SHARE'],
    };
    await request(app)
      .put(`/groups/${groupOneId}`)
      .set('Authorization', 'Bearer ' + token)
      .send(editedGroupOne)
      .expect(200);
  });

  test('should delete a group', async () => {
    await request(app)
      .delete(`/groups/${groupOneId}`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200);
  });
});
