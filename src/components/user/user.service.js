class UserService {
  constructor(userRepository) {
    this.users = ['123'];
    this.userRepository = userRepository;
  }

  addUser = async (user) => {

    return await this.userRepository.addUser(user);
  };

  // TODO: Implement the following methods
  getUsers = async () => {
    return await this.userRepository.getUsers();
  };

  getUser = async (id) => {
    return await this.userRepository.getUser(id);
  };
}

export default UserService;
