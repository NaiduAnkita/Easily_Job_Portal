

import { v4 as uuid } from 'uuid';

const users = [{
      id: "owner-123",
      name: "Naidu Ankita",
      email: "naiduankita21@gmail.com",
      password: "password",}];

export function getAllUsers() {
  return users;
}

export function addUser({ name, email, password }) {
  const user = { id: uuid(), name, email, password };
  users.push(user);
  return user;
}

export function findByEmail(email) {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function confirmLogin(email, password) {
  const user = findByEmail(email);
  if (user && user.password === password) return user;
  return null;
}

// export default class UserModel{

// static users = [{
//       id: 1,
//       name: "Naidu Ankita",
//       email: "naiduankita21@gmail.com",
//       password: "password",
//     }];
// constructor(id, name, email, password) {
//     this.id = id;
//     this.name = name;
//     this.email = email;
//     this.password = password;
//     UserModel.users.push({ id, name, email, password });
//   }


// static getAllUsers=()=> {
//   return UserModel.users;
// }

// static addUser=(user)=> {
//   const exists = UserModel.users.find(u => u.email.toLowerCase() === email.toLowerCase());
//   if (exists) throw new Error('Email already registered');
//   //const user = { id: uuid(), name, email, password };
//   UserModel.users.push(user);
//   return user;
// }

// static findByEmail=(email)=> {
//   return users.find(u => u.email.toLowerCase() === email.toLowerCase());
// }

// static confirmLogin=(email, password)=> {
//   const user = findByEmail(email);
//   if (user && user.password === password) return true;
//   return null;
// }
// }
