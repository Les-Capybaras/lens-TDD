import UserController from './user.controller.js';
import UserService from './user.service.js';
import UserRouter from './user.router.js';
import UserRepository from './user.repository.js';
import UserModel from './user.model.js';

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

export default {
  service: userService,
  controller: userController,
  router: userRouter.getRouter(),
};
