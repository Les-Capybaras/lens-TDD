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

  updateSession = async (session) => {

  }

}

export default SessionService;
