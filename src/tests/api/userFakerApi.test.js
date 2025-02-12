const request = require('supertest');

const apiUrl = 'https://fakerapi.it/api/v1/users';

jest.setTimeout(10000);

describe('GET /users', () => {
  
  it('should return an array of users with the expected fields', async () => {
    const response = await request(apiUrl).get('/'); 

    expect(response.status).toBe(200);

    expect(Array.isArray(response.body.data)).toBe(true);

    if (response.body.data.length > 0) {
      const user = response.body.data[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('firstname');
      expect(user).toHaveProperty('lastname');
      expect(user).toHaveProperty('email');
    }
  });

  it('should return users with valid email format', async () => {
    const response = await request(apiUrl).get('/'); 

    expect(response.status).toBe(200);

    response.body.data.forEach(user => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      expect(user.email).toMatch(emailRegex);
    });
  });

  it('should return a user with unique id', async () => {
    const response = await request(apiUrl).get('/');

    expect(response.status).toBe(200);

    const ids = response.body.data.map(user => user.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should return the correct number of users', async () => {
    const response = await request(apiUrl).get('/');

    expect(response.status).toBe(200);

    const expectedUserCount = 10;
    expect(response.body.data.length).toBe(expectedUserCount);
  });

  it('should return users with first and last names in proper format', async () => {
    const response = await request(apiUrl).get('/');

    expect(response.status).toBe(200);

    response.body.data.forEach(user => {
      expect(user.firstname).toMatch(/^[A-Z][a-z]+$/);
      expect(user.lastname).toMatch(/^[A-Z][a-z]+$/);
    });
  });
});
