import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin user",
    email: "rms@gmail.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: true,
  },
  {
    name: "John Deo",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: false,
  },
];

export default users;
