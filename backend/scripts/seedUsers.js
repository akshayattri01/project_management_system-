import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

const users = [
  { name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' },
  { name: 'Member User', email: 'member@example.com', password: 'password123', role: 'member' }
];

const seed = async () => {
  await connectDB();
  await User.deleteMany({ email: { $in: users.map((user) => user.email) } });
  await User.create(users);
  console.log('Sample users created: admin@example.com / member@example.com with password password123');
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
