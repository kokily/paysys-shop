export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/soldier', '/reserve', '/general', '/menu', '/menu/:path*', '/cart'],
};
