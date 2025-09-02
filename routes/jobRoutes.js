import { Router } from 'express';
import upload from '../config/multer.js';
import sendConfirmationEmail from '../middleware/emailConfirm.js';
import { ensureAuth, authorizeJobOwner } from '../middleware/auth.js';
import { validateJob, validateApplication } from '../middleware/validate.js';
import { listJobs, jobDetail, newJobForm, createJobPost, editJobForm, updateJobPost, deleteJobPost, applicantsList, applyToJob } from '../controllers/JobController.js';
import { findJobById } from '../models/Job.js';

const router = Router();

router.get('/jobs', listJobs);
router.get('/jobs/:id', jobDetail);

router.get('/jobs/:id/applicants', ensureAuth, authorizeJobOwner(findJobById), applicantsList);

router.get('/jobs/new', ensureAuth, newJobForm);
router.post('/jobs', ensureAuth, (req, res, next) => { req.viewTemplate = 'newJob'; next(); }, validateJob, createJobPost);

router.get('/jobs/:id/update', ensureAuth, authorizeJobOwner(findJobById), editJobForm);
router.post('/jobs/:id', ensureAuth, authorizeJobOwner(findJobById), (req, res, next) => { req.viewTemplate = 'editJob'; next(); }, validateJob, updateJobPost);

router.get('/jobs/:id/delete', ensureAuth, authorizeJobOwner(findJobById), deleteJobPost);
router.delete('/jobs/:id', ensureAuth, authorizeJobOwner(findJobById), deleteJobPost);

router.post('/apply/:id', upload.single('resume'), (req, res, next) => { req.job = findJobById(req.params.id); next(); }, validateApplication, applyToJob, sendConfirmationEmail);

export default router;
