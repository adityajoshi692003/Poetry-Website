import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="page-shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
