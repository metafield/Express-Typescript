import { Router } from 'express';

export class AppRouter {
  private static instance: Router;

  static getInstance(): Router {
    if (!this.instance) {
      AppRouter.instance = Router();
    }

    return AppRouter.instance;
  }
}
