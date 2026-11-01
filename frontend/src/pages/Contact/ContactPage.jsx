const contactDetails = {
  instagram: 'https://www.instagram.com/suniljoshi_poet/',
  facebook: 'https://www.facebook.com/share/1CybGZaUQA/',
  youtube: 'https://youtube.com/@hindipoetrybysunil?si=hAjxBRdSUWDGkkiU',
  email: '',
  phone: ''
};

export default function ContactPage() {
  return (
    <div className="contact-world">
      <section className="page-hero section-block">
        <div className="container narrow">
          <p className="eyebrow">The quiet courtyard</p>
          <h1>Find me beyond the page.</h1>
          <p className="page-intro">Follow along, or get in touch through the details below.</p>
        </div>
      </section>

      <section className="contact-details-section section-block">
        <div className="container contact-details-grid">
          <article className="contact-detail-card">
            <span className="contact-detail-index">01 · Social</span>
            <h2>Follow along</h2>
            <div className="contact-social-links">
              <a href={contactDetails.instagram} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.7" cy="6.5" r=".8" className="icon-fill" />
                </svg>
                <span>Instagram</span>
              </a>
              <a href={contactDetails.facebook} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.1 20v-7h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.3 1.4-1.3H17V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v1.8H8.3v2.8h2.5v7" />
                </svg>
                <span>Facebook</span>
              </a>
              <a href={contactDetails.youtube} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 8.2a2.8 2.8 0 0 0-2-2C17.2 5.7 12 5.7 12 5.7s-5.2 0-7 .5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.5 12a29 29 0 0 0 .5 3.8 2.8 2.8 0 0 0 2 2c1.8.5 7 .5 7 .5s5.2 0 7-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-3.8 29 29 0 0 0-.5-3.8Z" />
                  <path d="m10 15 5-3-5-3v6Z" className="icon-fill" />
                </svg>
                <span>YouTube</span>
              </a>
            </div>
          </article>

          <article className="contact-detail-card">
            <span className="contact-detail-index">02 · Direct</span>
            <h2>Get in touch</h2>
            <div className="contact-detail-list">
              <p>
                <span>Email</span>
                {contactDetails.email
                  ? <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
                  : <span className="contact-detail-pending">Email address to be added</span>}
              </p>
              <p>
                <span>Phone / WhatsApp</span>
                {contactDetails.phone
                  ? <a href={`tel:${contactDetails.phone.replace(/[^\d+]/g, '')}`}>{contactDetails.phone}</a>
                  : <span className="contact-detail-pending">Phone number to be added</span>}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
