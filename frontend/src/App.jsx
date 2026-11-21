import { Link, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import PoemsPage from './pages/Poems/PoemsPage.jsx';
import PoemDetailsPage from './pages/PoemDetails/PoemDetailsPage.jsx';
import CollectionsPage from './pages/Collections/CollectionsPage.jsx';
import CollectionDetailsPage from './pages/CollectionDetails/CollectionDetailsPage.jsx';
import AboutPage from './pages/About/AboutPage.jsx';
import GalleryPage from './pages/Gallery/GalleryPage.jsx';
import ContactPage from './pages/Contact/ContactPage.jsx';

function NotFoundPage() {
  return (
    <div className="container empty-panel" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <h1>Page not found</h1>
      <p style={{ margin: '1rem 0 2rem', color: 'var(--muted)' }}>
        This page is not part of the poetry archive.
      </p>
      <Link to="/" className="hero-action-button hero-action-primary">
        Return home →
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/poems" element={<PoemsPage />} />
        <Route path="/poems/:slug" element={<PoemDetailsPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collections/:slug" element={<CollectionDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
