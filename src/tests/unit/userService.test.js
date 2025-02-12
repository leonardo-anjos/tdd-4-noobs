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
    const mockUser = { id: 'asdas87a9sdas-asdasdas87das-asdas-das', name: 'John Doe' };
    mockDatabaseClient.findUserById.mockResolvedValue(mockUser);
    const user = await userService.getUserById(mockUser.id);
    expect(user).toEqual(mockUser);
  });

  it('should throw an exception error when id is not provided', async () => {
    await expect(userService.getUserById()).rejects.toThrow('id is required');
  });

  it('should throw an exception error when id is a empty string', async () => {
    await expect(userService.getUserById('')).rejects.toThrow('id is required');
  });

  it('should throw an exception error when id is not a string', async () => {
    await expect(userService.getUserById(1)).rejects.toThrow('id must be a string');
  });

  it('should throw an exception error when user is not found', async () => {
    mockDatabaseClient.findUserById.mockResolvedValue(null);
    await expect(userService.getUserById('da9s87d8as-asda8s9d87as-87asda6s78d')).rejects.toThrow('user not found');
  });
});
