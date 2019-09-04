import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not Permitted');
}

const router = Router();

router.get('/login', (req: RequestWithBody, res: Response) => {
  res.send(`
  <form method="POST">
    <div>
      <label>Email</label>
      <input name="email" />
    </div>
    <div>
      <label>Password</label>
      <input name="password" type="password" />
    </div>
    <button>Submit</button>
  </form>
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'hey@hey.com' && password === 'pass') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.statusCode = 422;
    res.send('invalid email or password');
  }
});

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
