import { addHours } from "date-fns";

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

  getEstimatedStopDate = async (startDate) => {
    // Ajouter 15 heures à la startDate
    const estimatedStopDate = addHours(startDate, 15);
    return estimatedStopDate;
  };

}

export default SessionService;
