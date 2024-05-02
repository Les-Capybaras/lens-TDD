class UserRepository {

  constructor(UserModel) {
    this.User = UserModel;
  }

  async addUser(user) {
    try {
      const dbUser = new this.User(user.toJSON(true));
      await dbUser.save();
      return dbUser;
    } catch (error) {
      return error;
    }
  }

  async getUsers() {
    return await User.find();
  }

  async getUser(id) {
      return await User.findById(id);
  }
}

export default UserRepository;
