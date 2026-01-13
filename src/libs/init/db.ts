import mongoose from 'mongoose';
import constants from '@/config/constants';
import { getPasswordHashed } from '@/libs/auth/password';
import { Roles, Users } from '@/libs/db/mongodb/client';
import env from '@/libs/env';
import {
  flatPermissions,
  flatSuperAdminOnlyPermissions,
} from '@/libs/permissions';

async function seedDB() {
  try {
    console.log('Connecting to mongoDB for seed');
    await mongoose.connect(env.DATABASE_URL_MONGODB);

    const superAdminRole = await Roles.findOneAndUpdate(
      { name: constants.superAdminRoleName },
      {
        name: constants.superAdminRoleName,
        description: 'Access to all',
        permissions: [...flatPermissions, ...flatSuperAdminOnlyPermissions],
      },
      { upsert: true, new: true },
    );
    await Promise.all(
      env.SUPER_ADMINS.map((superAdmin) =>
        Users.findOneAndUpdate(
          { email: superAdmin.email },
          {
            $setOnInsert: {
              name: superAdmin.name,
              email: superAdmin.email,
              passwordHash: getPasswordHashed(superAdmin.password),
              role: superAdminRole._id,
            },
          },
          { upsert: true, new: true },
        ),
      ),
    );
  } catch (error) {
    console.error('❌ MongoDB seed failed:', error);
  } finally {
    console.log('Disconnecting MongoDB for seed');
    await mongoose.disconnect();
    process.exit(0);
  }
}

export { seedDB };
