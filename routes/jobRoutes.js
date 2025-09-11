import { Router } from 'express';
import upload from '../config/multer.js';
import sendConfirmationEmail from '../middleware/emailConfirm.js';
import { ensureAuth, authorizeJobOwner } from '../middleware/auth.js';
import { validateJob, validateApplication } from '../middleware/validate.js';
import { searchJobs, listJobs, jobDetail, newJobForm, createJobPost, editJobForm, updateJobPost, deleteJobPost, applicantsList, applyToJob } from '../controllers/controllers/jobController.js';
import { findJobById } from '../models/Job.js';

const router = Router();
router.use((req, res, next) => {
    console.log('Route accessed:', req.method, req.url);
    next();
});
router.get('/postjob', ensureAuth, newJobForm);
router.get('/search', searchJobs);
router.get('/jobs', listJobs);


router.get('/jobs/update/:id', ensureAuth, authorizeJobOwner(findJobById), editJobForm);
// Place update routes BEFORE other dynamic routes
// Place update routes BEFORE other dynamic routes
// router.post('/jobs/update/:id', ensureAuth, (req, res, next) => {
//     console.log('Update route hit:', req.params.id);
//     authorizeJobOwner(findJobById)(req, res, (err) => {
//         if (err) return next(err);
//         console.log('Authorization passed');
//         validateJob(req, res, (err) => {
//             if (err) return next(err);
//             console.log('Validation passed');
//             updateJobPost(req, res, next);
//         });
//     });
// });
router.post('/jobs/update/:id', ensureAuth, authorizeJobOwner(findJobById), validateJob, updateJobPost);
router.get('/jobs/applicants/:id', ensureAuth, authorizeJobOwner(findJobById), applicantsList);

router.get('/jobs/:id',jobDetail);

router.post('/jobs', ensureAuth, upload.single('logo'), validateJob, createJobPost);

router.post('/jobs/:id', ensureAuth, authorizeJobOwner(findJobById), (req, res, next) => { req.viewTemplate = 'editJob'; next(); }, validateJob, updateJobPost);

router.get('/jobs/delete/:id', ensureAuth, authorizeJobOwner(findJobById), deleteJobPost);
router.delete('/jobs/:id', ensureAuth, authorizeJobOwner(findJobById), deleteJobPost);

router.post('/apply/:id', upload.single('resume'), (req, res, next) => { console.log("bvhj"); req.job = findJobById(req.params.id); next(); }, validateApplication, applyToJob, sendConfirmationEmail);
// router.post(
//   'apply/:id',
//   upload.single('resume'),
//   applyToJob,
//   sendConfirmationEmail,
//   (req, res) => {
//     const { job, applicant } = req;
//     res.render('postjobapply', {
//       message: `Congratulations! Your application for a position at ${job.company_name} has been successfully processed. We will contact you shortly via email at ${applicant.email}.`,
//       companyName: job.company_name,
//       name: applicant.name,
//       email: applicant.email
//     });
//   }
// );
export default router;
