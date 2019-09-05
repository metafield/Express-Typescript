import { Router, Request, Response, NextFunction } from 'express';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not Permitted');
}

const router = Router();

router.get('/logout', (req: Request, res: Response) => {
  req.session = { loggedIn: false };
  res.redirect('/login');
});

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>
          You are logged in
          <a href="/logout">log out</a>
        </div>
      </div>
    `);
  } else {
    res.redirect('/login');
  }
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`
      <div>
        <div>
          Welcome to the protected stuff
        </div>
      </div>
    `);
});

export { router };
