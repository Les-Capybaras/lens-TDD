import DashboardController from './break.controller.js';
import DashboardService from './break.service.js';
import DashboardRouter from './break.router.js';
import SessionRepository from '../session/session.repository.js';
import BreakRepository from '../break/break.repository.js';


const dashboardService = new DashboardService(SessionRepository, BreakRepository);
const dashboardController = new DashboardController(DashboardService);
const dashboardRouter = new DashboardRouter(DashboardController);

export default {
  service: dashboardService,
  controller: dashboardController,
  router: dashboardRouter.getRouter(),
};
