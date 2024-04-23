// import taskModule from '../components/task/task.module.js';
import userModule from '../components/user/user.module.js';
import sessionModule from '../components/session/session.module.js';
import breakModule from '../components/break/break.module.js';
import dashboardModule from '../components/dashboard/dashboard.module.js';

export default (app) => {
  app.use('/users', userModule.router);
  // app.use('/tasks', taskModule.router);
  app.use('/sessions', sessionModule.router);
  app.use('/breaks', breakModule.router);
  app.use('/dashboard', dashboardModule.router);
};
