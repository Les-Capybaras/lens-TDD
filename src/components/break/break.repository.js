class BreakRepository {
  constructor(BreakModel) {
    this.Break = BreakModel;
  }

  async getBreaks() {
    return this.Break.find();
  }

  async getBreaksBySessionsId(sessionId) {
    return this.Break.find({ sessionId });
  }

  async createBreak(sessionId, payload) {
    const newBreak = new this.Break({
      ...payload,
      sessionId,
    });

    return newBreak.save();
  }
}

export default BreakRepository;
