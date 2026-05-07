const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Movie = require('./models/Movie');
const Theater = require('./models/Theater');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({ email: 'admin@cinema.com' });

    // Create Admin User
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@cinema.com',
      password: 'adminpassword123',
      role: 'admin'
    });
    console.log('Admin user created: admin@cinema.com / adminpassword123');

    // Create a sample theater if none exist
    const theaterCount = await Theater.countDocuments();
    if (theaterCount === 0) {
      await Theater.create({
        name: 'Grand Cinema Hall 1',
        location: 'Downtown City',
        city: 'New York',
        capacity: 100,
        amenities: ['IMAX', 'Dolby Atmos', 'Recliner Seats'],
        rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        seatsPerRow: 10
      });
      console.log('Sample theater created.');
    }

    console.log('Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
