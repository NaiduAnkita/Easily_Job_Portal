import { createTransport } from '../config/mailer.js';

export default async function sendConfirmationEmail(req, res, next) {
  try {
    const transport = createTransport();
    const { name, email } = req.body;
    const job = req.job;
    await transport.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: `Application received: ${job.jobdesignation} at ${job.companyname}`,
      text: `Hi ${name},\n\nThank you for applying to ${job.jobdesignation} at ${job.companyname}. We have received your application.\n\nRegards,\nEasily Jobs`,
    });
    next();
  } catch (err) {
    // Do not block UX on email errors; log and continue
    console.error('Email error:', err);
    next();
  }
}

// // Middleware to send mail by nodemailer
// import nodemailer from "nodemailer";
// import fs from "fs";
// import path from "path";
// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "codingninjas2k16@gmail.com",
//     pass: "slwvvlczduktvhdj",
//   },
// });
// const data = fs.readFileSync(
//   path.resolve("src", "public", "html", "mailTemplate.html")
// );
// export const sendConfirmationMail = async (userEmail) => {
//   const message = {
//     from: "codingninjas2k16@gmail.com",
//     to: userEmail,
//     subject: "Job Application Received",
//     html: data,
//   };

//   transporter.sendMail(message, (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // console.log(res);
//     }
//   });
// };