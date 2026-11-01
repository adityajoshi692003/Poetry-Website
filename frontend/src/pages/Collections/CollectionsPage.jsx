import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import Loading from '../../components/Loading/Loading.jsx';
import CollectionCard from '../../components/CollectionCard/CollectionCard.jsx';
import { sampleCollections, samplePoems } from '../../data/archive.js';

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const [collectionResponse, poemResponse] = await Promise.all([
          api.get('/collections'),
          api.get('/poems')
        ]);
        const apiCollections = collectionResponse.data.collections || [];
        const apiPoems = poemResponse.data.poems || [];
        const mergedCollections = new Map(sampleCollections.map((collection) => [collection.slug, collection]));

        apiCollections.forEach((collection) => mergedCollections.set(collection.slug, collection));

        const populatedCollections = Array.from(mergedCollections.values()).map((collection) => {
          const matchingApiPoems = apiPoems.filter((poem) =>
            poem.collection?.slug === collection.slug ||
            poem.collection?.title === collection.title ||
            (poem.collection?._id && poem.collection._id === collection._id)
          );
          const localPoems = samplePoems.filter((poem) => poem.collection.slug === collection.slug);
          const collectionPoems = matchingApiPoems.length ? matchingApiPoems : localPoems;

          return {
            ...collection,
            poems: collectionPoems,
            poemCount: collectionPoems.length || collection.poemCount
          };
        }).sort((left, right) => left.year - right.year || left.title.localeCompare(right.title));

        setCollections(populatedCollections);
      } catch (err) {
        setCollections(sampleCollections.map((collection) => ({
          ...collection,
          poems: samplePoems.filter((poem) => poem.collection.slug === collection.slug)
        })).sort((left, right) => left.year - right.year || left.title.localeCompare(right.title)));
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) return <Loading message="Opening the collection archive..." />;
  return (
    <>
      <section className="page-hero section-block">
        <div className="container narrow">
          <p className="eyebrow">Collections</p>
          <h1>Eleven shelves, a world of poetry.</h1>
          <p className="page-intro">Explore a volume, then follow its poems in order or open any title directly.</p>
        </div>
      </section>

      <div className="container collection-grid collection-card-grid">
        {collections.map((collection) => (
          <CollectionCard key={collection.slug} collection={collection} />
        ))}
      </div>

    </>
  );
}
