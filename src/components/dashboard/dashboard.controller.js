
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
