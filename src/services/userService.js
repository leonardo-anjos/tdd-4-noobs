class UserService {
  constructor(databaseClient) {
    this.databaseClient = databaseClient;
  }

  async getUserById(id) {
    return await this.databaseClient.findUserById(id);
  }
}

module.exports = UserService;
