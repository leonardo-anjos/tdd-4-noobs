const UserService = require('../../services/userService');  

describe('UserService', () => {
  let userService;
  let mockDatabaseClient;

  beforeEach(() => {
    mockDatabaseClient = {
      findUserById: jest.fn(),
    };

    userService = new UserService(mockDatabaseClient);
  });

  it('should return a user by id', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    mockDatabaseClient.findUserById.mockResolvedValue(mockUser);
    const user = await userService.getUserById(1);
    expect(user).toEqual(mockUser);
  });

  it('should throw an exception error when id is not provided', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    mockDatabaseClient.findUserById.mockResolvedValue(mockUser);
    await expect(userService.getUserById()).rejects.toThrow('id is required');
  });
});
