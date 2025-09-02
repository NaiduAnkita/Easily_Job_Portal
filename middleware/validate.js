import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6'),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).render('register', { title: 'Register', errors: errs.array(), old: req.body, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
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
      return res.status(400).render('login', { title: 'Login', errors: errs.array(), old: req.body, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
    }
    next();
  }
];

export const validateJob = [
  body('jobcategory').trim().notEmpty(),
  body('jobdesignation').trim().notEmpty(),
  body('joblocation').trim().notEmpty(),
  body('companyname').trim().notEmpty(),
  body('salary').trim().notEmpty(),
  body('applyby').isISO8601().withMessage('Valid date'),
  body('skillsrequired').customSanitizer(v => Array.isArray(v) ? v : (typeof v === 'string' ? v.split(',').map(s => s.trim()).filter(Boolean) : [])),
  body('numberofopenings').isInt({ min: 1 }),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      return res.status(400).render(req.viewTemplate || 'newJob', { title: 'Job', errors: errs.array(), old: req.body, user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
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
      return res.status(400).render('jobDetail', { title: 'Job', job: req.job, errors: errs.array(), user: req.session.user || null, lastVisit: req.cookies.lastVisit || null });
    }
    next();
  }
];
