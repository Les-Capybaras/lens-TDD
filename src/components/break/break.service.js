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
    //this.breakValidator.createBreakValidator(payload);

    return this.breakRepository.createBreak(payload);
  }
}

export default BreakService;
