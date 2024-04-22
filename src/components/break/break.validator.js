import date from 'date-fns';
import sessionRepository from "../session/session.repository.js";

class BreakValidator {
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
        const session = sessionRepository.getSessions().find((session) => session.id === payload.sessionId);

        if (date.sub(payload.endDate, payload.startDate) > session.duration) {
            throw new Error('Pause duration exceeds session time');
        }
    }
  }
  
  export default BreakValidator;
  