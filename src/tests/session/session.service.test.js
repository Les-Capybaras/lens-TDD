import { describe, expect, it } from '@jest/globals';
import SessionService from '../../components/session/session.service';
import { mockSessions, mockSessionsRepository } from './session.mock';

describe('SessionService', () => {
    const sessionService = new SessionService(mockSessionsRepository);

    describe('createSession', () => {
        it('should be able to create a session', async () => {
            // GIVEN
            const sessionId = "10";
            const payload = {
                startDate: '2021-01-01T00:00:00.000Z',
            };

            const expectedSession = {
                ...payload,
                endDate: null,
                id: '10',
            };

            // WHEN
            const createdSession = await sessionService.createSession(payload);

            // THEN
            expect(createdSession).toEqual(expectedSession);
            expect(mockSessions).toHaveLength(4);
        });

        // TODO : implement the following tests

        // Nouveau test : devrait ne pas pouvoir créer une session si la dernière session n'est pas terminée
        it('should not be able to create a session if last session is not over', async () => {
             // GIVEN
             const lastSessionEndDate = new Date(mockSessions[mockSessions.length - 1].endDate);
             const payload = {
                 startDate: new Date(lastSessionEndDate.getTime() - 1000).toISOString(), // startDate juste avant la fin de la dernière session
             };
 
             // WHEN
             const createSession = sessionService.createSession(payload);
 
             // THEN
             await expect(createSession).rejects.toThrow('Cannot start a new session before the last one ends');
        });

        // Nouveau test : devrait ne pas pouvoir créer une session si stopDate < startDate
        it('should not be able to create a session if stopDate < startDate', async () => {
              // GIVEN
              const payload = {
                startDate: '2024-04-05T12:00:00.000Z',
                endDate: '2024-04-05T08:00:00.000Z', // stopDate avant startDate
            };

            // WHEN
            const createSession = sessionService.createSession(payload);

            // THEN
            await expect(createSession).rejects.toThrow('Stop date must be after start date');
        });

        it('should not be able to create a session if startDate is in an existing session', async () => {
                        // GIVEN
            const payload = {
                startDate: '2024-04-03T10:00:00.000Z', // startDate dans une session existante
            };

            // WHEN
            const createSession = sessionService.createSession(payload);

            // THEN
            await expect(createSession).rejects.toThrow('Session with overlapping start date already exists');
        });
    });

    describe('updateSession', () => {
        it('should be able to update a session', async () => {
            // GIVEN
            const sessionId = mockSessions[2].id;
            const updatedData = {
                endDate: '2024-04-06T23:00:00.000Z',
            };

            const expectedSession = {
                ...mockSessions[2],
                ...updatedData,
            };

            // WHEN
            const updatedSession = await sessionService.updateSession(sessionId, updatedData);

            // THEN
            expect(updatedSession).toEqual(expectedSession);
        });
        it('should not be able to update a session that does not exist', async () => {
            // GIVEN
            const sessionId = '100';
            const updatedData = {
                endDate: '2024-04-06T23:00:00.000Z',
            };

            // WHEN
            const updateSession = sessionService.updateSession(sessionId, updatedData);

            // THEN
            await expect(updateSession).rejects.toThrow('Could not update session');
        });
        // TODO : implement the following tests

         // Nouveau test : devrait ne pas pouvoir mettre à jour une session si stopDate < startDate
        it('should not be able to update a session if stopDate < startDate', async () => {
            // GIVEN
            const sessionId = mockSessions[2].id;
            const updatedData = {
                endDate: '2024-04-06T08:00:00.000Z', // stopDate avant startDate
            };

            // WHEN
            const updateSession = sessionService.updateSession(sessionId, updatedData);

            // THEN
            await expect(updateSession).rejects.toThrow('Stop date must be after start date');
        });
    });
    describe('getEstimatedStopDate', () => {
        it('should be able to calculate the estimated stop date when no sesison is completed', async () => {
            // GIVEN
            const startDate = new Date('2024-04-08T08:00:00.000Z');

            // WHEN
            const estimatedStopDate = await sessionService.getEstimatedStopDate(startDate);

            // THEN
            expect(estimatedStopDate).toEqual(new Date('2024-04-08T23:00:00.000Z'));
        });
        // TODO : implement the following tests
         // Nouveau test : devrait pouvoir calculer la date d'arrêt estimée lorsque les sessions sont terminées
        it('should be able to calculate the estimated stop date when sessions are completed', async () => {
             // GIVEN
             const startDate = new Date('2024-04-08T08:00:00.000Z');

             // WHEN
             const estimatedStopDate = await sessionService.getEstimatedStopDate(startDate);
 
             // THEN
             expect(estimatedStopDate).toEqual(new Date('2024-04-08T23:00:00.000Z'));
        });
    });
});
