

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.Model'); // Adjust this path as needed


const connectDB = async () => {
    try {
        const mongoURI = 'mongodb://localhost:27017/store'; // MongoDB connection string directly
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected. Seeding Admin...");
        await seedAdmin();
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

const seedAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log("Admin user already exists.");
            return;
        }

       
        const username = 'admin';
        const email = 'admin@example.com';
        const password = 'securepassword';

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            username,
            email,
            password: hashedPassword,
            role: 'admin',
            adminId: new mongoose.Types.ObjectId(),
        });

        await admin.save();
        console.log("Admin user created successfully.");
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        mongoose.connection.close();
    }
};


connectDB();

