import { PageTemplate } from '@/components/common/PageTemplate';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PageTemplate>{children}</PageTemplate>;
}
