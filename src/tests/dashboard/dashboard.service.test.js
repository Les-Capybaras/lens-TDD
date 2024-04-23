import { describe, expect, it } from '@jest/globals';
import DashboardService from '../../components/dashboard/dashboard.service';
import { mockSessionsRepository } from '../session/session.mock';
import { mockBreaksRepository } from '../break/break.mock';

describe('DashboardService', () => {
  const dashboardService = new DashboardService(mockSessionsRepository, mockBreaksRepository);

  describe('get Dashboards', () => {
    it('should return the dashboards statistics far all users', async () => {
      // GIVEN
      const expectedDashboards = {
          totalSessions: 3,
          totalBreakTime: 60,
          totalDuration: 1860,
          mediumDuration: 620,
          mediumBreakTime: 30,
          minimumDuration: 0,
          minimumBreakTime: 30,
        };

      // WHEN
      const dashboards = await dashboardService.getAllUserStats();
      // THEN
      expect(dashboards).toEqual(expectedDashboards);
    });
  });

  describe('get User Dashboards', () => {
    it('should return the dashboards statistics for a specific user', async () => {
      // GIVEN
      const userId = '1'
      const expectedDashboards = {
          totalSessions: 2,
          totalBreakTime: 60,
          totalDuration: 1860,
          mediumDuration: 930,
          mediumBreakTime: 30,
          minimumDuration: 930,
          minimumBreakTime: 30,
        };

      // WHEN
      const dashboards = await dashboardService.getUserStats(userId);
      // THEN
      expect(dashboards).toEqual(expectedDashboards);
    });
  });
});
