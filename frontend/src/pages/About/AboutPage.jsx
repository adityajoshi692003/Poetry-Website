import poetPortrait from '../../assets/images/18.jpeg';
const themes = ['Love', 'Laughter', 'Sorrow', 'Anger', 'Zeal', 'Fear', 'Disgust', 'Wonder', 'Detachment', 'Parental Love', 'Devotion'];
const influences = ['Indian classical literature', 'Bhakti poetry', 'Oral traditions'];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero section-block about-page-hero">
        <div className="container narrow">
          <p className="eyebrow">About the Poet</p>
          <h2>Meet The Soul Behind The Verses !!</h2>
          <p className="page-intro">Every poem begins somewhere — a thought, a feeling, a fleeting moment or a story waiting to be told. 
            Discover the journey, inspirations and emotions that breathe life into these words.
          </p>
        </div>
      </section>

      <div className="container about-layout">
        <figure className="portrait-card">
          <img src={poetPortrait} alt="Hindi poet and author Sunil Joshi" loading="lazy" />
          <figcaption>
            <strong>सुनील जोशी</strong>
            <span>कवि एवं लेखक</span>
          </figcaption>
        </figure>

        <div className="about-copy">
          <p className="about-intro">About the Poet</p>
          <p>
            सुनील जोशी समकालीन हिंदी साहित्य के जाने-माने कवि और लेखक हैं। उनकी रचनाओं में जीवन के अनुभव, मानवीय संवेदनाएं और शब्दों की मिठास एक साथ दिखाई देती है। <br />
            उनका स्वतंत्र कविता संग्रह "संगिनी" पाठकों द्वारा खूब सराहा गया है। इसके अतिरिक्त वे 12 से अधिक साझा काव्य संकलनों में भी अपनी रचनाओं के साथ उपस्थित रहे हैं। उनकी कविताएं और लेख विभिन्न प्रतिष्ठित समाचार पत्रों, पत्रिकाओं और साहित्यिक पत्रिकाओं में निरंतर प्रकाशित होते रहे हैं। <br />
            साहित्य के साथ-साथ वे आकाशवाणी से भी जुड़े हैं। आकाशवाणी के लोकप्रिय कार्यक्रम "कलश" में उन्होंने अपनी काव्य प्रस्तुति देकर श्रोताओं का मन मोहा है। शिक्षा के क्षेत्र में भी उनका योगदान है — सी.बी.एस.ई. के राष्ट्रीय दीक्षा पोर्टल पर उनकी रचनाएं प्रकाशित हैं, जहाँ से देशभर के शिक्षक और विद्यार्थी लाभान्वित होते हैं। <br />
            सुनील जोशी जी ने मुंबई विश्वविद्यालय, एन.सी.पी.ए. मुंबई सहित देश के अनेक प्रतिष्ठित साहित्यिक मंचों पर अपनी कविताओं का पाठ किया है। उनकी काव्य भाषा सरल, प्रवाहमयी और हृदय को छू लेने वाली है, जो उन्हें श्रोताओं और पाठकों दोनों का प्रिय बनाती है।
          </p>

          <div className="tag-list">
            {themes.map((theme) => (
              <span key={theme}>{theme}</span>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
