import constants from '@/config/constants';
import { getPasswordHashed } from '@/libs/auth/password';
import { connect, disconnect } from '@/libs/db/mongodb/client';
import Roles from '@/libs/db/mongodb/models/Role';
import Users from '@/libs/db/mongodb/models/User';
import env from '@/libs/env';
import {
  flatPermissions,
  flatSuperAdminOnlyPermissions,
} from '@/libs/permissions';

async function seedDB() {
  try {
    await connect();

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
    await disconnect();
    process.exit(0);
  }
}

export { seedDB };
