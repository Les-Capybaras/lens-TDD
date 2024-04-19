class SessionService {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  getSessions = async () => {

  }

  getSession = async (id) => {

  }

  createSession = async (payload) => {
    return this.sessionRepository.createSession(payload);

  }

  updateSession = async (sessionId, updatedData) => {
    try {
      const updatedSession = await this.sessionRepository.updateSession(sessionId, updatedData);
      return updatedSession;
    } catch (error) {
      throw new Error("Could not update session: " + error.message);
    }
  }

}

export default SessionService;
