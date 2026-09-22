import { Link } from 'react-router-dom';
import mountain from '../assets/travel/himalayas.jpg';

export default function Contact() {
  return <section className="py-12 sm:py-16">
    <p className="eyebrow text-xs text-[#8a6526] mb-4">A good journey starts with a conversation</p>
    <h1 className="teko-head text-5xl sm:text-6xl mb-10">Let’s go somewhere.</h1>
    <div className="grid md:grid-cols-2 overflow-hidden rounded-xl border border-[#221A10]/15 bg-[#FFFDF8]">
      <img src={mountain} alt="Mountain landscape" className="w-full h-64 md:h-full min-h-0 object-cover" />
      <div className="p-7 sm:p-12 space-y-8">
        <div><p className="eyebrow text-xs text-[#8a6526] mb-3">Visit us</p><h2 className="teko text-3xl">Chitkara University</h2></div>
        <div><p className="eyebrow text-xs text-[#8a6526] mb-3">Call us</p><a className="text-lg hover:underline" href="tel:+918295699366">+91 82956 99366</a></div>
        <div><p className="eyebrow text-xs text-[#8a6526] mb-3">Write to us</p><a className="break-all hover:underline" href="mailto:singhjasnoor1421@gmail.com">singhjasnoor1421@gmail.com</a></div>
        <p className="text-sm text-[#4A3B28] leading-relaxed">Have a destination in mind? Tell us your travel dates, group size and what you’d love to experience.</p>
        <Link to="/collection" className="inline-block bg-[#221A10] text-[#FBF7EE] px-6 py-3 rounded">Explore journeys →</Link>
      </div>
    </div>
  </section>;
}
