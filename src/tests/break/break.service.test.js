import { describe, expect, it } from '@jest/globals';
import BreakService from '../../components/break/break.service';
import { mockBreaks, mockBreaksRepository } from './break.mock';
import { mockSessions } from '../session/session.mock';

describe('BreakService', () => {
  const breakService = new BreakService(mockBreaksRepository);

  describe('getBreaks', () => {
    it('should return the breaks list for any session', () => {
      // GIVEN
      const sessionId = mockSessions[0].id;

      // WHEN
      const breaks = breakService.getBreaks(sessionId);
      // THEN
      expect(breaks).toEqual(mockBreaks);
    });

    it('should return an empty array when no breaks are on database', () => {
      // GIVEN
      mockBreaksRepository.getBreaks.mockImplementationOnce(() => []);
      // WHEN
      const breaks = breakService.getBreaks();
      // THEN
      expect(breaks).toEqual([]);
    });

    it('should be able to create a break for a given session', async () => {
      // GIVEN
      const sessionId = mockSessions[2].id;
      const payload = {
        startDate: '2021-01-01T00:00:00.000Z',
        endDate: '2021-01-01T00:30:00.000Z',
        sessionId: sessionId,
      };

      const expectedBreak = {
        ...payload,
        id: '3',
      };

      // WHEN
      const createdBreak = await breakService.createBreak(payload);

      // THEN
      expect(createdBreak).toEqual(expectedBreak);
      expect(mockBreaks).toHaveLength(3);
    });

    it('should not be able to create a break for a session that already have a break', async () => {
      // GIVEN
      const sessionId = mockSessions[0].id;
      const payload = {
        startDate: '2021-01-01T00:00:00.000Z',
        endDate: '2021-01-01T00:30:00.000Z',
        sessionId: sessionId,
      };

      // WHEN
      const createdBreak = () => breakService.createBreak(payload);

      // THEN
      expect(createdBreak).toThrowError('Session already have a break');
    });

    it('should throw a valdiation error is endDate is set before startDate', async () => {
      // GIVEN
      const sessionId = mockSessions[0].id;
      const payload = {
        startDate: '2021-01-01T00:30:00.000Z',
        endDate: '2021-01-01T00:00:00.000Z',
        sessionId: sessionId,
      };

      // WHEN
      const createdBreak = () => breakService.createBreak(payload);

      // THEN
      expect(createdBreak).toThrowError('Start date must be before end date');
    });

    it('should throw a validation error when payload is not complete', async () => {
      // GIVEN
      const sessionId = mockSessions[0].id;
      const payload = {
        sessionId: sessionId,
      };

      // WHEN
      const createdBreak = () => breakService.createBreak(payload);

      // THEN
      expect(createdBreak).toThrowError('Missing required fields');
    });

    it('should throw a validation error when sessionId is not set', async () => {
      // GIVEN
      const payload = {
        startDate: '2021-01-01T00:00:00.000Z',
        endDate: '2021-01-01T00:30:00.000Z',
      };

      // WHEN
      const createdBreak = () => breakService.createBreak(payload);

      // THEN
      expect(createdBreak).toThrowError('Missing required sessionId fields');
    });
  });
});
