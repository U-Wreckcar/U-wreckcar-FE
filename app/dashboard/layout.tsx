import { SideNav } from '@/components/sidebar/SideNav';
import { Header } from 'components/header/Header';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <SideNav />
      {/* Include shared UI here e.g. a header or sidebar */}
      <Header />
      <nav></nav>
      {children}
    </section>
  );
}
