class UserService {
  constructor(databaseClient) {
    this.databaseClient = databaseClient;
  }

  async getUserById(id) {
    if (!id) {
      throw new Error("id is required");
    }

    if (typeof id !== 'string') {
      throw new Error('id must be a string');
    }
  
    const user = await this.databaseClient.findUserById(id);
  
    if (!user) {
      throw new Error("user not found");
    }
  
    return user;
  }
}

module.exports = UserService;
