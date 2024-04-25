import date from 'date-fns';

class BreakValidator {
    constructor(sessionRepository) {
      this.sessionRepository = sessionRepository;
    }

    createBreakValidator(payload) {
        if (!payload.startDate || !payload.endDate) {
            throw new Error('Missing required fields');
        }
    
        if (new Date(payload.startDate) > new Date(payload.endDate)) {
            throw new Error('Start date must be before end date');
        }

        if (payload.sessionId === undefined) {
            throw new Error('Missing required sessionId fields');
        }

        // should throw an error if pause duration exceeds session time
        const session = this.sessionRepository.getSessions().find((session) => session.id === payload.sessionId);

        if (session.endDate === null) {
            throw new Error('Session is not finished yet');
        }

        if (session.startDate > payload.startDate || session.endDate < payload.endDate) {
            throw new Error('Pause duration exceeds session time');
        }
    }
  }
  
  export default BreakValidator;
  