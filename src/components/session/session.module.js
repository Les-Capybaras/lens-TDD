import SessionController from "./session.controller";
import SessionRouter from "./session.router";
import SessionService from "./session.service";
import SessionRepository from "./session.repository";


const sessionRepository = new SessionRepository(SessionModel);
const sessionService = new SessionService(sessionRepository);
const sessionController = new SessionController(sessionService);
const sessionRouter = new SessionRouter(sessionController);

export default {
  service: sessionService,
  controller: sessionController,
  router: sessionRouter.getRouter(),
};
