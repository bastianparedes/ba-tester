import { superAdminRoleName } from '../../../../../domain/config';
import { flatPermissions, flatSuperAdminOnlyPermissions } from '../../../../../domain/permissions';
import { getPasswordHashed } from '../../../libs/auth/password';
import { env } from '../../../libs/env';
import { connect } from './client';
import Roles from './models/Role';
import Users from './models/User';

export async function seedMongoDb() {
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
  }
}
