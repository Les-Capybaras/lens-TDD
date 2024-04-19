class SessionRepository {

  constructor(SessionModel) {
    this.Session = SessionModel;
  }

  async getSessions() {
    return this.Session.find();
  }

  async getSession(id) {

  }

  async createSession(sessionId, payload) {
    const newSession = new this.Session({
      ...payload,
      sessionId,
    });

    return newSession.save();
  }

  async updateSession(session) {

  }
}

export default SessionRepository;