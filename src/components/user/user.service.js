class UserService {
  constructor(userRepository) {
    this.users = [];
    this.userRepository = userRepository;
  }

  addUser = async (user) => {
    const dbUser = await this.userRepository.addUser(user);
    return dbUser;
  };

  getUsers = () => this.users;

  getUser = (id) => {
    const user = this.users.find((u) => u.id === id);
    return user;
  };
}

export default UserService;
