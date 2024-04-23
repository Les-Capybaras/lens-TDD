import SessionController from "./session.controller.js";
import SessionRouter from "./session.router.js";
import SessionService from "./session.service.js";
import SessionRepository from "./session.repository.js";
import SessionModel from "./session.model.js";


const sessionRepository = new SessionRepository(SessionModel);
const sessionService = new SessionService(sessionRepository);
const sessionController = new SessionController(sessionService);
const sessionRouter = new SessionRouter(sessionController);

export default {
  service: sessionService,
  controller: sessionController,
  router: sessionRouter.getRouter(),
};
