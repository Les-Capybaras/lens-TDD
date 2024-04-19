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
    }
  }
  
  export default BreakValidator;
  