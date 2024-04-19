export const mockBreaks = [
  {
    id: '1',
    sessionId: '1',
    startDate: '2021-01-01T00:00:00.000Z',
    endDate: '2021-01-01T00:30:00.000Z',
    duration: 30,
  },
  {
    id: '2',
    sessionId: '2',
    startDate: '2021-01-01T01:00:00.000Z',
    endDate: '2021-01-01T01:30:00.000Z',
    duration: 30,
  },
];

export const mockBreaksRepository = {
  createBreak: jest.fn( async (payload) => {
    const newBreak = {
      ...payload,
      id: '3',
    };

    mockBreaks.push(newBreak);
    return newBreak;
  }),
  getBreaks: jest.fn(() => mockBreaks),
  getBreaksBySessionsId: jest.fn((sessionId) => mockBreaks.filter(breaks => breaks.sessionId === sessionId)),
  updateBreak: jest.fn(),
};
