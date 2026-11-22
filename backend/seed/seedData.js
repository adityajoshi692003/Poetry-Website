import dotenv from 'dotenv';
import fs from 'node:fs';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import connectDB from '../config/db.js';
import Collection from '../models/Collection.js';
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Video from '../models/Video.js';
import GalleryItem from '../models/GalleryItem.js';
import PoemLike from '../models/PoemLike.js';

dotenv.config();

const publicAssetsPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../frontend/public');

const collections = [
  {
    title: 'श्रृंगार रस',
    slug: 'shringara-rasa',
    description: 'स्थायी भाव -  रति',
    theme: 'Monsoon',
    coverImage: '/assets/collections/1.jpeg',
    year: 2026
  },
  {
    title: 'हास्य रस',
    slug: 'hasya-rasa',
    description: 'स्थायी भाव -  हास',
    theme: 'Silence',
    coverImage: '/assets/collections/2.jpeg',
    year: 2025
  },
  {
    title: 'करुण रस',
    slug: 'karuna-rasa',
    description: 'स्थायी भाव -  शोक',
    theme: 'Heritage',
    coverImage: '/assets/collections/3.jpeg',
    year: 2025
  },
  {
    title: 'रौद्र रस',
    slug: 'raudra-rasa',
    description: 'स्थायी भाव -  क्रोध',
    theme: 'Time',
    coverImage: '/assets/collections/4.jpeg',
    year: 2024
  },
  {
    title: 'वीर रस',
    slug: 'veer-rasa',
    description: 'स्थायी भाव -  उत्साह',
    theme: 'Time',
    coverImage: '/assets/collections/5.jpeg',
    year: 2024
  },
  {
    title: 'भयानक रस',
    slug: 'bhayanak-rasa',
    description: 'स्थायी भाव -  भय',
    theme: 'Time',
    coverImage: '/assets/collections/6.jpeg',
    year: 2023
  },
  {
    title: 'वीभत्स रस',
    slug: 'vibhatsa-rasa',
    description: 'स्थायी भाव - घृणा',
    theme: 'Time',
    coverImage: '/assets/collections/7.jpeg',
    year: 2023
  },
  {
    title: 'अद्भुत रस',
    slug: 'adbhut-rasa',
    description: 'स्थायी भाव -  विस्मय',
    theme: 'Time',
    coverImage: '/assets/collections/8.jpeg',
    year: 2022
  },
  {
    title: 'शांत रस',
    slug: 'shant-rasa',
    description: 'स्थायी भाव -  वैराग्य',
    theme: 'Time',
    coverImage: '/assets/collections/9.jpeg',
    year: 2022
  },
  {
    title: 'वात्सल्य रस',
    slug: 'vatsalya-rasa',
    description: 'स्थायी भाव - वात्सल्य',
    theme: 'Time',
    coverImage: '/assets/collections/10.jpeg',
    year: 2021
  },
  {
    title: 'भक्ति रस',
    slug: 'bhakti-rasa',
    description: 'स्थायी भाव - ईश्वर प्रेम',
    theme: 'Time',
    coverImage: '/assets/collections/11.jpeg',
    year: 2021
  }
];

