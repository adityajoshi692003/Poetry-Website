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
                Instagram <span aria-hidden="true">↗</span>
              </a>
              <a href={contactDetails.facebook} target="_blank" rel="noreferrer">
                Facebook <span aria-hidden="true">↗</span>
              </a>
              <a href={contactDetails.youtube} target="_blank" rel="noreferrer">
                YouTube <span aria-hidden="true">↗</span>
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
