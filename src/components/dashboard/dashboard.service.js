class DashboardService {
  constructor(sessionRepository, breakRepository) {
    this.sessionRepository = sessionRepository;
    this.breakRepository = breakRepository;
  }

  async getAllUserStats() {
    const sessions = this.sessionRepository.getSessions()
    const breaks = this.breakRepository.getBreaks()

    return this.aggregateData(sessions, breaks);
  }

  async getUserStats(userId) {
    const sessions = this.sessionRepository.getSessionsByUserId(userId)
    const breaks = sessions.map(session => this.breakRepository.getBreaksBySessionsId(session.id)).flat()

    return this.aggregateData(sessions, breaks);
  }

  aggregateData(sessions, breaks) {
    return {
      totalSessions: sessions.length,
      totalBreakTime: breaks.reduce((acc, breakItem) => acc + breakItem.duration, 0),
      totalDuration: sessions.reduce((acc, session) => acc + session.duration, 0),
      mediumDuration: sessions.reduce((acc, session) => acc + session.duration, 0) / sessions.length,
      mediumBreakTime: breaks.reduce((acc, breakItem) => acc + breakItem.duration, 0) / breaks.length,
      minimumDuration: Math.min(...sessions.map(session => session.duration ?? 0)),
      minimumBreakTime: Math.min(...breaks.map(breakItem => breakItem.duration ?? 0)),
    };
  }

}

export default DashboardService;
