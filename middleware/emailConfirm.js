import { createTransport } from '../config/mailer.js';

export default async function sendConfirmationEmail(req, res, next) {
  try {
    const transport = createTransport();
    const { applicant, job } = req;

    if (!job || !applicant) return next(); // safety check

    await transport.sendMail({
      from: process.env.FROM_EMAIL,
      to: applicant.email,
      cc:  process.env.cc,
      subject: `Application received: ${job.job_designation} at ${job.company_name}`,
      text: `Hi ${applicant.name},\n\nThank you for applying to ${job.job_designation} at ${job.company_name}. We have received your application.\n\nRegards,\nEasily Jobs`,
    });

    console.log(`Confirmation email sent to ${applicant.email}`);
    return res.render("postjobapply", {
      message: `Congratulations! Your application for a position at ${job.company_name} has been successfully processed. We will contact you shortly via email at ${applicant.email}.`,
      companyName: job.company_name,
      name: applicant.name,
      email: applicant.email
    });
    // next();
  } catch (err) {
    console.error('Email error:', err);
    next(); // don’t block the user even if email fails
  }
}
