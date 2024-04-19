class BreakRepository {
  constructor(BreakModel) {
    this.Break = BreakModel;
  }

  async getBreaks() {
    return this.Break.find();
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
