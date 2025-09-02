import dotenv from 'dotenv';
dotenv.config();

export default {
  secret: process.env.SESSION_SECRET || 'change_me_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // set true behind HTTPS proxy
    maxAge: 1000 * 60 * 60 * 8
  }
};
