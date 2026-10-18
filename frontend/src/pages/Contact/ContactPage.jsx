export default function ContactPage() {
  return (
    <>
      <section className="page-hero section-block">
        <div className="container narrow">
          <p className="eyebrow">Contact</p>
          <h1>For notes, readings and literary correspondence.</h1>
          <p className="page-intro">Poetry Ink is a quiet place for poems and the conversations that grow around them. Contact details will be added here.</p>
        </div>
      </section>

      <section className="contact-details-section section-block">
        <div className="container contact-details-grid">
          <article className="contact-detail-card">
            <span className="contact-detail-index">01</span>
            <h2>Email</h2>
            <span className="contact-detail-blank" aria-hidden="true" />
            <span className="sr-only">Email contact details to be added</span>
          </article>
          <article className="contact-detail-card">
            <span className="contact-detail-index">02</span>
            <h2>Readings &amp; events</h2>
            <span className="contact-detail-blank" aria-hidden="true" />
            <span className="sr-only">Reading and event contact details to be added</span>
          </article>
          <article className="contact-detail-card">
            <span className="contact-detail-index">03</span>
            <h2>Press &amp; collaborations</h2>
            <span className="contact-detail-blank" aria-hidden="true" />
            <span className="sr-only">Press and collaboration contact details to be added</span>
          </article>
        </div>
      </section>
    </>
  );
}