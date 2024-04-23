import express from 'express';

class SessionRouter {
  constructor(sessionController) {
    this.sessionController = sessionController;
  }

  getRouter() {
    const router = express.Router();
    // router.route('/').get(this.sessionController.getUsers);
    router.route('/').post(this.sessionController.createUser);
    // router.route('/:id').get(this.sessionController.getUser);
    router.route('/:id').put(this.sessionController.updateUser);
    return router;
  }
}

export default SessionRouter;
