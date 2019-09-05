"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not Permitted');
}
var router = express_1.Router();
exports.router = router;
router.get('/logout', function (req, res) {
    req.session = { loggedIn: false };
    res.redirect('/login');
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div>\n          You are logged in\n          <a href=\"/logout\">log out</a>\n        </div>\n      </div>\n    ");
    }
    else {
        res.redirect('/login');
    }
});
router.get('/protected', requireAuth, function (req, res) {
    res.send("\n      <div>\n        <div>\n          Welcome to the protected stuff\n        </div>\n      </div>\n    ");
});
