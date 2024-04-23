const { startOfDay, endOfDay } = require('date-fns');

class SessionRepository {

  constructor(SessionModel) {
    this.Session = SessionModel;
  }

  async getSessionsByDate(startDate) {
    const start = startOfDay(startDate);
    const end = endOfDay(startDate);

    const sessions = await this.Session.find({
      createdAt: {
        $gte: start,
        $lte: end
      }
    });

    return sessions;
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
    const newSession = new this.Session({
      ...payload,
      sessionId,
    });

    return newSession.save();
  }

  async updateSession(sessionId, updatedData) {
    try {
      const updatedSession = await this.Session.findByIdAndUpdate(
        sessionId,
        { $set: updatedData },
        { new: true }
      );
      return updatedSession;
    } catch (error) {
      throw new Error("Could not update session: " + error.message);
    }
  }
}

export default SessionRepository;