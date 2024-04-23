class SessionController {
  constructor(sessionService) {
    this.sessionService = sessionService;
  }

  createSession = async (req, res, next) => {
    const payload = req.body;

    try {
      const newSession = await this.sessionService.createSession(payload);
      const estimatedStopDate = await this.sessionService.getEstimatedStopDate(newSession.startDate);
      res.status(201).json(newSession);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  updateSession = async (req, res, next) => {
    const sessionId = req.params.id; 
    const updatedData = req.body;

    try {
      const updatedSession = await this.sessionService.updateSession(sessionId, updatedData);
      res.status(200).json(updatedSession);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default SessionController;
