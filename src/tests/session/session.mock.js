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
      duration : 930,
      userId: '1',
    },
    {
      id: '3',
      startDate: '2024-04-06T08:00:00.000Z',
      endDate: null,
      duration: null,
      userId: '2',
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
  getSessionsByUserId: jest.fn((userId) => mockSessions.filter(session => session.userId === userId)),
  updateSession: jest.fn( async (sessionId, updatedData) => {
    const sessionIndex = mockSessions.findIndex((session) => session.id === sessionId);
    
    mockSessions[sessionIndex] = {
      ...mockSessions[sessionIndex],
      ...updatedData,
    };
    return mockSessions[sessionIndex];
  }),
};