const poems = [
  {
    title: 'मैं तेरे प्रेम में, गीत रच जाऊंगा',
    //slug: 'मै तेरे प्रेम में, गीत रच जाऊंगा',
    content: 
    `मैं तेरे प्रेम में, गीत रच जाऊंगा
तुम वही गीत फिर गुनगुनाना प्रिये..

कलम से कागज पे, उतारा करूं
तुम वही गीत पढ़ फिर गाना प्रिये।

मैं तेरे प्रेम में, गीत रच जाऊंगा..
तुम वही गीत फिर गुनगुनाना प्रिये ..

चाँद तारों को भी मैं लिख जाऊंगा,
तुम सलोनी छवि फिर दिखाना प्रिये।

फूलों की सुगंध भरी उपमा के संग,
अलंकारों  सजे  गीत  गाना  प्रिये।

मैं तेरे प्रेम में, गीत रच जाऊंगा..
तुम वही गीत फिर गुनगुनाना प्रिये ..

सादगी को तेरी, अब मैं कैसे लिखूं 
हो अक्षर कोई तो, बताना प्रिये।

तू कहे तो, लिखूं सिर्फ नाम तेरा
या कोई फिर उपाय सुझाना प्रिये।

मैं तेरे प्रेम में, गीत रच जाऊंगा..
तुम वही गीत फिर गुनगुनाना प्रिये ..

तेरे श्रृंगार को, मैं क्या लिख पाऊंगा
हिरणी सी लगे, तेरी काया प्रिये।

माथे पर सजी तेरी बिंदियाँ कहे,
चांद माथे पे तूने, लगाया प्रिये।

मैं तेरे प्रेम में, गीत रच जाऊंगा..
तुम वही गीत फिर गुनगुनाना प्रिये ..

कलम से कागज पे जो, उतारा करूं
तुम वही गीत पढ़ फिर गाना प्रिये।

©सुनील जोशी`,

    //excerpt: 'मैं तेरे प्रेम में, गीत रच जाऊंगा \n तुम वही गीत फिर गुनगुनाना प्रिये..',
    collection: null,
    language: 'Hindi',
    themes: ['Love', 'Beauty', 'Romance'],
    //year: 2026,
    //featured: true,
    //coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'चुनावी पर्चा',
    slug: 'चुनावी पर्चा',
    content: 
    `फिर चुनावी माहौल है आया,
फिर वही जोश लौट है आया।
बेरोजगार फिर काम पर लौटे,
चल गए बाजार में खोटे सिक्के।
नेता जी चले चुनावी पर्चा भरने,
समर्थक लगे सब धीरे धीरे जगने।
जैसे ही कार्यालय में कदम बढ़ाए,
तुरन्त ही नोटिस बोर्ड देख घबराए।
आरक्षण के तहत सीट बदल दी है,
उम्मीदवारी सिर्फ महिलाओं की है।
नेता जी ने तुरंत उपाय है सुझाया,
पत्नी जी के नाम से पर्चा भरवाया।
पत्नी जी की जय जयकार होने लगी,
जनता उन्हें देखने को आतुर होने लगी।
नेता जी ने पोस्टर छपवाए,
पत्नी जी के कसीदे पढ़वाए।
हद तो तब हो गई,
जब भाषण में पोल खुल गई।
नेताजी जी भावनाओं में बह गए,
पत्नी जी को युवा दिलों की धड़कन कह गए।
नेता जी ने भावुक होकर नारा दिया,
जीत के उपरांत,
पत्नी जी से मिलाने का वादा किया।
युवाओं में जोश बढ़ रहा था,
प्रत्येक युवा प्रधानी के रूप में,
नेता जी की पत्नी को ही देख रहा था।
अब नेता जी पिछड़ने लगे,
युवा जन पत्नी जी के संग चलने लगे।
नेता जी,
जिस पत्नी को युवा दिलों की धड़कन बता रहे थे,
उसी की खातिर अब डॉक्टर से,
अपनी धड़कनों की जांच करवा रहे थे।
बेड पर पड़े पड़े नेताजी विचार करने लगे,
प्रधानी के चक्कर में, चक्कर लगने लगे।
जिस पत्नी के साथ सुकून से दो रोटी खाता था,
पूरा गाँव उसे अब खिलाने आता था।
बेवजह युवा दिलों की धड़कन बतलाया,
पगला गया था,
जो पत्नी जी का पर्चा भरवाया।
अब तो ऐसा समय आ रहा है,
अपनी पत्नी से मिलने की खातिर,
आवेदन किया जा रहा है।।

©सुनील जोशी`,
    //excerpt: 'After the temple bells fade, there is still a shimmer in the air.',
    collection: null,
    language: 'Hindi',
    themes: ['Humor', 'Wit', 'Peace', 'हास्य'],
    //year: 2025,
    //featured: true,
    //coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'तुम साक्षी हो न..',
    slug: 'तुम साक्षी हो न..',
    content: 
    `जो घट रहा समाज में, तुम  साक्षी  हो न
फिर भेंट चढ़ गई बिटिया, तुम मौन हो न
उसकी  चीख-पुकार,  असमर्थता-बेबसी
मायूसी के स्वर, सुनाई तो  दिए  होंगे  न ।

किंचित अपने अस्तित्व पर प्रश्न करती होगी
वो, अग्नि  के आवेश में जब तप  रही होगी
मनुष्य रूप भी उसे पत्थर प्रतीत होता होगा
विश्वास उसका हर पल, पल पल टूटता होगा।

बुद्धिजीवियों की खामोशी, कुछ कह रही है
हृदय  की संवेदना कहीं, ओझिल हो रही है
मानसिकता  में अत्यंत, बदलाव आ गया है
जाने क्यों ऐसी घटनाएं, बार-बार घट रहीं है ।

बुत बन कर आखिर, क्या हासिल करोगे
बिखर जाओगे जब, खुद  से  दगा करोगे,
अहसास और इंसानियत  को  जिंदा रखो
इंसान  हो, पत्थर  बन  कर क्या  करोगे ।

©सुनील जोशी`,
    //excerpt: 'In the rain, a small lamp keeps its own weather.',
    //collection: null,
    language: 'Hindi',
    themes: ['Sorrow', 'Grief', 'Memory', 'करुण'],
    //year: 2024,
    //coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'आखिर कब तक..',
    slug: 'आखिर कब तक..',
    content: 
    `अंतर्मन का शोर सुनाई दे रहा,
चिर परिचित सा स्वर सुनाई दे रहा,
अनहोनी घटने के उपरांत,
फिर एकत्र जनों का रोष दिखाई दे रहा,
क्यों ये ज्वाला बुझ जाती,
जो अकस्मात हृदय में जल जाती,
क्यों चंद दिनों में फिर से,
सिर्फ बातें ही रह जाती,
क्या विरोध करना है,
इसलिए विरोध करेंगें??
ये जुल्म अब,
कब तक हम सहेंगे,
इन बलात्कारियों को,
बचाने वाले जाने कहां से आते हैं,
उनके घर भी बेटी है,
कैसे भूल वो जाते है,
बेटी को हरपल टोकते,
मर्यादा का उपदेश थोपते,
ज़रा सिखा दो बेटों को भी,
क्या मर्यादा होती है,
स्त्री नहीं, वो रूप है ' मां ' का,
देवी तुल्य जो होती है,
मांग है मेरी राजतंत्र से,
नियम कठोर बनाना होगा,
फिर भी जो,
दुस्साहस दिखलाए,
दुर्भावना मन में लाए,
उसको सबक सिखलाना होगा,
एक मिसाल कायम कर,
संदेश सब तक,
पहुंचाना होगा..

©सुनील जोशी`,
    //excerpt: 'Some letters were never mailed; they waited in the drawers of longing.',
    //collection: null,
    language: 'Hindi',
    themes: ['Anger', 'Fury', 'Time', 'रौद्र'],
    //year: 2024,
    //coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
  },
    {
    title: 'वीर धरा के वीरों सुन लो',
    slug: 'वीर धरा के वीरों सुन लो',
    content: 
    `वीर धरा के वीरों सुन लो,
कहता मैं जुबानी
भारत की धरती पर जन्में
महावीरों की कहानी।

शौर्य जिनका आभूषण था
ऐसे वे बलिदानी
मातृभूमि पर न्योछावर थे
परम वीर अभिमानी।

वीर धरा के वीरों सुन लो..

पुरु, प्रताप का देश निराला
बसते, यहां स्वाभिमानी
दुश्मन को पल में धूल चटाएं
शूरवीर सेनानी।

वीर धरा के वीरों सुन लो..

पृथ्वीराज, शिवाजी की
थी, सुनी सभी ने कहानी
अंतिम सांसों तक दुश्मन की
जिसने नींव हिला दी।

वीर धरा के वीरों सुन लो..

आन बान और शान की खातिर
गुरुओं ने दी कुर्बानी
हाथों में कृपाण लिए
दस्तार, शीश पर बांधी।

वीर धरा के वीरों सुन लो..

सुनी दहाड़ जब झांसी की
अंग्रेजों ने रस्ता मोड़ा
रानी की तलवार ने देखो
कोई मैदान न छोड़ा।

वीर धरा के वीरों सुन लो..

भगत, राजगुरु और बिस्मिल ने
ओढ़ बसंती चोला
आजाद के साहस से, था
गोरों का सिंहासन डोला।

वीर धरा के वीरों सुन लो..

याद करो तुम पुरखों के
अमरत्व की कहानी
हंसते हंसते त्यागा देह
न टपका आंख से पानी।

वीर धरा के वीरों सुन लो,
कहता मैं जुबानी
भारत की धरती पर जन्में
महावीरों की कहानी।

©सुनील जोशी`,
    //excerpt: 'Some letters were never mailed; they waited in the drawers of longing.',
    //collection: null,
    language: 'Hindi',
    themes: ['Courage', 'Valor', 'Spirited Resolve', 'वीर'],
    //year: 2024,
    //coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
  },
    {
    title: 'ये कैसा चलन..',
    slug: 'ये कैसा चलन..',
    content: 
    `ये चलन हमें अब स्वीकार नहीं,
है जिसका जीवन में मान नहीं।

मादकता में डूबा हर गांव शहर
कहना होगा अब, बर्दाश्त नहीं।।

सीमित होती अब जीवनशैली ,
बसते संबंध अब, प्रगाढ़ नहीं।

मित्र, परिवार न सखा ही जाने
ढलते रिश्तों का, न मान कहीं।।

झटपट, खटपट और फटाफट
समय का जैसे कोई ज्ञान नहीं।

आधुनिकता की होड़ में, मानव
पिछड़ रहा, तुझको  ज्ञात नहीं।।

स्वार्थ, अहंकार है तुझ पर भारी
इसका, तुझे रत्ती भर भान नहीं।

द्वार पतन के अग्रसर हो चला है,
तू, इतना भी तो अनजान नहीं ।।

ये चलन हमें अब स्वीकार नहीं,
है जिसका जीवन में मान नहीं।

©सुनील जोशी`,
    //excerpt: 'Some letters were never mailed; they waited in the drawers of longing.',
    //collection: null,
    language: 'Hindi',
    themes: ['Fear', 'Dread', 'Mystery', 'भयानक'],
    //year: 2024,
    //coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
  },
    {
    title: 'मैं हैरान हूं..',
    slug: 'मैं हैरान हूं..',
    content: 
    `मैं  हैरान  हूं, हम  सब फिर आंसू बहाएंगे
मोमबत्तियां पूरे शहर में, फिर से जलाएंगे
होगा धरना प्रदर्शन और नारेबाजी  का दौर शुरू,
कुछ लोग उस मानसिकता को, फिर से बचाएंगे।

कौन  है  ये, जिनके  सिर में दरिंदगी भरी है
बुरी नजर है आंखों में, सीने में हवस भरी है
समाज में अक्सर दिख  जाते हैं, ऐसे व्यभिचारी
जो औरत को भोग समझते, हैं दंड के अधिकारी।

अमानवीयता की  हद  पार हो गई, सहती रही नारी
निर्भया जैसी अनगिनत है, कहो किसकी जिम्मेदारी
इतना  दुस्साहस  कैसे  उस  निर्लज के भीतर आया
जिसने  एक बेटी को, पूरे समाज के सम्मुख जलाया।

क्या कर रहा तंत्र हमारा, और बैठे आदरणीय सभी
ऐसे कृत्य को जानकर, क्या नहीं खौलता लहू कभी
किस बात की कर रहे प्रतीक्षा, क्यों न देते दंड अभी
कहां गए समाज के हितैषी, जो  बनते थे ढाल कभी।

कुछ पलों का ये आक्रोश, फिर सुस्त पड़ जायेगा
और अपना समाज, इस घटना  को  भूल जायेगा
मैं  हैरान  हूं, हम  सब  फिर  आंसू  बहाएंगे
जब ऐसी दुखद खबर, फिर अखबार में पाएंगे।
    
©सुनील जोशी`,
    //excerpt: 'Some letters were never mailed; they waited in the drawers of longing.',
    //collection: null,
    language: 'Hindi',
    themes: ['Aversion', 'Disgust', 'Truth', 'वीभत्स'],
    //year: 2024,
    //coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
  },
    {
    title: 'कल्पना..',
    slug: 'कल्पना..',
    content: 
    `तुम मात्र कल्पना हो
या मेरा विश्वास,
तुम हो इस ब्रह्मांड में
सुखद है ये आस,
तुम एक अनदेखा
शाश्वत सत्य हो,
या मेरे मस्तिष्क में
उपजा कोई अनुमान।

कौन हो तुम, जो
पहेली से प्रतीत होते हो,
दृष्टिगोचर नहीं
आस्था में, निहित रहते हो
सुना है, तुमको
तरंगों से लगाव बहुत है
वार्तालाप में तुम,
आवृत्ति की बात करते हो।

तुम्हारा बार बार
मेरे समीप आना,
कई संभावनाओं को
जाग्रत कर जाना,
तुम्हारी छवि और स्वरूप का,
आकार, घर कर जाना
किंचित कोई रहस्य होगा
या फिर कोई ताना-बाना।
    
©सुनील जोशी`,
    //excerpt: 'Some letters were never mailed; they waited in the drawers of longing.',
    //collection: null,
    language: 'Hindi',
    themes: ['Astonishment', 'Wonder', 'Creation', 'अद्भुत'],
    //year: 2024,
    //coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
  },
    {
    title: 'जीवन',
    slug: 'जीवन',
    content: 
    `जीवन से जुड़ी है कुछ अपेक्षाएं 
कुछ जरूरतें,
कुछ आस
और कुछ उम्मीदें
कर्तव्य के नाम अलग हो सकते हैं 
लेकिन कर्म करने की
जद्दोजहत हमेशा बनी रहनी चाहिए 
कर्म अपने लिए,
परिवार के लिए,
समाज के लिए,
सार्थक कर्म, 
जीवन जीने के लिए
और, 
साथ में जिम्मेदारियों को निभाने की क्षमता
जो हमें, 
निरंतर प्रयासरत रहने की प्रेरणा प्रदान करता हैं
प्रकृति है, परमात्मा है
भाग्य है, कर्म है..
और इन सबका स्वरूप ही जीवन है।
सबका अपना दाना पानी निर्धारित है
अपना दाना चुंगो और फुर्र.. 
मुक्त हो जाओ
इस चक्र से..
जीवन चक्र से..
कठिन है.. संभव है!
    
©सुनील जोशी`,
    //excerpt: 'Some letters were never mailed; they waited in the drawers of longing.',
    //collection: null,
    language: 'Hindi',
    themes: ['Tranquility', 'Peace', 'Calm', 'शांत'],
    //year: 2024,
    //coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
  },
    {
    title: 'माँ..',
    slug: 'माँ..',
    content: 
    `जब आंख खुली, तुझे पाया था
स्पर्श को तेरे, मैं समझ पाया था।

तेरी ममता के, आंचल की छांव तले,
तूने रखी नजर, जब कदम बढ़ चले।

बड़े दुलार से, तूने खिलाया था
गा के लोरी माँ, तूने सुलाया था।

सारी थकान, पल भर में गायब हुई
जब तूने, सिर को मेरे सहलाया था।

तेरे त्याग और समर्पण की क्या बात कहूं, 
खुद जागकर रातों को, हमें सुलाया था।

अपना पेट काटकर, उस आखिरी रोटी को 
माँ, तूने हम बच्चों को खिलाया था।

तेरी याद में क्यों मनाऊं सिर्फ एक दिन, मैं
जब तूने हर दिन, अपना (बच्चों का) मनाया था।

ईश्वर की पूजा मैं, करूं रात दिन
उसी रूप में माँ, हमने तुझे पाया था।

जब आंख खुली, तुझे पाया था
स्पर्श को तेरे, मैं समझ पाया था।
    
©सुनील जोशी`,
    //excerpt: 'Some letters were never mailed; they waited in the drawers of longing.',
    //collection: null,
    language: 'Hindi',
    themes: ['Parental Love', 'Care', 'Tenderness', 'वात्सल्य'],
    //year: 2024,
    //coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
  },
    {
    title: 'कैकेयी माता',
    slug: 'कैकेयी-माता',
    content: 
    `आज भवन को सजाती देखो, कैकेयी माता
दीपों के प्रकाश से उज्ज्वल,  दृश्य सुहाता ।
दूत ने जबसे आकर यह, समाचार सुनाया
हर्षित मन है, फिर भी व्याकुल कैकेयी माता।

राम सिया से मिलन की मन में आस जगाए
अपनी धुन में, सुध बुध खोती कैकेयी माता।
कभी मुस्काती, कभी भरमाती, दीप जलाए 
नैनों से नीर बहा, छुपकर रोती कैकेयी माता।

कैसी होगी अद्भुत छवि प्रभु, राम सिया की 
सोच में डूब, अधीर हो जाए कैकेयी माता ।
चौदह बरस के बाद मिलन की आस लगाए
हर पल में, पल-पल को जीती कैकेयी माता।

पुष्पों की माला ले, दीप और थाल सजाए 
नैन बिछा कर, द्वार खड़ी है कैकेयी माता।
ढोल और ताशे बजते देखो आज नगर में
झूम उठी अयोध्या नगरी, संग कैकेयी माता।

नगर प्रवेश किए सिया संग, दोनों भाई
एकटक सी देखती रह गई कैकेयी माता
आगे बढ़कर राम लला का मस्तक चूमा
मन ही मन देखो मुस्काती कैकेयी माता।

सिया राम संग, भ्राता लक्ष्मण आज पधारे
खुश है कौशल्या, सुमित्रा और कैकेयी माता
बड़े चाव से राजभवन में उन्हें बैठाकर,
अपने हाथों से भोग खिलाती, कैकेयी माता।

दीपों की दीपावली, क्या खूब सजी है
राम लला को स्वयं दिखाती कैकेयी माता
वर्षों का बैराग आज, समाप्त हुआ है
जमकर देखो, दुलार लुटाती कैकेयी माता।

©सुनील जोशी`,
    //excerpt: 'Some letters were never mailed; they waited in the drawers of longing.',
    //collection: null,
    language: 'Hindi',
    themes: ['Devotion', 'Spiritual', 'Surrender', 'भक्ति'],
    //year: 2024,
    //coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
  },
];

