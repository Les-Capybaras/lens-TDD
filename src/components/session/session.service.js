import { addHours, addMinutes, intervalToDuration } from "date-fns";

class SessionService {
  constructor(sessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  getEstimatedStopDate = async (startDate) => {
    // Retrieve the sessions of the day
    const sessions = await this.sessionRepository.getSessionsByDate(startDate);

    const completedSessions = sessions.filter(session => session.duration !== null);
    let totalDuration = 0;
    if (completedSessions.length > 0) {
      completedSessions.forEach(session => {
        totalDuration += session.duration;
      });
    }

    let remainingDuration = 0;
    if (completedSessions.length > 0) {
        remainingDuration = 900 - totalDuration; // 15 hours converted to minutes
    } else {
        remainingDuration = 900; // If no completed sessions, set remaining duration to 15 hours
    }

    // Calculate the estimated stop date by adding the remaining time to the current date
    const estimatedStopDate = addMinutes(startDate, remainingDuration);

    console.log("estimatedStopDate", estimatedStopDate)

    return estimatedStopDate;
  };

  createSession = async (payload) => {
    return this.sessionRepository.createSession(payload);

  }

  updateSession = async (sessionId, updatedData) => {
    try {
      const updatedSession = await this.sessionRepository.updateSession(sessionId, updatedData);
      return updatedSession;
    } catch (error) {
      throw new Error("Could not update session");
    }
  }

}

export default SessionService;
