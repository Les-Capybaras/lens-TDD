import DashboardController from './dashboard.controller.js';
import DashboardService from './dashboard.service.js';
import DashboardRouter from './dashboard.router.js';
import SessionRepository from '../session/session.repository.js';
import BreakRepository from '../break/break.repository.js';


const dashboardService = new DashboardService(SessionRepository, BreakRepository);
const dashboardController = new DashboardController(dashboardService);
const dashboardRouter = new DashboardRouter(dashboardController);

export default {
  service: dashboardService,
  controller: dashboardController,
  router: dashboardRouter.getRouter(),
};
