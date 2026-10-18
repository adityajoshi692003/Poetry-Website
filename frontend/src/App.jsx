import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import PoemsPage from './pages/Poems/PoemsPage.jsx';
import PoemDetailsPage from './pages/PoemDetails/PoemDetailsPage.jsx';
import CollectionsPage from './pages/Collections/CollectionsPage.jsx';
import CollectionDetailsPage from './pages/CollectionDetails/CollectionDetailsPage.jsx';
import AboutPage from './pages/About/AboutPage.jsx';
import GalleryPage from './pages/Gallery/GalleryPage.jsx';
import ContactPage from './pages/Contact/ContactPage.jsx';

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
      </Route>
    </Routes>
  );
}
