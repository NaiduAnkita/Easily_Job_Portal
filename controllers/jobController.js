import { jobs, searchJob, getAllJobs, createJob, findJobById, updateJob, deleteJob, addApplicant, getApplicants } from '../models/Job.js';

export function landing(req, res) {
  res.render('index', { title: 'Easily', jobs, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
}

// export function listJobs(req, res) {
//   const q = (req.query.q || '').toLowerCase();
//   let jobs = getAllJobs();
//   if (q) {
//     jobs = jobs.filter(j =>
//       j.job_designation.toLowerCase().includes(q) ||
//       j.company_name.toLowerCase().includes(q) ||
//       j.job_location.toLowerCase().includes(q) ||
//       j.skills_required.join(' ').toLowerCase().includes(q)
//     );
//   }
//   res.render('list-all-jobs', { title: 'Jobs', jobs, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null, q: req.query.q || '' });
// }

export function listJobs(req, res) {
  const q = (req.query.q || '').toLowerCase();
  const page = parseInt(req.query.page) || 1;
  const limit = 6; // Or any number of jobs you want per page

  let result = getAllJobs(page, limit);

  if (q) {
    const allJobs = getAllJobs(1, Infinity).jobs; // Get all jobs for filtering
    const filteredJobs = allJobs.filter(j =>
      j.job_designation.toLowerCase().includes(q) ||
      j.company_name.toLowerCase().includes(q) ||
      j.job_location.toLowerCase().includes(q) ||
      j.skills_required.join(' ').toLowerCase().includes(q)
    );
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    result = {
      jobs: filteredJobs.slice(startIndex, endIndex),
      currentPage: page,
      totalPages: Math.ceil(filteredJobs.length / limit)
    };
  }

  res.render('list-all-jobs', { 
    title: 'Jobs', 
    jobs: result.jobs,
    user: req.session.user || null, 
    lastVisit: req.cookies.lastVisit || null, 
    q: req.query.q || '',
    currentPage: result.currentPage,
    totalPages: result.totalPages
  });
}


export function jobDetail(req, res) {
  console.log(`id is ${req.params.id}`);
  const data = findJobById(req.params.id);
  console.log(data);
  if (!data) return res.status(404).render('404', { title: 'Not Found', user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
  res.render('job-details', { title: 'Job Detail', data, errors: [], user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
}

export function newJobForm(req, res) {
  res.render('new-job', { title: 'New Job', errors: [], old: {}, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
}

export function createJobPost(req, res) {
  console.log('Form data received:', req.body);
  const job = createJob(req.body, req.session.user.id);
  // console.log(job);
  res.redirect(`/jobs/${job.id}`);
}

export function editJobForm(req, res) {
  const job = findJobById(req.params.id);
  //console.log(job);
  if (!job) return res.status(404).render('404', { title: 'Not Found',errors:[{msg: 'Job not found'}], user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
  res.render('update-job', { title: 'Edit Job', job, errors: [], old: job, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
}

// export async function updateJobPost(req, res) {
//   const job = await updateJob(req.params.id, req.body);
//   res.redirect(`/jobs/${job.id}`);
// }
export const updateJobPost = async (req, res) => {
    try {
        console.log('Updating job:', req.params.id); // Debug log
        const jobId = req.params.id;
        
        const updatedJob = await updateJob(jobId, req.body);
        
        if (!updatedJob) {
            console.log('Job not found for update'); // Debug log
            return res.status(404).render('404', {
                title: 'Not Found',
                errors:[{msg: 'Job not found'}],
                user: req.session.user
            });
        }

        console.log('Job updated successfully'); // Debug log
        res.redirect(`/jobs/${jobId}`);
        
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).render('404', {
            title: 'Error',
            errors:[{msg: 'Job not found'}],
            user: req.session.user
        });
    }
};

export function deleteJobPost(req, res) {
  deleteJob(req.params.id);
  res.redirect('/jobs');
}

// export function applicantsList(req, res) {
//   const job = findJobById(req.params.id);
//   if (!job) return res.status(404).render('404', { title: 'Not Found',errors:[{msg: 'Job not found'}], user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
//   res.render('all-applicants', { title: 'Applicants', job, applicants: getApplicants(job.id) || [], user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
// }

export function applicantsList(req, res) {
  const job = findJobById(req.params.id);
  if (!job) return res.status(404).render('404', { title: 'Not Found',errors:[{msg: 'Job not found'}], user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });

  const page = parseInt(req.query.page) || 1;
  const limit = 5; // Applicants per page

  const applicantsData = getApplicants(job.id, page, limit);

  res.render('all-applicants', { 
    title: 'Applicants', 
    job, 
    applicants: applicantsData.applicants, 
    user: req.session.user || null, 
    lastVisit: req.cookies.lastVisit || null,
    currentPage: applicantsData.currentPage,
    totalPages: applicantsData.totalPages
  });
}

export async function applyToJob(req, res, next) {
  console.log("Body:", req.body);
console.log("File:", req.file);

  const jobId = req.params.id;
  const job = findJobById(jobId);
  if (!job) {
    return res.status(404).render('404', {
      title: 'Not Found',
      errors: [{ msg: 'Job not found' }],
      user: req.session.user || null,
      lastVisit: req.cookies.lastVisit || null
    });
  }

  const { name, email, contact } = req.body;
  const resumePath = req.file ? `/uploads/resumes/${req.file.filename}` : null;

  // Prevent duplicate application
  const applicants = job.applicants || []; 
  if (applicants.find(a => a.name === name && a.email === email)) {
  return res.render('postjobapply', {
    message: `You have already applied for ${job.company_name}!`,
    companyName: job.company_name,
    name,
    email
  });
}

  // Add applicant
  const applicant = addApplicant(jobId, { name, email, contact, resumePath });

  // Attach job & applicant to req for middleware
  req.job = job;
  req.applicant = applicant;

  next(); // pass to middleware
}
export function searchJobs(req, res) {
  console.log("searchJobs called", req.query.q)
    try {
        console.log(req.query.q);
        const searchQuery = req.query.q || ''; 
        const jobsFound = searchJob(searchQuery);
        console.log(jobsFound);
        res.render('list-all-jobs', {  // Changed from 'jobs' to 'list-all-jobs'
            title: `Search Results for "${searchQuery}"`,
            jobs: jobsFound,
            user: req.session.user || null,
            lastVisit: req.cookies.lastVisit || null,
            q: searchQuery
        });
    } catch (error) {
        console.error('Search error:', error);
        res.render('404', {
            title: 'Error',
            errors:[{msg: 'No Jobs found'}],
            user: req.session.user || null,
            lastVisit: req.cookies.lastVisit || null,
        });
    }
}
