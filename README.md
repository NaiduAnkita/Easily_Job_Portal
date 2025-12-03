# Easily Job Portal

A full-stack Job Portal application built with the **MVC (Model-View-Controller)** architecture using **Node.js**, **Express.js**, and **EJS** templating. This application allows recruiters to post jobs and candidates to apply with resume uploads, featuring email notifications and session-based authentication.

## 🌟 Features

* **User Authentication**: Secure login and registration for recruiters and job seekers using `express-session` and cookies.
* **Job Management**:
    * Create, read, update, and delete (CRUD) job postings.
    * Job search functionality.
    * View job details and requirements.
* **Application System**:
    * Candidates can apply to jobs directly.
    * **Resume Upload**: Integrated PDF resume upload using `Multer`.
    * **Duplicate Check**: Prevents candidates from applying to the same job twice.
* **Recruiter Dashboard**:
    * View a paginated list of all applicants for a specific job.
    * Track applicant details (Name, Email, Contact, Resume).
* **Email Notifications**: Automated confirmation emails sent to applicants upon successful application using `Nodemailer`.
* **User Experience**:
    * **Last Visit Tracking**: personalized experience using cookies.
    * Dynamic 404 Error pages.

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Templating Engine**: EJS (Embedded JavaScript) with `express-ejs-layouts`
* **Data Handling**: In-memory storage (Models for Users and Jobs)
* **Validation**: `express-validator` for form data validation
* **File Storage**: `Multer` for handling file uploads (Resumes/Logos)
* **Email Service**: `Nodemailer` (SMTP)
* **Utilities**: `cookie-parser`, `dotenv`, `uuid`, `dayjs`

## 📂 Project Structure

```text
.
├── config/
│   ├── mailer.js          # Nodemailer configuration
│   ├── multer.js          # File upload configuration
│   └── session.js         # Express session configuration
├── controllers/
│   ├── authController.js  # Logic for Login/Register/Logout
│   └── jobController.js   # Logic for Job CRUD, Search, and Applications
├── middleware/
│   ├── auth.js            # Route protection (ensureAuth)
│   ├── emailConfirm.js    # Email sending middleware
│   ├── fileUpload.js      # File handling middleware
│   ├── lastVisit.js       # Cookie tracking for last visit
│   └── validate.js        # Form validation rules
├── models/
│   ├── Job.js             # Job data model (In-memory)
│   └── User.js            # User data model (In-memory)
├── public/
│   ├── css/               # Stylesheets
│   ├── images/            # Static images
│   └── uploads/           # Stored resumes and logos
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── jobRoutes.js       # Job management routes
│   └── viewRoutes.js      # Static view routes
├── views/                 # EJS templates
├── index.js               # Application entry point
├── package.json           # Project dependencies and scripts
└── .env                   # Environment variables
```

## ⚙️ Installation & Setup

Follow these steps to get the project running locally.

### 1. Prerequisites
Ensure you have **Node.js** (v14+) and **npm** installed on your machine.

### 2. Clone the Repository
```bash
git clone <repository-url>
cd easily_job_portal
```

### 3. Install Dependencies
Run the following command to install all required packages listed in package.json:
```bash
npm install
```

### 4. Configure Environment Variables
Create a .env file in the root directory of the project. Add the following configurations (replace the placeholders with your actual credentials).

Note: If you are using Gmail, you must generate an App Password in your Google Account settings to use as the SMTP_PASS.

```bash
PORT=3200
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com
# Optional: CC email for testing
# cc=your_personal_email@gmail.com
```

### 5. Update Start Script (Important)
The current package.json may point to app.js by default. Since the main entry file is index.js, please update the scripts section in package.json to:

```JSON
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### 6. Run the Application
Development Mode (with auto-reload via Nodemon):
```Bash
npm run dev
```

Production Mode:
```Bash
npm start
```

The server will start on http://localhost:3200.

