export const mockSessions = [
    {
      id: '1',
      startDate: '2024-04-06T08:00:00.000Z',
      endDate: '2021-01-01T23:30:00.000Z',
    },
    {
      id: '2',
      startDate: '2024-04-06T08:00:00.000Z',
      endDate: '2021-01-01T23:30:00.000Z',
    },
    {
      id: '3',
      startDate: '2024-04-06T08:00:00.000Z',
      endDate: null,
    }
  ];

  export const mockSessionsRepository = {
  createSession: jest.fn( async (payload) => {
    const newSession = {
      ...payload,
      endDate: null,
      id: '10',
    };

    mockSessions.push(newSession);
    return newSession;
  }),
  getSessions: jest.fn(() => mockSessions),
  updateSession: jest.fn( async (sessionId, updatedData) => {
    const sessionIndex = mockSessions.findIndex((session) => session.id === sessionId);
    
    mockSessions[sessionIndex] = {
      ...mockSessions[sessionIndex],
      ...updatedData,
    };
    return mockSessions[sessionIndex];
  }),
};