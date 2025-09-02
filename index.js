import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionConfig from './config/session.js';
import viewRoutes from './routes/viewRoutes.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import lastVisit from './middleware/lastVisit.js';
import expressEjsLayouts from 'express-ejs-layouts'

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressEjsLayouts);
app.set('layout', 'layouts/layout');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(lastVisit);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/', viewRoutes);
app.use('/', authRoutes);
app.use('/', jobRoutes);

app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Not Found',
    user: req.session.user || null,
    lastVisit: req.cookies.lastVisit || null
  });
});

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
