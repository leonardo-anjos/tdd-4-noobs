class UserService {
  constructor(databaseClient) {
    this.databaseClient = databaseClient;
  }

  async getUserById(id) {
    if (!id) {
      throw new Error("id is required");
    }
    return await this.databaseClient.findUserById(id);
  }
}

module.exports = UserService;
