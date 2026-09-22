import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
export default function ContactUs() {
  return <section className="home-invitation"><div><p className="home-eyebrow light">The next story starts with a hello</p><h2>Somewhere new.<br /><em>Someone like you.</em></h2></div><div className="invitation-action"><p>Tell us where you’d rather be.<br />Let’s turn that thought into a journey.</p><Link className="home-button gold" to="/contact">Let’s plan your trip <FiArrowUpRight /></Link><span>CHITKARA UNIVERSITY</span></div></section>;
}
