import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiArrowDown, FiPause, FiPlay } from 'react-icons/fi';
import video from '../assets/frontend_assets/vid2.mp4';
import poster from '../assets/travel/himalayas.jpg';
import '../homepage.css';

export default function Hero() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [category, setCategory] = useState('');
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) videoRef.current?.play().catch(() => {});
  }, []);
  const toggleVideo = () => {
    if (videoRef.current.paused) videoRef.current.play().catch(() => {});
    else videoRef.current.pause();
  };
  return <section className="home-hero" aria-labelledby="hero-heading">
    <img className="hero-landscape" src={poster} alt="Himalayan peaks above a pine forest" fetchPriority="high" />
    <video ref={videoRef} src={video} poster={poster} preload="metadata" muted loop playsInline aria-hidden="true" className="hero-landscape" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    <div className="hero-shade" />
    <div className="hero-copy">
      <p className="home-eyebrow light"><span /> A little further. A little freer.</p>
      <h1 id="hero-heading">Good places.<br /><em>Better company.</em></h1>
      <p className="hero-description">Trade the everyday for mountain air, unfamiliar roads and stories worth bringing home.</p>
      <div className="hero-actions">
        <Link className="home-button gold" to="/collection">Find your next journey <FiArrowUpRight /></Link>
        <a className="hero-secondary" href="#explore">Take a look around <FiArrowDown /></a>
      </div>
    </div>
    <div className="hero-bottom">
      <p>For the places.<br /><span>And the people you find along the way.</span></p>
      <button onClick={toggleVideo} className="hero-play" aria-label={playing ? 'Pause background video' : 'Play background video'}>{playing ? <FiPause /> : <FiPlay />}</button>
    </div>
    <form className="journey-finder" onSubmit={e => { e.preventDefault(); navigate(category ? `/collection?category=${encodeURIComponent(category)}` : '/collection'); }}>
      <div><p className="home-eyebrow">Your next chapter</p><p className="finder-title">Where do you feel like going?</p></div>
      <label><span>Choose your kind of escape</span><select aria-label="Choose your kind of escape" value={category} onChange={e => setCategory(e.target.value)}><option value="">Anywhere feels good</option><option value="Mountains">Into the mountains</option><option value="Deserts">Out to the dunes</option><option value="Beach">Down to the coast</option></select></label>
      <button className="home-button dark" type="submit">Explore journeys <FiArrowUpRight /></button>
    </form>
  </section>;
}
