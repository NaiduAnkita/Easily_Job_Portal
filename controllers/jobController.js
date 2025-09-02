import { getAllJobs, createJob, findJobById, updateJob, deleteJob, addApplicant, getApplicants } from '../models/Job.js';

export function landing(req, res) {
  res.render('index', { title: 'Easily', user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
}

export function listJobs(req, res) {
  const q = (req.query.q || '').toLowerCase();
  let jobs = getAllJobs();
  if (q) {
    jobs = jobs.filter(j =>
      j.jobdesignation.toLowerCase().includes(q) ||
      j.companyname.toLowerCase().includes(q) ||
      j.joblocation.toLowerCase().includes(q) ||
      j.skillsrequired.join(' ').toLowerCase().includes(q)
    );
  }
  res.render('jobs', { title: 'Jobs', jobs, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null, q: req.query.q || '' });
}

export function jobDetail(req, res) {
  const job = findJobById(req.params.id);
  if (!job) return res.status(404).render('404', { title: 'Not Found', user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
  res.render('jobDetail', { title: 'Job Detail', job, errors: [], user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
}

export function newJobForm(req, res) {
  res.render('newJob', { title: 'New Job', errors: [], old: {}, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
}

export function createJobPost(req, res) {
  const job = createJob(req.body, req.session.user.id);
  res.redirect(`/jobs/${job.id}`);
}

export function editJobForm(req, res) {
  const job = findJobById(req.params.id);
  if (!job) return res.status(404).render('404', { title: 'Not Found', user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
  res.render('editJob', { title: 'Edit Job', job, errors: [], old: job, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
}

export function updateJobPost(req, res) {
  const job = updateJob(req.params.id, req.body);
  res.redirect(`/jobs/${job.id}`);
}

export function deleteJobPost(req, res) {
  deleteJob(req.params.id);
  res.redirect('/jobs');
}

export function applicantsList(req, res) {
  const job = findJobById(req.params.id);
  if (!job) return res.status(404).render('404', { title: 'Not Found', user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
  res.render('applicants', { title: 'Applicants', job, applicants: getApplicants(job.id) || [], user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
}

export function applyToJob(req, res) {
  const job = findJobById(req.params.id);
  if (!job) return res.status(404).render('404', { title: 'Not Found', user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });

  const resumePath = req.file ? `/uploads/resumes/${req.file.filename}` : null;
  const applicant = addApplicant(job.id, {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    resumePath
  });
  req.job = job;
  req.applicant = applicant;
  res.redirect(`/jobs/${job.id}`);
}
