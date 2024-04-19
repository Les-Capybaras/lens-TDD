import { endOfDay, format, startOfDay } from 'date-fns';

export const mockSessions = [
  {
    id: '1',
    startDate: '2024-04-06T08:00:00.000Z',
    endDate: '2024-04-06T23:30:00.000Z',
    duration: 930,
    userId: '1',
  },
  {
    id: '2',
    startDate: '2024-04-07T08:00:00.000Z',
    endDate: '2024-04-07T23:30:00.000Z',
    duration: 930,
    userId: '1',
  },
  {
    id: '3',
    startDate: '2024-04-08T08:00:00.000Z',
    endDate: null,
    duration: null,
    userId: '1',
  }
];

export const mockSessionsRepository = {
  createSession: jest.fn(async (payload) => {
    const newSession = {
      ...payload,
      endDate: null,
      id: '10',
    };

    mockSessions.push(newSession);
    return newSession;
  }),
  getSessions: jest.fn(() => mockSessions),
  updateSession: jest.fn(async (sessionId, updatedData) => {
    const sessionIndex = mockSessions.findIndex((session) => session.id === sessionId);
    if (sessionIndex < 0) {
      throw new Error('Session not found');
    }
    mockSessions[sessionIndex] = {
      ...mockSessions[sessionIndex],
      ...updatedData,
    };

    return mockSessions[sessionIndex];
  }),
  getSessionsByDate: jest.fn(async (date) => {
    const start = startOfDay(date);
    const end = endOfDay(date);

    const sessions = mockSessions.filter((session) => {
      const sessionStartDate = new Date(session.startDate);
      return sessionStartDate >= start && sessionStartDate <= end;
    });
    return sessions;
    
  }),
};
