import crypto from 'crypto';

class Break {
  constructor(sessionId, startDate, endDate) {
    this.id = crypto.randomUUID();
    this.sessionId = sessionId;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  toJSON() {
    return {
      id: this.id,
      sessionId: this.sessionId,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}

export default Break;
