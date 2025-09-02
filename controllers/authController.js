import { addUser, confirmLogin } from '../models/User.js';

export function getLogin(req, res) {
  if (req.session.user) return res.redirect('/jobs');
  res.render('login', { title: 'Login', errors: [], old: {}, user: null, lastVisit: req.cookies.lastVisit || null });
}

export function getRegister(req, res) {
  if (req.session.user) return res.redirect('/jobs');
  res.render('register', { title: 'Register', errors: [], old: {}, user: null, lastVisit: req.cookies.lastVisit || null });
}

export function postRegister(req, res) {
  try {
    const user = addUser(req.body);
    req.session.user = { id: user.id, name: user.name, email: user.email };
    res.redirect('/jobs');
  } catch (e) {
    res.status(400).render('register', { title: 'Register', errors: [{ msg: e.message }], old: req.body, user: null, lastVisit: req.cookies.lastVisit || null });
  }
}

export function postLogin(req, res) {
  const user = confirmLogin(req.body.email, req.body.password);
  if (!user) {
    return res.status(401).render('login', { title: 'Login', errors: [{ msg: 'Invalid credentials' }], old: req.body, user: null, lastVisit: req.cookies.lastVisit || null });
  }
  req.session.user = { id: user.id, name: user.name, email: user.email };
  res.redirect('/jobs');
}

export function postLogout(req, res) {
  req.session.destroy(() => res.redirect('/'));
}
