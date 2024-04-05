/* eslint-disable max-len */
import Break from './break.entities.js';

class BreakController {
  constructor(breakService) {
    this.breakService = breakService;
  }

  createBreak = async (req, res) => {
    const breaks = new Break(req.body.sessionId, req.body.startDate, req.body.endDate, req.body.duration);
    return res.status(201).send(await this.breakService.createBreak(breaks));
  };
}

export default BreakController;
