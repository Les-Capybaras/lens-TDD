/* eslint-disable max-len */
import Break from './break.entities.js';

class BreakController {
  constructor(breakService) {
    this.breakService = breakService;
  }

  getBreaks = async (req, res) => {
    try {
      const breaks = await this.breakService.getBreaks();
      res.status(200).json(breaks);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  createBreak = async (req, res) => {
    const payload = req.body;

    try {
      const newBreak = await this.breakService.createBreak(payload);
      res.status(201).json(newBreak);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default BreakController;
