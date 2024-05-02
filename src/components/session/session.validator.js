class SessionValidator {
    constructor(sessionRepository) {
      this.sessionRepository = sessionRepository;
    }

    createSessionValidator(payload) {
        if (!payload.startDate) {
            throw new Error('Missing required fields');
        }

        if (isNaN(new Date(payload.startDate))) {
            throw new Error('Invalid date');
        }

        if (payload.endDate && new Date(payload.endDate) < new Date(payload.startDate)) {
            throw new Error('Stop date must be after start date');
        }
        console.log("jaj")

        // should not be able to create a session if last session is not over
        const sessions = this.sessionRepository.getSessionsByUserId(payload.userId);
        console.log(sessions)
        const sessionsWithSameDate = sessions.filter(session => new Date(session.startDate).toDateString() === new Date(payload.startDate).toDateString());
        
        if (sessionsWithSameDate.length > 0) {
            console.log("jaj 2")
            throw new Error('Session with overlapping start date already exists');
        }
    }
  }
  
  export default SessionValidator;
  