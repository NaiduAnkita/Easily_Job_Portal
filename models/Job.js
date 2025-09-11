import { v4 as uuid } from 'uuid';

export const jobs = [
  {
    id: 1,
    job_category: "Tech",
    job_designation: "Fresher SQL Developer",
    job_location: "Chennai",
    company_founded:"2003",
    company_name: "Shakti Infosolutions",
    logo: "https://img.naukri.com/logo_images/v3/91933.gif",
    salary: "₹3,50,000 - ₹5,00,000",
    apply_by: "2025-09-20",
    skills_required: ["SQL", "Java", "Data Structures & Algo"],
    number_of_openings: 2,
    ownerId: "owner-123",
    experience:"0-3",
    job_posted: "Sept 8, 2025",
    applicants: []
  },
  {
    id: 2,
    job_category: "Tech",
    job_designation: "Cloud Data Engineer",
    job_location: "Pune",
    company_name: "ZS Associates",
     company_founded:"1987",
    logo: "https://img.naukri.com/logo_images/v3/68320.gif",
    salary: "₹6,00,000 - ₹8,00,000",
    apply_by: "2025-09-19",
    skills_required: ["SQL", "NodeJs", "MongoDB"],
    number_of_openings: 3,
    ownerId: "owner-123",
    job_posted: "Sept 7, 2025",
    experience:"0-2",
    applicants: []
  },
  {
    id: 3,
    job_category: "Tech",
    job_designation: "Data Engineer",
    job_location: "Ahmedabad",
    company_founded:"1997",
    company_name: "Accenture",
    logo: "https://img.naukimg.com/logo_images/groups/v1/10476.gif",
    salary: "₹5,50,000 - ₹7,50,000",
    apply_by: "2025-09-13",
    skills_required: ["Java", "SpringBoot", "SQL"],
    number_of_openings: 2,
    ownerId: "owner-123",
    experience:"1-3",
    job_posted: "Sept 3, 2025",
    applicants: []
  },
  {
    id: 4,
    job_category: "Tech",
    job_designation: "SQL Developer",
    job_location: "Hyderabad",
    company_founded:"1990",
    company_name: "Revalsys Technologies",
    logo: "https://img.naukimg.com/logo_images/groups/v1/724728.gif",
    salary: "₹4,00,000 - ₹6,00,000",
    apply_by: "2025-09-14",
    skills_required: ["SQL", "Express", "C++"],
    number_of_openings: 1,
    ownerId: "owner-123",
    experience:"2-3",
    job_posted: "Sept 4, 2025",
    applicants: []
  }
];


export function createJob(body, ownerId) {
  const job = {
    id: uuid(),
    job_category: body.job_category,
    job_designation: body.job_designation,
    job_location: body.job_location,
    company_name: body.company_name,
    company_founded: body.company_founded,
    employees: body.employees,
    salary: body.salary,
    number_of_openings: Number(body.number_of_openings),
    experience: body.experience,
    skills_required: Array.isArray(body.skills_required)
      ? body.skills_required
      : (body.skills_required ? [body.skills_required] : []),
    apply_by: body.apply_by,
    ownerId,
    job_posted: new Date().toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
}),
    logo:body.logo,
    applicants: [],
  };

  jobs.push(job);
  return job;
}

export function getAllJobs() {
  return jobs
    .slice()
    .sort((a, b) => new Date(b.job_posted) - new Date(a.job_posted));
}


export function findJobById(id) {
  console.log('finding');
  return jobs.find(j => j.id == id);
}

export function updateJob(id, data) {
  const job = findJobById(id);
  if (!job) return null;

  Object.assign(job, {
    job_category: data.job_category,
    job_designation: data.job_designation,
    job_location: data.job_location,
    company_name: data.company_name,
    company_founded: data.company_founded,
    employees: data.employees,
    salary: data.salary,
    apply_by: data.apply_by,
    skills_required: Array.isArray(data.skills_required) ? data.skills_required : job.skills_required,
    number_of_openings: Number(data.number_of_openings),
    experience: data.experience,
  });

  return job;
}

export function deleteJob(id) {
  const idx = jobs.findIndex(j => j.id === id);
  if (idx === -1) return false;
  jobs.splice(idx, 1);
  return true;
}

export function addApplicant(jobId, applicant) {
  const job = findJobById(jobId);
  if (!job) return null;

  const applicantObj = {
    applicantId: uuid(),
    name: applicant.name,
    email: applicant.email,
    contact: applicant.contact,
    resumePath: applicant.resumePath,
  };
  job.applicants.push(applicantObj);
  return applicantObj;
}

export function getApplicants(jobId) {
  const job = findJobById(jobId);
  return job ? job.applicants : null;
}

export function getApplicant(jobId, applicantId) {
  const job = findJobById(jobId);
  if (!job) return null;
  return job.applicants.find(a => a.applicantId === applicantId) || null;
}

export function updateApplicant(jobId, applicantId, data) {
  const job = findJobById(jobId);
  if (!job) return null;

  const idx = job.applicants.findIndex(a => a.applicantId === applicantId);
  if (idx === -1) return null;

  job.applicants[idx] = { ...job.applicants[idx], ...data };
  return job.applicants[idx];
}

export function deleteApplicant(jobId, applicantId) {
  const job = findJobById(jobId);
  if (!job) return null;

  const idx = job.applicants.findIndex(a => a.applicantId === applicantId);
  if (idx === -1) return null;

  job.applicants.splice(idx, 1);
  return true;
}

export function searchJob(searchTerm) {
  if (!searchTerm) return [];
  console.log(searchTerm);
  const searchTermLower = searchTerm.toLowerCase();
  return jobs.filter((job) => {
    return (
      job.company_name?.toLowerCase().includes(searchTermLower) ||
      job.job_designation?.toLowerCase().includes(searchTermLower) ||
      job.job_location?.toLowerCase().includes(searchTermLower) ||
      job.job_category?.toLowerCase().includes(searchTermLower) ||
      job.skills_required?.some(skill =>
        skill.toLowerCase().includes(searchTermLower)
      )
    );
  });
}