const books = [
  {
    title: 'SANGINI',
    description: 'A collection of poems rooted in memory, landscape, and the patient language of belonging.',
    coverImage: '/assets/book.jpeg',
    author: 'Sunil Joshi',
    year: 2026,
    featured: true,
    purchaseUrl: 'https://www.amazon.in/SANGINI-SUNIL-JOSHI/dp/B09SXCCHJT/ref=sr_1_4?dib=eyJ2IjoiMSJ9.UXF9gLiag19zQ3ubNLvlBaHBCKOzT4tviLBUWYfTNHi-uaOi-DSP2y4IzDC2m637fqqYtGSt08Mm_x5C5mwetsCsu_Lp76wcsp0vVGquxgktNhoIeUinjIiAAR5BrsvTBg8nnBcE8iIn32oxPeAsvr8QqqSZjCFOjJeqTDCBsEXsKGi4oazlYUYT07d5ufJ-Qsyc91Pc438SrMsvTyJJbxC2XtJT8YiRMFyxW902eEo.lFe2VlzhqLfAOCXnPLFYFN8wDpZunkS-5E8wJgthBgA&dib_tag=se&keywords=SANGINI&qid=1795273243&sr=8-4'
  }
];

const videos = [
  // {
  //   title: 'Poetry at Dusk',
  //   description: 'A reading shaped by rain, memory and quiet evening light.',
  //   thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  //   videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
  //   featured: true
  // },
  // {
  //   title: 'Monsoon in the City',
  //   description: 'A short visual essay on rain, architecture, and remembrance.',
  //   thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  //   videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
  //   featured: false
  // }
];

