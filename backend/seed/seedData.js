import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Collection from '../models/Collection.js';
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Video from '../models/Video.js';
import GalleryItem from '../models/GalleryItem.js';

dotenv.config();

const collections = [
  {
    title: 'श्रृंगार रस',
    slug: 'shringara-rasa',
    description: 'स्थायी भाव -  रति',
    theme: 'Monsoon',
    coverImage: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
    year: 2026
  },
  {
    title: 'हास्य रस',
    slug: 'hasya-rasa',
    description: 'स्थायी भाव -  हास',
    theme: 'Silence',
    coverImage: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
    year: 2025
  },
  {
    title: 'करुण रस',
    slug: 'karuna-rasa',
    description: 'स्थायी भाव -  शोक',
    theme: 'Heritage',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
    year: 2025
  },
  {
    title: 'रौद्र रस',
    slug: 'raudra-rasa',
    description: 'स्थायी भाव -  क्रोध',
    theme: 'Time',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    year: 2024
  },
  {
    title: 'वीर रस',
    slug: 'veera-rasa',
    description: 'स्थायी भाव -  उत्साह',
    theme: 'Time',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    year: 2024
  },
  {
    title: 'भयानक रस',
    slug: 'bhayanaka-rasa',
    description: 'स्थायी भाव -  भय',
    theme: 'Time',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    year: 2024
  },
  {
    title: 'बीभत्स रस',
    slug: 'bibhatsa-rasa',
    description: 'स्थायी भाव - घृणा',
    theme: 'Time',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    year: 2024
  },
  {
    title: 'अद्भुत रस',
    slug: 'adbhuta-rasa',
    description: 'स्थायी भाव -  विस्मय',
    theme: 'Time',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    year: 2024
  },
  {
    title: 'शांत रस',
    slug: 'shanta-rasa',
    description: 'स्थायी भाव -  वैराग्य',
    theme: 'Time',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    year: 2024
  },
  {
    title: 'वात्सल्य रस',
    slug: 'vatsalya-rasa',
    description: 'स्थायी भाव - वात्सल्य',
    theme: 'Time',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    year: 2024
  },
  {
    title: 'भक्ति रस',
    slug: 'bhakti-rasa',
    description: 'स्थायी भाव - ईश्वर प्रेम',
    theme: 'Time',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    year: 2024
  }
];

const poems = [
  {
    title: 'The River Remembers',
    slug: 'the-river-remembers',
    content: 'The river remembers every footstep\nthat once turned the mud to prayer.\nIt carries the blue of old monsoon evenings,\nthe hush of temple bells,\nand the names we forgot to speak aloud.\n\nI stand at its edge and hear\nmy own life returning in water.\nEach ripple is a letter,\neach silt a memory,\nand each curve a home I almost kept.',
    excerpt: 'The river remembers every footstep that once turned the mud to prayer.',
    collection: null,
    language: 'English',
    themes: ['Memory', 'Nature', 'Monsoon'],
    year: 2026,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'After the Temple Bells',
    slug: 'after-the-temple-bells',
    content: 'After the temple bells fade,\nthere is still a shimmer in the air.\nThe courtyard keeps its silence\nlike a folded page.\n\nEven the wind seems to listen,\nas if prayer had left a footprint\nin the dust and in the heart.',
    excerpt: 'After the temple bells fade, there is still a shimmer in the air.',
    collection: null,
    language: 'English',
    themes: ['Spirituality', 'Heritage', 'Silence'],
    year: 2025,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'मिट्टी की स्मृतियाँ',
    slug: 'mitti-ki-smritiyan',
    content: 'मिट्टी की गंध में\nकई घर लौट आते हैं,\nकई रिश्ते,\nकई आंखें,\nमिट्टी की स्मृतियाँ.\n\nकिसी दरवाज़े के पीछे\nअचानक धूप उतरती है,\nऔर हम फिर से\nबच्चे बन जाते हैं,\nगाँव के आकाश में.',
    excerpt: 'मिट्टी की गंध में कई घर लौट आते हैं।',
    collection: null,
    language: 'Hindi',
    themes: ['Home', 'Heritage', 'Memory'],
    year: 2025,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'A Small Lamp in the Rain',
    slug: 'a-small-lamp-in-the-rain',
    content: 'In the rain, a small lamp\nkeeps its own weather.\nIt does not ask for a window,\nonly a dark room\nand a breath of stillness.\n\nSo I carry my silence\nlike a flame\nthat does not fear storm.' ,
    excerpt: 'In the rain, a small lamp keeps its own weather.',
    collection: null,
    language: 'English',
    themes: ['Love', 'Spirituality', 'Monsoon'],
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'The Unwritten Letters',
    slug: 'the-unwritten-letters',
    content: 'Some letters were never mailed.\nThey waited in drawers of longing,\nunder the skin of memory,\nlike rain behind glass.\n\nYears folded them into silence,\nyet every page still knew my name.',
    excerpt: 'Some letters were never mailed; they waited in the drawers of longing.',
    collection: null,
    language: 'English',
    themes: ['Time', 'Memory', 'Love'],
    year: 2024,
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
  }
];

