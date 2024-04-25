import {endOfDay, startOfDay} from 'date-fns';

class SessionRepository {

  constructor(SessionModel) {
    this.Session = SessionModel;
  }

    async getSessions() {
      return this.Session.find();
    }

  async getSessionsByDate(startDate) {
    const start = startOfDay(startDate);
    const end = endOfDay(startDate);

    return await this.Session.find({
      createdAt: {
        $gte: start,
        $lte: end
      }
    });
  }

  async getSessions() {
    return this.Session.find();
  }

  async getSessionsByUserId(userId) {
    return this.Session.find({ userId });
  }

  async getSession(id) {

  }

  async createSession(sessionId, payload) {
    const lastSession = await this.getLastSession();
    if (lastSession && !this.isSessionOver(lastSession)) {
        throw new Error('Cannot start a new session before the last one ends');
    }
    if (payload.endDate && new Date(payload.endDate) < new Date(payload.startDate)) {
        throw new Error('Stop date must be after start date');
    }
    const newSession = new this.Session({
        ...payload,
        sessionId,
    });

    return newSession.save();
}

  async updateSession(sessionId, updatedData) {
    try {
      return await this.Session.findByIdAndUpdate(
          sessionId,
          {$set: updatedData},
          {new: true}
      );
    } catch (error) {
      throw new Error("Could not update session: " + error.message);
    }
  }
}

export default SessionRepository;