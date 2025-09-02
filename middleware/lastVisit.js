import dayjs from 'dayjs';

export default function lastVisit(req, res, next) {
  const last = req.cookies.lastVisit || null;
  res.locals.lastVisit = last;
  res.cookie('lastVisit', dayjs().format('YYYY-MM-DD HH:mm:ss'), {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
  next();
}

// Last visit data save on server with cookies
// export const lastVisit = (req, res, next) => {
//   if (req.cookies.lastVisit) {
//     res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
//   } else {
//     res.cookie("lastVisit", new Date().toISOString(), {
//       maxAge: 1 * 24 * 60 * 60 * 1000,
//     });
//   }
//   next();
// };