const gallery = [
    { title: 'सावित्रीबाई ज्योतिबा फुले साहित्य सेवा सम्मान', image: '/assets/gallery/1.jpeg', category: 'AWARDS', description: 'सावित्रीबाई ज्योतिबा फुले साहित्य सेवा सम्मान 2026', location: 'Pune', year: 2026 },
    { title: 'तितिक्षा इंटरनेशनल सम्मान', image: '/assets/gallery/2.jpeg', category: 'AWARDS', description: 'भारतीय विचार साधना 2025', location: 'Pune', year: 2025 },
    { title: 'कला साहित्य सम्मेलन', image: '/assets/gallery/3.jpeg', category: 'EVENTS', description: 'भारतीय विचार साधना 2025', location: 'Pune', year: 2025 },
    { title: 'बाल भारती', image: '/assets/gallery/4.jpeg', category: 'PUBLICATIONS', description: 'बाल भारती, पुणे', location: 'Pune', year: 2023 },
    { title: 'अंजुमन, पुणे', image: '/assets/gallery/5.jpeg', category: 'EVENTS', description: 'अंजुमन, पुणे', location: 'Pune', year: 2023 },
    { title: 'Soo-be-it', image: '/assets/gallery/6.jpeg', category: 'EVENTS', description: 'Soo-be-it, Pune', location: 'Pune', year: 2023 },
    { title: 'LWG LIT FEST', image: '/assets/gallery/7.jpeg', category: 'EVENTS', description: 'LWG LIT FEST, Lucknow 2026', location: 'Lucknow', year: 2026 },
    { title: 'NCPA', image: '/assets/gallery/8.jpeg', category: 'EVENTS', description: 'NCPA, Mumbai 2026', location: 'Mumbai', year: 2026 },
    { title: 'LWG LIT FEST', image: '/assets/gallery/9.jpeg', category: 'EVENTS', description: 'LWG LIT FEST, Lucknow 2026', location: 'Lucknow', year: 2026 },
    { title: 'Pune Book Fair', image: '/assets/gallery/10.jpeg', category: 'EVENTS', description: 'Pune Book Fair, Pune 2026', location: 'Pune', year: 2026 },
    { title: 'हिंदी गौरव सम्मान', image: '/assets/gallery/11.jpeg', category: 'AWARDS', description: 'हिंदी गौरव सम्मान, पुणे 2025', location: 'Pune', year: 2025 },
    { title: 'पुणे पुस्तक जत्रा', image: '/assets/gallery/12.jpeg', category: 'EVENTS', description: 'पुणे पुस्तक जत्रा, पुणे 2026', location: 'Pune', year: 2026 },
    { title: 'सभागार', image: '/assets/gallery/13.jpeg', category: 'EVENTS', description: 'मुंबई विश्वविद्यालय, मुंबई 2024', location: 'Mumbai', year: 2024 }
];

