import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

const jobs = [];

export function createJob(data, ownerId) {
  const job = {
    id: uuid(),
    jobcategory: data.jobcategory,
    jobdesignation: data.jobdesignation,
    joblocation: data.joblocation,
    companyname: data.companyname,
    salary: data.salary,
    applyby: data.applyby,
    skillsrequired: Array.isArray(data.skillsrequired) ? data.skillsrequired : [],
    numberofopenings: Number(data.numberofopenings),
    jobposted: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    applicants: [],
    ownerId
  };
  jobs.push(job);
  return job;
}

export function getAllJobs() {
  return jobs.slice().sort((a, b) => new Date(b.jobposted) - new Date(a.jobposted));
}

export function findJobById(id) {
  return jobs.find(j => j.id === id);
}

export function updateJob(id, data) {
  const job = findJobById(id);
  if (!job) return null;
  Object.assign(job, {
    jobcategory: data.jobcategory,
    jobdesignation: data.jobdesignation,
    joblocation: data.joblocation,
    companyname: data.companyname,
    salary: data.salary,
    applyby: data.applyby,
    skillsrequired: Array.isArray(data.skillsrequired) ? data.skillsrequired : job.skillsrequired,
    numberofopenings: Number(data.numberofopenings)
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
    resumePath: applicant.resumePath
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
// let db_id = 3;
// class Job{
//     constructor(job_category, job_designation, job_location, company_name, salary, apply_by, skills_required, number_of_openings) {
//     this.id = ++db_id;
//     this.job_category = job_category;
//     (this.job_designation = job_designation),
//       (this.job_location = job_location),
//       (this.company_name = company_name);
//     this.salary = salary;
//     this.apply_by = apply_by;
//     this.skills_required = skills_required;
//     this.number_of_openings = number_of_openings;
//     this.job_posted = new Date().toLocaleString();
//     this.applicants = [];
//   }
// }
// const jobs = [  {
//     id: 1,
//     job_category: "Tech",
//     job_designation: "SDE",
//     job_location: "Gurgaon HR IND Remote",
//     company_name: "Coding Ninjas",
//     salary: "14-20lpa",
//     apply_by: "30 Aug 2023",
//     skills_required: [
//       "REACT",
//       "NodeJs",
//       "JS",
//       "SQL",
//       "MongoDB",
//       "Express",
//       "AWS",
//     ],
//     number_of_openings: 5,
//     job_posted: new Date().toLocaleString(),
//     applicants: [
//       {
//         applicat_id: 1,
//         name: "Bharatlal",
//         email: "bharatlalsohna@gmail.com",
//         contact: 8168629606,
//         resumePath: "resume.pdf",
//       },
//     ],
//   },
//   {
//     id: 2,
//     job_category: "Tech",
//     job_designation: "Angular Developer",
//     job_location: "Pune IND On-Site",
//     company_name: "Go Digit",
//     salary: "6-10lpa",
//     apply_by: "30 Aug 2023",
//     skills_required: ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
//     number_of_openings: 7,
//     job_posted: new Date().toLocaleString(),
//     applicants: [],
//   },
//   {
//     id: 3,
//     job_category: "Tech",
//     job_designation: "SDE",
//     job_location: "Bangalore IND",
//     company_name: "Juspay",
//     salary: "20-26lpa",
//     apply_by: "30 Aug 2023",
//     skills_required: [
//       "REACT",
//       "NodeJs",
//       "JS",
//       "SQL",
//       "MongoDB",
//       "Express",
//       "AWS",
//     ],
//     number_of_openings: 3,
//     job_posted: new Date().toLocaleString(),
//     applicants: [],
    
//   },];

// export const createNewJob = (job_details) => {
//   const {
//     job_category,
//     job_designation,
//     job_location,
//     company_name,
//     salary,
//     apply_by,
//     skills_required,
//     number_of_openings,
//   } = job_details;
//   const job = new PostNewJob(
//     job_category,
//     job_designation,
//     job_location,
//     company_name,
//     salary,
//     apply_by,
//     skills_required,
//     number_of_openings,
//   );
//   jobs.push(job);
// };

// export function getAllJobs() {
//   return jobs.slice().sort((a, b) => new Date(b.job_posted) - new Date(a.job_posted));
// }

// export function findJobById(id) {
//   return jobs.find(j => j.id === id);
// }

// export const addNewApplicant = (id, ...applicantData) => {
//   const index = jobs.findIndex((job) => {
//     return job.id == id;
//   });
//   let applicantId = jobs[index].applicants.length + 1;
//   jobs[index].applicants.push({
//     applicat_id: applicantId,
//     name: applicantData[0],
//     email: applicantData[1],
//     contact: applicantData[2],
//     resumePath: applicantData[3],
//   });
//   return jobs[index].applicants;
// };

// export const sendAllApplicants = (id) => {
//   const index = jobs.findIndex((job) => {
//     return job.id == id;
//   });
//   return jobs[index].applicants;
// };

// export const updateJob = (id, data) => {
//   const index = jobs.findIndex((job) => {
//     return job.id == id;
//   });
//   jobs[index].company_name = data.company_name || jobs[index].company_name;
//   jobs[index].apply_by = data.apply_by || jobs[index].apply_by;
//   jobs[index].job_category = data.job_category || jobs[index].job_category;
//   jobs[index].job_designation =
//     data.job_designation || jobs[index].job_designation;
//   jobs[index].job_location = data.job_location || jobs[index].job_location;
//   jobs[index].job_posted = data.job_posted || jobs[index].job_posted;
//   jobs[index].number_of_openings =
//     data.number_of_openings || jobs[index].number_of_openings;
//   jobs[index].skills_required =
//     data.skills_required || jobs[index].skills_required;
//   jobs[index].salary = data.salary || jobs[index].salary;
// };


// export function deleteJob(id) {
//   const idx = jobs.findIndex(j => j.id === id);
//   if (idx === -1) return false;
//   jobs.splice(idx, 1);
//   return true;
// }

// // export function addApplicant(jobId, applicant) {
// //   const job = findJobById(jobId);
// //   if (!job) return null;
// //   const applicantObj = {
// //     applicantId: uuid(),
// //     name: applicant.name,
// //     email: applicant.email,
// //     contact: applicant.contact,
// //     resumePath: applicant.resumePath
// //   };
// //   job.applicants.push(applicantObj);
// //   return applicantObj;
// // }

// // export function getApplicants(jobId) {
// //   const job = findJobById(jobId);
// //   return job ? job.applicants : null;
// // }

// // export function getApplicant(jobId, applicantId) {
// //   const job = findJobById(jobId);
// //   if (!job) return null;
// //   return job.applicants.find(a => a.applicantId === applicantId) || null;
// // }

// // export function updateApplicant(jobId, applicantId, data) {
// //   const job = findJobById(jobId);
// //   if (!job) return null;
// //   const idx = job.applicants.findIndex(a => a.applicantId === applicantId);
// //   if (idx === -1) return null;
// //   job.applicants[idx] = { ...job.applicants[idx], ...data };
// //   return job.applicants[idx];
// // }

// // export function deleteApplicant(jobId, applicantId) {
// //   const job = findJobById(jobId);
// //   if (!job) return null;
// //   const idx = job.applicants.findIndex(a => a.applicantId === applicantId);
// //   if (idx === -1) return null;
// //   job.applicants.splice(idx, 1);
// //   return true;
// // }
