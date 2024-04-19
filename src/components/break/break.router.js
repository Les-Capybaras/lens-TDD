import express from 'express';

class BreakRouter {
  constructor(breakController) {
    this.breakController = breakController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.breakController.getBreak);
    router.route('/:id').update(this.breakController.updateBreak);
    router.route('/:id').delete(this.breakController.deleteBreak);
    router.route('/').get(this.breakController.getBreaks);
    router.route('/').post(this.breakController.createBreak);
    return router;
  }
}

export default BreakRouter;
