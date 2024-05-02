import { describe, expect, it } from '@jest/globals';
import SessionService from '../../components/session/session.service';
import { mockSessions, mockSessionsRepository } from './session.mock';
import { addHours, addMinutes, intervalToDuration } from "date-fns";


describe('SessionService', () => {
    const sessionService = new SessionService(mockSessionsRepository);

    describe('createSession', () => {
        it('should be able to create a session', async () => {
            // GIVEN
            const payload = {
                startDate: '2021-01-01T00:00:00.000Z',
            };

            const expectedSession = {
                ...payload,
                id: '10',
            };

            // WHEN
            const createdSession = await sessionService.createSession(payload);

            // THEN
            expect(createdSession).toEqual(expectedSession);
            expect(mockSessions).toHaveLength(5);
        });

        it('should throw a validation error if startDate is not a valid date', async () => {
            // GIVEN
            const payload = {
                startDate: 'invalid date',
            };

            // WHEN
            const createdSession = sessionService.createSession(payload);

            // THEN
            await expect(createdSession).rejects.toThrow('Invalid date');
        });
        it('should not be able to create a session if last session is not over', async () => {
            // GIVEN
            const lastSessionStartDate = mockSessions[2].startDate;
            const payload = {
                startDate: lastSessionStartDate, // Setting the start date as the end date of the last session
            };

            // WHEN
            const createdSession = () => sessionService.createSession(payload);

            // THEN
            expect(createdSession).toThrowError('Cannot create a new session before the last one is over');
        });
        it('should not be able to create a session if stopDate < startDate', async () => {

            // GIVEN
            const payload = {
                startDate: '2024-04-05T12:00:00.000Z',
                endDate: '2024-04-05T08:00:00.000Z', // stopDate avant startDate
            };

            // WHEN & THEN
            await expect(sessionService.createSession(payload)).rejects.toThrow('Stop date must be after start date');
        });


        it('should not be able to create a session if startDate is in an existing session', async () => {
            // GIVEN
            const payload = {
                userId: '1',
                startDate: '2024-04-06T08:00:00.000Z', // startDate dans une session existante
            };

            // WHEN & THEN
            await expect(sessionService.createSession(payload)).rejects.toThrow('Session with overlapping start date already exists');
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
        it('should not be able to update a session if stopDate < startDate', async () => {
            // GIVEN
            const sessionId = mockSessions[2].id;
            const updatedData = {
                endDate: '2024-04-08T06:00:00.000Z', // stopDate avant startDate
            };

            try {
                // WHEN
                const updateSession = await sessionService.updateSession(sessionId, updatedData);
            } catch (error) {
                // THEN
                expect(error.message).toBe('Could not update session');
            }
        });

    });
    describe('getEstimatedStopDate', () => {
        it('should be able to calculate the estimated stop date when no session is completed', async () => {
            // GIVEN
            const startDate = new Date('2024-04-08T08:00:00.000Z');

            // WHEN
            const estimatedStopDate = await sessionService.getEstimatedStopDate(startDate);

            // THEN
            expect(estimatedStopDate).toEqual(new Date('2024-04-08T23:00:00.000Z'));
        });
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
