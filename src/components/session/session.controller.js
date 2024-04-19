class SessionController {
  constructor(sessionService) {
    this.sessionService = sessionService;
  }

  getSessions = async (req, res, next) => {
    
  };

  createSession = async (req, res, next) => {
    const payload = req.body;

    try {
      const newSession = await this.sessionService.createSession(payload);
      res.status(201).json(newSession);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getSession = async (req, res, next) => {

  };

  updateSession = async (req, res, next) => {

  };
}

export default SessionController;
