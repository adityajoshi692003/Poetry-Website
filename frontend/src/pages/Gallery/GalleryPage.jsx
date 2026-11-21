import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import { sampleGallery, sampleVideos } from '../../data/archive.js';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const [galleryResponse, videoResponse] = await Promise.all([
          api.get('/gallery'),
          api.get('/videos')
        ]);
        const apiImages = galleryResponse.data.gallery || [];
        const videos = videoResponse.data.videos?.length ? videoResponse.data.videos : sampleVideos;
        setGalleryItems([
          ...(apiImages.length ? apiImages : sampleGallery),
          ...videos.map((video) => ({
            ...video,
            image: video.thumbnail,
            category: video.category || 'VIDEOS',
            mediaType: 'video'
          }))
        ]);
      } catch (err) {
        setGalleryItems([
          ...sampleGallery,
          ...sampleVideos.map((video) => ({ ...video, image: video.thumbnail, category: 'VIDEOS', mediaType: 'video' }))
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) return <Loading message="Preparing the gallery..." />;
  return (
    <>
      <section className="page-hero section-block">
        <div className="container narrow">
          <p className="eyebrow">Gallery</p>
          <h1>Images and moving stories from the archive.</h1>
        </div>
      </section>

      <GalleryGrid items={galleryItems} />
    </>
  );
}
