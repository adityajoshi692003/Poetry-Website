export default function QuoteSection({ quote, attribution, variant = 'default' }) {
  return (
    <section className={`quote-section ${variant}`}>
      <div className="quote-mark">“</div>
      <blockquote>{quote}</blockquote>
      {attribution && <p className="quote-attribution">{attribution}</p>}
    </section>
  );
}
