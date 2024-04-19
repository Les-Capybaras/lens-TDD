import { describe, expect, it } from '@jest/globals';
import SessionService from '../../components/session/session.service';
import { mockSessions, mockSessionsRepository } from './session.mock';

describe('BreakService', () => {
    const sessionService = new SessionService(mockSessionsRepository);

    describe('getSessions', () => {
        it('should return the sessions list', () => {
            // WHEN
            const sessions = sessionService.getSessions();
            // THEN
            expect(sessions).toEqual(mockSessions);
        });

        it('should return an empty array when no sessions in database', () => {
            // GIVEN
            mockSessionsRepository.getSessions.mockImplementation(() => []);
            // WHEN
            const sessions = sessionService.getSessions();
            // THEN
            expect(sessions).toEqual([]);
        });

        it('should be able to create a session', async () => {
            // GIVEN
            const sessionId = mockSessions[0].id;
            const payload = {
                startDate: '2021-01-01T00:00:00.000Z',
            };

            const expectedSession = {
                ...payload,
                id: '3',
            };

            // WHEN
            const createdSession = await sessionService.createSession(payload);

            // THEN
            expect(createdSession).toEqual(expectedSession);
            expect(mockSessions).toHaveLength(3);
        });

        //it('should not be able to create a break for a session that already have a break', async () => {
    });
});
