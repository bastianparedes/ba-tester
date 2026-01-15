import { superAdminRoleName } from '@/domain/config';
import { flatPermissions, flatSuperAdminOnlyPermissions } from '@/domain/permissions';
import { env } from '@/libs/env';
import { connect, disconnect } from '@/services/db.service/mongodb/client';
import Roles from '@/services/db.service/mongodb/models/Role';
import Users from '@/services/db.service/mongodb/models/User';
import { PasswordService } from '@/services/password.service';

async function seedDB() {
  try {
    await connect();

    const superAdminRole = await Roles.findOneAndUpdate(
      { name: superAdminRoleName },
      {
        name: superAdminRoleName,
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
