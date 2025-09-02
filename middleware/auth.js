export function ensureAuth(req, res, next) {
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}

export function ensureNotAuth(req, res, next) {
  if (req.session && req.session.user) return res.redirect('/jobs');
  return next();
}

export function authorizeJobOwner(getJobById) {
  return (req, res, next) => {
    const job = getJobById(req.params.id);
    if (!job) return res.status(404).render('404', { title: 'Not Found', user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
    if (!req.session.user || job.ownerId !== req.session.user.id) {
      return res.status(403).render('404', { title: 'Forbidden', user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
    }
    req.job = job;
    next();
  };
}
// export const auth = (req, res, next) => {
//   if (req.session.user) next();
//   else {
//     res.render("404", {
//       msg: "only recruiter is allowed to access this page, login as recruiter to continue",
//     });
//   }
// };

