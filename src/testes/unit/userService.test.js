const UserService = require('../../services/userService');  

const mockDatabaseClient = {
  findUserById: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe' })
};

describe('UserService', () => {
  it('should return a user by id', async () => {
    const userService = new UserService(mockDatabaseClient);
    const user = await userService.getUserById(1);
    expect(user).toEqual({ id: 1, name: 'John Doe' });
  });
  
  it('should throw an exception error when id is not provided', async () => {
    const userService = new UserService(mockDatabaseClient);
    await expect(userService.getUserById()).rejects.toThrow('id is required');
  });
});
