import { Request, Response, NextFunction } from 'express';
import { get, controller, bodyValidator, post } from './decorators';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
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
    </form>`);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === 'hey@hey.com' && password === 'pass') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.statusCode = 422;
      res.send('invalid email or password');
    }
  }
}