const getPreparedPoems = () => poems.map((poem) => {
  const collectionSlug = getCollectionSlug(poem.title);
  const collection = collections.find((entry) => entry.slug === collectionSlug);

  if (!collection) {
    throw new Error(`Poem "${poem.title}" references unknown collection "${collectionSlug}".`);
  }

  const excerpt = poem.excerpt?.trim()
    || poem.content.split(/\r?\n/).map((line) => line.trim()).find(Boolean)?.slice(0, 200);

  return {
    ...poem,
    excerpt,
    year: poem.year ?? collection.year,
    collectionSlug
  };
});

const validateSeedData = () => {
  const collectionSlugs = new Set();
  for (const collection of collections) {
    if (collectionSlugs.has(collection.slug)) {
      throw new Error(`Duplicate collection slug "${collection.slug}".`);
    }
    collectionSlugs.add(collection.slug);
  }

  const preparedPoems = getPreparedPoems();
  const poemSlugs = new Set();
  for (const poem of preparedPoems) {
    if (poemSlugs.has(poem.slug)) {
      throw new Error(`Duplicate poem slug "${poem.slug}".`);
    }
    poemSlugs.add(poem.slug);
  }

  const documents = [
    [Collection, collections],
    [Poem, preparedPoems.map((poem) => ({ ...poem, collection: new mongoose.Types.ObjectId() }))],
    [Book, books],
    [Video, videos],
    [GalleryItem, gallery]
  ];

  for (const [Model, records] of documents) {
    records.forEach((record, index) => {
      const error = new Model(record).validateSync();
      if (error) {
        throw new Error(`${Model.modelName} seed record ${index + 1} is invalid: ${error.message}`);
      }
    });
  }

  const assetPaths = [
    ...collections.map(({ coverImage }) => coverImage),
    ...books.map(({ coverImage }) => coverImage),
    ...gallery.map(({ image }) => image)
  ];

  for (const assetPath of assetPaths) {
    const localPath = path.resolve(publicAssetsPath, `.${assetPath}`);
    if (!assetPath.startsWith('/assets/') || !localPath.startsWith(`${publicAssetsPath}${path.sep}`) || !fs.existsSync(localPath)) {
      throw new Error(`Seed image is missing or outside frontend/public: "${assetPath}".`);
    }
  }

  return preparedPoems;
};

