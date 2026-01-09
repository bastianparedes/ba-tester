import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tokenName, getTokenData } from '@/libs/auth/jwt';
import db from '@/libs/db/mongodb';
import { permissions } from '@/libs/permissions';
import { charNotIn, createRegExp, exactly, oneOrMore } from 'magic-regexp';
import { cookies } from 'next/headers';
import env from '@/libs/env';

const pathRegexPermissions: {
  regex: RegExp;
  permission: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}[] = [
  {
    regex: createRegExp(exactly('/admin/roles').at.lineStart()),
    permission: permissions.role.read,
    method: 'GET',
  },
  { regex: createRegExp(exactly('/admin/users').at.lineStart()), permission: permissions.user.read, method: 'GET' },
  { regex: createRegExp(exactly('/tenants').at.lineStart()), permission: permissions.tenant.read, method: 'GET' },
  {
    regex: createRegExp(exactly('/tenants/').at.lineStart(), oneOrMore(charNotIn('/')), '/campaigns'),
    permission: permissions.campaign.read,
    method: 'GET',
  },
  {
    regex: createRegExp(exactly('/tenants/').at.lineStart(), oneOrMore(charNotIn('/')), '/campaigns/undefined'),
    permission: permissions.campaign.write,
    method: 'GET',
  },
  {
    regex: createRegExp(
      exactly('/tenants/').at.lineStart(),
      oneOrMore(charNotIn('/')),
      '/campaigns/',
      oneOrMore(charNotIn('/')).at.lineEnd(),
    ),
    permission: permissions.campaign.read,
    method: 'GET',
  },
  {
    regex: createRegExp(exactly('/tenants/').at.lineStart(), oneOrMore(charNotIn('/')), '/example'),
    permission: permissions.campaign.read,
    method: 'GET',
  },
];

export async function proxy(request: NextRequest) {
  console.log('ayuda', request.nextUrl.pathname);
  const response = NextResponse.next();
  if (env.isDevelopment) return response;

  const handleUnauthorized = () => {
    const isApi = request.nextUrl.pathname.startsWith('/api');
    if (!isApi) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
    return new NextResponse(null, { status: 404 });
  };

  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get(tokenName)?.value;
  if (!tokenCookie) return handleUnauthorized();

  const tokenData = getTokenData({ token: tokenCookie, purpose: 'session' });
  if (!tokenData.valid) return handleUnauthorized();
  const userId = tokenData.id;
  const user = await db.users.get({ userId });
  if (!user) return handleUnauthorized();

  const pathRegexPermission = pathRegexPermissions.find(
    ({ regex, method }) => regex.test(request.nextUrl.pathname) && method === request.method,
  );
  if (!pathRegexPermission) return handleUnauthorized();

  const userHasPermission = user.role.permissions.includes(pathRegexPermission.permission);
  if (!userHasPermission) return handleUnauthorized();

  return response;
}

export const config = {
  matcher: ['/api/admin/:path*', '/api/tenants/:path*', '/admin/:path*', '/tenants/:path*'],
};
