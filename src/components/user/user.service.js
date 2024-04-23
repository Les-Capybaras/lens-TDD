class UserService {
  constructor(userRepository) {
    this.users = [];
    this.userRepository = userRepository;
  }

  addUser = async (user) => {
    return await this.userRepository.addUser(user);
  };

  // TODO: Implement the following methods
  getUsers = () => this.users;
  
  getUser = (id) => {
    return this.users.find((u) => u.id === id);
  };
}

export default UserService;
