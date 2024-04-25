import BreakController from './break.controller.js';
import BreakService from './break.service.js';
import BreakRouter from './break.router.js';
import BreakRepository from './break.repository.js';
import BreakModel from './break.model.js';
import SessionModel from '../session/session.model.js';
import SessionRepository from '../session/session.repository.js';

const breakRepository = new BreakRepository(BreakModel);
const sessionRepository = new SessionRepository(SessionModel);
const breakService = new BreakService(breakRepository, sessionRepository);
const breakController = new BreakController(breakService);
const breakRouter = new BreakRouter(breakController);

export default {
  service: breakService,
  controller: breakController,
  router: breakRouter.getRouter(),
};