const books = [
  {
    title: 'SANGINI',
    description: 'A collection of poems rooted in memory, landscape, and the patient language of belonging.',
    coverImage: 'bookCover',
    author: 'Sunil Joshi',
    year: 2026,
    featured: true,
    purchaseUrl: 'https://amzn.in/d/06jh56lg'
  }
];

const videos = [
  {
    title: 'Poetry at Dusk',
    description: 'A reading shaped by rain, memory and quiet evening light.',
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    featured: true
  },
  {
    title: 'Monsoon in the City',
    description: 'A short visual essay on rain, architecture, and remembrance.',
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    featured: false
  }
];

const gallery = [
  {
    title: 'Temple Courtyard',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80',
    category: 'HERITAGE',
    description: 'Stone and silence.',
    location: 'Jaipur',
    year: 2025
  },
  {
    title: 'Rain on Stone',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    category: 'NATURE',
    description: 'Monsoon over the old city.',
    location: 'Udaipur',
    year: 2024
  },
  {
    title: 'Manuscript Study',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
    category: 'MANUSCRIPTS',
    description: 'An archive of patient words.',
    location: 'Delhi',
    year: 2023
  },
  {
    title: 'Garden Memory',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    category: 'PLACES',
    description: 'A summer garden and the quiet of return.',
    location: 'Varanasi',
    year: 2025
  }
];

const seedDatabase = async () => {
  await connectDB();

  await Collection.deleteMany({});
  await Poem.deleteMany({});
  await Book.deleteMany({});
  await Video.deleteMany({});
  await GalleryItem.deleteMany({});

  const insertedCollections = await Collection.insertMany(collections);

  const collectionMap = new Map(insertedCollections.map((collection) => [collection.slug, collection._id]));

  const poemsWithCollections = poems.map((poem) => ({
    ...poem,
    collection: collectionMap.get(getCollectionSlug(poem.title)) || insertedCollections[0]._id
  }));

  const insertedPoems = await Poem.insertMany(poemsWithCollections);

  await Promise.all(
    insertedCollections.map(async (collection, index) => {
      const count = await Poem.countDocuments({ collection: collection._id });
      await Collection.findByIdAndUpdate(collection._id, { poemCount: count });
      const collectionPoems = insertedPoems.filter((poem) => poem.collection.toString() === collection._id.toString());
      if (collectionPoems.length === 0 && index === 0) {
        await Collection.findByIdAndUpdate(collection._id, { poemCount: insertedPoems.length });
      }
    })
  );

  await Book.insertMany(books);
  await Video.insertMany(videos);
  await GalleryItem.insertMany(gallery);

  console.log('Seed data inserted successfully.');
  mongoose.connection.close();
};

const getCollectionSlug = (title) => {
  const map = {
    'The River Remembers': 'shringara-rasa',
    'After the Temple Bells': 'hasya-rasa',
    'मिट्टी की स्मृतियाँ': 'karuna-rasa',
    'A Small Lamp in the Rain': 'bhakti-rasa',
    'The Unwritten Letters': 'raudra-rasa'
  };

  return map[title] || 'songs-of-the-monsoon';
};

seedDatabase().catch((error) => {
  console.error('Seeding failed:', error.message);
  process.exit(1);
});
