import { addUser, confirmLogin, findByEmail} from '../models/User.js';

export function getLogin(req, res) {
  if (req.session.user) return res.redirect('/jobs');
  res.render('user-login', { title: 'Login', errors: [], old: {}, user: null, lastVisit: req.cookies.lastVisit || null });
}

// export function getRegister(req, res) {
//   const {name,email,password} =req.body;
//   addUser(name,email,password);
//   res.status(200).render("login", { errorMsg: null, email: req.session.email, name: req.session.name });
//   // if (req.session.user) return res.redirect('/jobs');
//   // res.render('register', { title: 'Register', errors: [], old: {}, user: null, lastVisit: req.cookies.lastVisit || null });
// }

export async function postRegister(req, res) {
  
    const { name, email, password } = req.body;
    const existingUser = await findByEmail(email);
    if (existingUser) {
            return res.render('user-login', {
                title: 'Register',
                errors: [{
                    msg: 'This email is already registered. Please login instead.',
                    type: 'warning'
                }],
                old: req.body,
                user: null,
                loginLink: true  // Flag to show login link
            });
        }
    const user = await addUser({ name, email, password });
    req.session.user = user;
    res.status(200).render('user-login', { title: 'Login', errors: [], old: req.body, user: null, lastVisit: req.cookies.lastVisit || null });
  
}

export function postLogin(req, res) {
  const user = confirmLogin(req.body.email, req.body.password);
  console.log(user);
  if (!user) {
    return res.status(401).render('404', { title: '401', errors: [{ msg: 'Invalid credentials' }], old: req.body, user: null, lastVisit: req.cookies.lastVisit || null });
  }
  req.session.user = { id: user.id, name: user.name, email: user.email };
  res.redirect('/jobs');
}

export function postLogout(req, res) {
  req.session.destroy(() => res.redirect('/'));
}