const seedDatabase = async () => {
  const preparedPoems = validateSeedData();
  await connectDB();

  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      await PoemLike.deleteMany({}, { session });
      await Poem.deleteMany({}, { session });
      await Collection.deleteMany({}, { session });
      await Book.deleteMany({}, { session });
      await Video.deleteMany({}, { session });
      await GalleryItem.deleteMany({}, { session });

      const insertedCollections = await Collection.insertMany(collections, { session });
      const collectionMap = new Map(insertedCollections.map((collection) => [collection.slug, collection._id]));
      const poemsWithCollections = preparedPoems.map(({ collectionSlug, ...poem }) => {
        const collectionId = collectionMap.get(collectionSlug);
        if (!collectionId) {
          throw new Error(`No inserted collection found for poem "${poem.title}".`);
        }
        return { ...poem, collection: collectionId };
      });

      await Poem.insertMany(poemsWithCollections, { session });

      for (const collection of insertedCollections) {
        const poemCount = await Poem.countDocuments({ collection: collection._id }).session(session);
        await Collection.updateOne({ _id: collection._id }, { $set: { poemCount } }, { session });
      }

      await Book.insertMany(books, { session });
      if (videos.length) await Video.insertMany(videos, { session });
      await GalleryItem.insertMany(gallery, { session });
    });

    console.log('Seed data inserted successfully.');
  } finally {
    await session.endSession();
    await mongoose.connection.close();
  }
};

