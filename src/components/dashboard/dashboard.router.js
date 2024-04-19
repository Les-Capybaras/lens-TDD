import express from 'express';

class DashboardRouter {
  constructor(dashboardController) {
    this.dashboardController = dashboardController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.dashboardController.getUserStats);
    router.route('/').get(this.dashboardController.getDashboardStats);
    return router;
  }
}

export default DashboardRouter;
