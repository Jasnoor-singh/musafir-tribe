// Names and trips supplied by the project owner. Quotes and ratings are left
// unset until the travellers' actual feedback is provided.
const reviews = [
  { name: 'Tushar Sharma', trip: 'Kasol trip', initials: 'TS', quote: null },
  { name: 'Kanwalpreet Singh', trip: 'Jibhi trip', initials: 'KS', quote: null },
  { name: 'Akshat Chaudhary', trip: 'Jibhi trip', initials: 'AC', quote: null },
];
export default function HomeFeedback() {
  return <section className="home-section traveller-section" aria-labelledby="reviews-heading">
    <div className="home-section-heading"><div><p className="home-eyebrow">The people make the journey</p><h2 id="reviews-heading">A few faces <em>from the tribe.</em></h2></div><p>Different people. Shared adventures.<br />Memories that come home with you.</p></div>
    <div className="traveller-grid">{reviews.map((review, index) => <article className="traveller-card" key={review.name}>
      <div className="traveller-card-top"><span className="home-eyebrow">TRAVEL DIARY / 0{index + 1}</span><span className="review-quote-mark" aria-hidden="true">“</span></div>
      <p className="traveller-trip">{review.trip}</p>
      <p className="traveller-quote">{review.quote || 'Their story is coming soon.'}</p>
      <div className="traveller-person"><span className="traveller-avatar">{review.initials}</span><div><h3>{review.name}</h3><p>Musafir Tribe traveller</p></div></div>
    </article>)}</div>
  </section>;
}