const getCollectionSlug = (title) => {
  const map = {
    'मैं तेरे प्रेम में, गीत रच जाऊंगा': 'shringara-rasa',
    'चुनावी पर्चा': 'hasya-rasa',
    'तुम साक्षी हो न..': 'karuna-rasa',
    'आखिर कब तक..': 'raudra-rasa',
    'वीर धरा के वीरों सुन लो': 'veer-rasa',
    'ये कैसा चलन..': 'bhayanak-rasa',
    'मैं हैरान हूं..': 'vibhatsa-rasa',
    'कल्पना..': 'adbhut-rasa',
    'जीवन': 'shant-rasa',
    'माँ..': 'vatsalya-rasa',
    'कैकेयी माता': 'bhakti-rasa'
  };

  const collectionSlug = map[title];
  if (!collectionSlug) {
    throw new Error(`No collection mapping found for poem "${title}".`);
  }
  return collectionSlug;
};

if (process.argv.includes('--validate')) {
  try {
    const validatedPoems = validateSeedData();
    console.log(`Seed data is valid: ${collections.length} collections, ${validatedPoems.length} poems, ${books.length} books, ${gallery.length} gallery items.`);
  } catch (error) {
    console.error('Seed validation failed:', error.message);
    process.exitCode = 1;
  }
} else {
  seedDatabase().catch((error) => {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  });
}
