import userModule from '../components/user/user.module.js';
import sessionModule from '../components/session/session.module.js';
import breakModule from "../components/break/break.module.js";

export default (app) => {
  app.use('/users', userModule.router);
  app.use('/sessions', sessionModule.router);
  app.use('/breaks', breakModule.router)
};
