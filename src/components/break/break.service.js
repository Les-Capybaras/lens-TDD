import BreakValidator from "./break.validator";

class BreakService {
  constructor(breakRepository) {
    this.breakRepository = breakRepository;
    this.breakValidator = new BreakValidator();
  }

  getBreaks() {
    return this.breakRepository.getBreaks();
  }

  createBreak(payload) {
    this.breakValidator.createBreakValidator(payload);
    const sessionId = payload.sessionId;
    const breaks = this.breakRepository.getBreaks();
    const sessionBreaks = breaks.filter((b) => b.sessionId === sessionId);

    if (sessionBreaks.length > 0) {
      throw new Error("Session already have a break");
    }

    return this.breakRepository.createBreak(payload);
  }
}

export default BreakService;
