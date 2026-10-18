import galleryImage1 from '../assets/images/1.jpeg';
import galleryImage2 from '../assets/images/2.jpeg';
import galleryImage3 from '../assets/images/3.jpeg';
import galleryImage4 from '../assets/images/4.jpeg';
import galleryImage5 from '../assets/images/5.jpeg';
import galleryImage6 from '../assets/images/6.jpeg';
import galleryImage7 from '../assets/images/7.jpeg';
import galleryImage8 from '../assets/images/8.jpeg';
import galleryImage9 from '../assets/images/9.jpeg';
import galleryImage10 from '../assets/images/10.jpeg';
import galleryImage11 from '../assets/images/11.jpeg';
import galleryImage12 from '../assets/images/12.jpeg';
import galleryImage13 from '../assets/images/13.jpeg';
import galleryImage14 from '../assets/images/14.jpeg';
import galleryImage15 from '../assets/images/15.jpeg';
import galleryImage16 from '../assets/images/16.jpeg';
import galleryImage17 from '../assets/images/17.jpeg';
import galleryImage20 from '../assets/images/20.jpeg';
import bookCover from '../assets/images/Book.jpeg';


const collectionDefinitions = [
  ['श्रृंगार रस', 'shringara-rasa', 'स्थायी भाव - रति', 'Romance', 2026, 'photo-1500375592092-40eb2168fd21'],
  ['हास्य रस', 'hasya-rasa', 'स्थायी भाव - हास', 'Laughter', 2025, 'photo-1470770841072-f978cf4d019e'],
  ['करुण रस', 'karuna-rasa', 'स्थायी भाव - शोक', 'Sorrow', 2025, 'photo-1519681393784-d120267933ba'],
  ['रौद्र रस', 'raudra-rasa', 'स्थायी भाव - क्रोध', 'Anger', 2024, 'photo-1493246507139-91e8fad9978e'],
  ['वीर रस', 'veera-rasa', 'स्थायी भाव - उत्साह', 'Zeal', 2024, 'photo-1564507592333-c60657eea523'],
  ['भयानक रस', 'bhayanaka-rasa', 'स्थायी भाव - भय', 'Fear', 2023, 'photo-1506744038136-46273834b3fb'],
  ['बीभत्स रस', 'bibhatsa-rasa', 'स्थायी भाव - घृणा', 'Disgust', 2023, 'photo-1441974231531-c6227db76b6e'],
  ['अद्भुत रस', 'adbhuta-rasa', 'स्थायी भाव - विस्मय', 'Wonder', 2022, 'photo-1500530855697-b586d89ba3ee'],
  ['शांत रस', 'shanta-rasa', 'स्थायी भाव - वैराग्य', 'Detachment', 2022, 'photo-1519608487953-e999c86e7455'],
  ['वात्सल्य रस', 'vatsalya-rasa', 'स्थायी भाव - वात्सल्य', 'Parental Love', 2021, 'photo-1470252649378-9c29740c9fa8'],
  ['भक्ति रस', 'bhakti-rasa', 'स्थायी भाव - ईश्वर प्रेम', 'Devotion', 2021, 'photo-1518837695005-2083093ee35b']
];

export const sampleCollections = collectionDefinitions.map(([title, slug, description, theme, year, image]) => ({
  title,
  slug,
  description,
  theme,
  year,
  poemCount: 1,
  coverImage: `https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=80`
}));

const poemDefinitions = [
  ['The River Remembers', 'the-river-remembers', 'The river keeps the names the banks forget.', 'The river remembers every footstep that once turned the mud to prayer.', 'English', ['Love', 'Beauty', 'Romance'], 2026],
  ['After the Temple Bells', 'after-the-temple-bells', 'Silence settles where the last bell fades.', 'After the temple bells fade, there is still a shimmer in the air.', 'English', ['Humor', 'Wit', 'laughter'], 2025],
  ['मिट्टी की स्मृतियाँ', 'mitti-ki-smritiyan', 'मिट्टी की गंध में कई घर लौट आते हैं।', 'मिट्टी की गंध में कई घर लौट आते हैं।', 'Hindi', ['Sorrow', 'Grief', 'Pity'], 2025],
  ['The Unwritten Letters', 'the-unwritten-letters', 'Some letters wait longer than the hands that wrote them.', 'Some letters were never mailed; they waited in the drawers of longing.', 'English', ['Anger', 'Fury'], 2024],
  ['A Courtyard After Rain', 'a-courtyard-after-rain', 'Rain leaves its handwriting on the old stone.', 'The courtyard holds a little sky in every rain-filled seam.', 'English', ['Courage', 'Valor','Spirited Resolve'], 2024],
  ['Ferry at First Light', 'ferry-at-first-light', 'The morning crosses before we do.', 'At first light, the ferry gathers our unspoken goodbyes.', 'English', ['Fear ', 'Dread'], 2023],
  ['Neem Leaves in May', 'neem-leaves-in-may', 'A bitter shade, a generous afternoon.', 'The neem keeps one cool thought above the burning lane.', 'English', ['Aversion', 'Disgust'], 2023],
  ['The Potter’s Hands', 'the-potters-hands', 'A bowl remembers the shape of its making.', 'Earth turns slowly beneath the potter’s patient palms.', 'English', ['Astonishment', 'Wonder'], 2022],
  ['The Small Hour', 'the-small-hour', 'Night makes room for the thoughts we set aside.', 'At the small hour, even the clock speaks softly.', 'English', ['Tranquility', 'Peace','Calm'], 2022],
  ['A Lamp in the Window', 'a-lamp-in-the-window', 'One light waits without asking who will return.', 'A lamp keeps a small place for the road to end.', 'English', ['Parental Love', 'Love'], 2021],
  ['The Road Knows', 'the-road-knows', 'Every departure leaves a direction behind.', 'The road knows the weight of every returning step.', 'English', ['Devotion', 'Spiritual'], 2021]
];

