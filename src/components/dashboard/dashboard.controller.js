/* eslint-disable max-len */
import Dashboard from './dashboard.entities.js';

class DashboardController {
  constructor(DashboardService) {
    this.DashboardService = DashboardService;
  }

  getDashboardStats() {
    return this.DashboardService.getAllUserStats();
  }

  getUserStats(userId) {
    return this.DashboardService.getUserStats(userId);
  }
}

export default DashboardController;
