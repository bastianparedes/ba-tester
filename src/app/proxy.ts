import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tokenName, getTokenData } from '@/libs/auth/jwt';
import env from '@/libs/env';
import db from '@/libs/db/mongodb';
import { permissions } from '@/libs/permissions';

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (env.NODE_ENV !== 'production') return response;

  const paths = [
    { path: '/admin/roles', permission: permissions.role.read },
    { path: '/admin/users', permission: permissions.user.read },
    { path: '/tenants', permission: permissions.tenant.read },
    { path: '/tenants/[tenantId]/campaigns', permission: permissions.campaign.read },
    { path: '/tenants/[tenantId]/campaigns/undefined', permission: permissions.campaign.write },
    { path: '/tenants/[tenantId]/campaigns/[campaignId]', permission: permissions.campaign.read },
  ];

  const protectedPaths = ['/admin/', '/api/admin'];
  const isProtectedPath = protectedPaths.some((protectedPath) => request.nextUrl.pathname.startsWith(protectedPath));
  if (!isProtectedPath) return response;

  const isApi = request.nextUrl.pathname.startsWith('/api');

  const handleUnauthorized = () => {
    if (!isApi) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
    return new NextResponse(null, { status: 404 });
  };

  const token = request.cookies.get(tokenName)?.value;
  if (!token) return handleUnauthorized();

  const tokenData = getTokenData(token, 'session');
  if (!tokenData.valid || tokenData.purpose !== 'session') return handleUnauthorized();

  const user = await db.users.get({ userId: tokenData.id });
  const userPermissions = user.role.permissions;
}
