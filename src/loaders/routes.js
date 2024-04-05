// import taskModule from '../components/task/task.module.js';
import userModule from '../components/user/user.module.js';

export default (app) => {
  app.use('/users', userModule.router);
  // app.use('/tasks', taskModule.router);
};
