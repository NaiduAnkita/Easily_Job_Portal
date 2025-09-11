import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6'),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).render('user-login', { title: 'Register', errors: errs.array(), old: req.body, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
    }
    next();
  }
];

export const validateLogin = [
  body('email').isEmail(),
  body('password').notEmpty(),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).render('user-login', { title: 'Login', errors: errs.array(), old: req.body, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
    }
    next();
  }
];

export const validateJob = [
  body('job_category').trim().notEmpty(),
  body('job_designation').trim().notEmpty(), 
  body('job_location').trim().notEmpty(),
  body('company_name').trim().notEmpty(),
  body('company_founded').isInt({ min: 1800, max: new Date().getFullYear() }),
  body('employees').trim().notEmpty(),
  body('salary').trim().notEmpty(),
  body('apply_by').isISO8601().withMessage('Valid date'),
  body('skills_required').customSanitizer(v => Array.isArray(v) ? v : (typeof v === 'string' ? v.split(',').map(s => s.trim()).filter(Boolean) : [])),
  body('number_of_openings').isInt({ min: 1 }),
  body('experience').trim().notEmpty(),
  (req, res, next) => {
    const errs = validationResult(req);
    console.log('Validation errors:', errs.array());
    console.log('Form data received:', req.body);
    if (!errs.isEmpty()) {
      return res.status(400).render(req.viewTemplate || 'new-job', { 
        title: 'Job', 
        errors: errs.array(), 
        old: req.body, 
        user: req.session.user || null, 
        lastVisit: req.cookies.lastVisit || null 
      });
    }
    next();
  }
];


export const validateApplication = [
  body('name').trim().notEmpty(),
  body('email').isEmail(),
  body('contact').trim().notEmpty(),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).render('404', { title: 'Job', job: req.job, errors: errs.array(), user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
    }
    next();
  }
];