export const samplePoems = poemDefinitions.map(([title, slug, content, excerpt, language, themes, year], index) => ({
  title,
  slug,
  content: `${content}\n\nThe day opens slowly on the page,\nand carries what it can toward home.`,
  excerpt,
  language,
  themes,
  year,
  featured: index < 3,
  collection: {
    title: sampleCollections[index].title,
    slug: sampleCollections[index].slug
  }
}));

export const sampleBooks = [
  {
    title: 'SANGINI',
    description: 'Poems rooted in memory, landscape and the patient language of belonging.',
    coverImage: bookCover,
    author: 'Sunil Joshi',
    year: 2026,
    poemCount: 28
  }
];

export const sampleGallery = [
  { title: 'Amber Courtyard', image: galleryImage1, description: 'Carved stone in the late afternoon.', location: 'Rajasthan', year: 2025 },
  { title: 'Rain on the Ghats', image: galleryImage2, description: 'A monsoon passing through the river air.', location: 'Varanasi', year: 2025 },
  { title: 'A Page in the Archive', image: galleryImage3, description: 'Paper, ink and the work of remembering.', location: 'Archive', year: 2024 },
  { title: 'Garden After Rain', image: galleryImage4, description: 'A green path briefly made silver.', location: 'Mysuru', year: 2024 },
  { title: 'The Old Blue Door', image: galleryImage5, description: 'An entrance worn smooth by many seasons.', location: 'Jodhpur', year: 2023 },
  { title: 'Amber', image: galleryImage6, description: 'Carved stone in the late afternoon.', location: 'Rajasthan', year: 2025 },
  { title: 'Rain on the Ghats', image: galleryImage7, description: 'A monsoon passing through the river air.', location: 'Varanasi', year: 2025 },
  { title: 'A Page in the Archive', image: galleryImage8, description: 'Paper, ink and the work of remembering.', location: 'Archive', year: 2024 },
  { title: 'Garden After Rain', image: galleryImage9, description: 'A green path briefly made silver.', location: 'Mysuru', year: 2024 },
  { title: 'The Old Blue Door', image: galleryImage10, description: 'An entrance worn smooth by many seasons.', location: 'Jodhpur', year: 2023 },
  { title: 'The Old Blue Door', image: galleryImage11, description: 'An entrance worn smooth by many seasons.', location: 'Jodhpur', year: 2023 },
  { title: 'The Old Blue Door', image: galleryImage12, description: 'An entrance worn smooth by many seasons.', location: 'Jodhpur', year: 2023 },
  { title: 'The Old Blue Door', image: galleryImage13, description: 'An entrance worn smooth by many seasons.', location: 'Jodhpur', year: 2023 },
  { title: 'The Old Blue Door', image: galleryImage14, description: 'An entrance worn smooth by many seasons.', location: 'Jodhpur', year: 2023 },
  { title: 'The Old Blue Door', image: galleryImage15, description: 'An entrance worn smooth by many seasons.', location: 'Jodhpur', year: 2023 },
  { title: 'The Old Blue Door', image: galleryImage16, description: 'An entrance worn smooth by many seasons.', location: 'Jodhpur', year: 2023 },
  { title: 'The Old Blue Door', image: galleryImage17, description: 'An entrance worn smooth by many seasons.', location: 'Jodhpur', year: 2023 },
  { title: 'The Old Blue Door', image: galleryImage20, description: 'An entrance worn smooth by many seasons.', location: 'Jodhpur', year: 2023 }
];

export const sampleVideos = [
  { title: 'Reading: The River Remembers', description: 'A short reading beside the water.', thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85', videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U', category: 'READING' },
  { title: 'Monsoon Notes', description: 'A visual note on rain, old streets and returning home.', thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', category: 'FILM' }
];
