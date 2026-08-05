import mongoose from 'mongoose';
import envConfig from '../config/env.config.js';
import Admin from '../modules/auth/auth.model.js';
import connectDB from '../config/db.config.js';

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = envConfig.adminEmail.toLowerCase();
    const adminPassword = envConfig.adminPassword;
    const adminName = envConfig.adminName;

    console.log(`[Seed Admin] Checking existing admin with email: ${adminEmail}...`);

    let admin = await Admin.findOne({ email: adminEmail });

    if (admin) {
      console.log(`[Seed Admin] Admin with email ${adminEmail} already exists. Updating details & password...`);
      admin.name = adminName;
      admin.password = adminPassword; // Will trigger pre('save') hash hook
      await admin.save();
      console.log(`[Seed Admin] Successfully updated administrator account.`);
    } else {
      console.log(`[Seed Admin] Creating new administrator account...`);
      admin = await Admin.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log(`[Seed Admin] Successfully created administrator account: ${admin.email}`);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Admin Error] Failed to seed administrator account: ${error.message}`);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedAdmin();
