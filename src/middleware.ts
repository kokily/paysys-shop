export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/soldier',
    '/reserve',
    '/general',
    '/menu',
    '/menu/:path*',
    '/cart',
    '/fronts',
    '/front/:path*',
    '/items',
    '/item/:path*',
  ],
};
