export function ensureAuth(req, res, next) {
  console.log("ensureAuth");
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
}

export function ensureNotAuth(req, res, next) {
  if (req.session && req.session.user) return res.redirect('/jobs');
  return next();
}
export const authorizeJobOwner = (findJobById) => {
    return async (req, res, next) => {
        try {
            const jobId = req.params.id;
            console.log('Authorizing access to job:', jobId); // Debug log

            const job = await findJobById(jobId);
            console.log('Found job:', job ? 'Yes' : 'No'); // Debug log
            
            if (!job) {
                console.log('Job not found in authorization'); // Debug log
                return res.status(404).render('404', {
                    title: 'Not Found',
                    errors:[{msg: 'Job posting not found'}],
                    user: req.session.user
                });
            }

            // Debug log
            console.log('Job owner check:', {
                jobOwnerId: job.ownerId,
                currentUserId: req.session.user?.id
            });

            if (job.ownerId !== req.session.user?.id) {
                console.log('Unauthorized access attempt'); // Debug log
                return res.status(403).render('404', {
                    title: 'Unauthorized',
                    errors:[{msg: 'You are not authorized to modify this job posting'}],
                    user: req.session.user
                });
            }

            // Store job in request for later use
            req.job = job;
            console.log('Authorization successful'); // Debug log
            next();
            
        } catch (error) {
            console.error('Authorization error:', error);
            next(error);
        }
    };
};
// export const auth = (req, res, next) => {
//   if (req.session.user) next();
//   else {
//     res.render("404", {
//       msg: "only recruiter is allowed to access this page, login as recruiter to continue",
//     });
//   }
// };

