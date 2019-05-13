import { Request, Response } from 'express';

export class Routes {
  public routes(app): void {
    app.route('/api/ping')
      .get((req: Request, res: Response) => {
        res.send('Pong');
      });
  }
}
