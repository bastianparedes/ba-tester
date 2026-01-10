import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { permissions } from '@/libs/permissions';
import { charNotIn, createRegExp, exactly, oneOrMore } from 'magic-regexp';
import { getUserFromCookies } from '@/utils/user';

const pathRegexPermissions: {
  regex: RegExp;
  permission: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}[] = [
  {
    regex: createRegExp(exactly('/admin/roles')),
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
    permission: permissions.campaign.create,
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
  { regex: createRegExp(exactly('/api/admin/roles')), permission: permissions.role.create, method: 'POST' },
  {
    regex: createRegExp(exactly('/api/admin/roles/').at.lineStart(), oneOrMore(charNotIn('/'))),
    permission: permissions.role.update,
    method: 'PUT',
  },
  {
    regex: createRegExp(exactly('/api/admin/roles/').at.lineStart(), oneOrMore(charNotIn('/'))),
    permission: permissions.role.delete,
    method: 'DELETE',
  },
  { regex: createRegExp(exactly('/api/admin/users')), permission: permissions.user.create, method: 'POST' },
  {
    regex: createRegExp(exactly('/api/admin/users/').at.lineStart(), oneOrMore(charNotIn('/'))),
    permission: permissions.user.update,
    method: 'PUT',
  },
  {
    regex: createRegExp(exactly('/api/admin/users/').at.lineStart(), oneOrMore(charNotIn('/'))),
    permission: permissions.user.delete,
    method: 'DELETE',
  },
  { regex: createRegExp(exactly('/api/tenants')), permission: permissions.tenant.create, method: 'POST' },
  {
    regex: createRegExp(exactly('/api/tenants/').at.lineStart(), oneOrMore(charNotIn('/'))),
    permission: permissions.tenant.update,
    method: 'PUT',
  },
  {
    regex: createRegExp(exactly('/api/tenants/').at.lineStart(), oneOrMore(charNotIn('/'))),
    permission: permissions.tenant.delete,
    method: 'DELETE',
  },

  {
    regex: createRegExp(exactly('/api/tenants/').at.lineStart(), oneOrMore(charNotIn('/')), '/campaigns'),
    permission: permissions.campaign.create,
    method: 'POST',
  },
  {
    regex: createRegExp(
      exactly('/api/tenants/').at.lineStart(),
      oneOrMore(charNotIn('/')),
      '/campaigns/',
      oneOrMore(charNotIn('/')).at.lineEnd(),
    ),
    permission: permissions.tenant.update,
    method: 'PUT',
  },
  {
    regex: createRegExp(
      exactly('/api/tenants/').at.lineStart(),
      oneOrMore(charNotIn('/')),
      '/campaigns/',
      oneOrMore(charNotIn('/')).at.lineEnd(),
    ),
    permission: permissions.tenant.delete,
    method: 'DELETE',
  },
];

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  /* if (env.isDevelopment) return response; */

  const handleUnauthorized = () => {
    const isApi = request.nextUrl.pathname.startsWith('/api');
    if (!isApi) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
    return new NextResponse(null, { status: 404 });
  };

  const user = await getUserFromCookies();
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
