import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

/**
 * Book Now enquiry modal.
 *
 * A package-specific lead form that does two things from one place:
 *   1. "Send Enquiry"  -> submits the lead via Web3Forms (same service the
 *                          site's PopupForm already uses).
 *   2. "Book on WhatsApp" -> opens WhatsApp with the trip + traveller details
 *                          pre-filled, so the user lands in chat ready to book.
 *
 * Styled to match the site's cream/amber (#C2913B) theme.
 *
 * Props:
 *   isOpen       (bool)   - controls visibility
 *   onClose      (fn)     - called to close the modal
 *   packageName  (string) - the trip/package the enquiry is about
 *   price        (number) - package price (optional, shown for context)
 *   currency     (string) - currency symbol, e.g. "₹ "
 */

// Business contact — kept in one place so it's easy to change.
const WHATSAPP_NUMBER = "918295699366"; // country code + number, for wa.me
const WEB3FORMS_KEY = "8c1faef5-4354-4e6b-b812-9687c9243ee8";

const BookNowForm = ({ isOpen, onClose, packageName = "", price, currency = "₹ " }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [travelers, setTravelers] = useState("");
  const [month, setMonth] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const priceLine = price ? `${currency}${price}` : "On request";

  const summaryText = () =>
    [
      "*New Booking Enquiry*",
      `Package: ${packageName || "Not specified"}`,
      `Price: ${priceLine}`,
      `Name: ${name || "Not specified"}`,
      `Mobile: ${code} ${mobile || "Not specified"}`,
      email ? `Email: ${email}` : null,
      `Travellers: ${travelers || "Not specified"}`,
      `Month of travel: ${month || "Not specified"}`,
      message ? `Message: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

  const needsBasics = () => {
    if (!name.trim() || !mobile.trim()) {
      alert("Please add your name and mobile number first.");
      return true;
    }
    return false;
  };

  // Action 1: submit as a lead via Web3Forms
  const sendEnquiry = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Booking Enquiry — ${packageName || "Trip"}`,
          name,
          email,
          phone: `${code} ${mobile}`,
          message: summaryText(),
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
      } else {
        alert("Couldn't send your enquiry. Please try again.");
      }
    } catch (err) {
      console.error("Enquiry error:", err);
      alert("Couldn't send your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Action 2: open WhatsApp with details pre-filled
  const bookOnWhatsApp = () => {
    if (needsBasics()) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summaryText())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const close = () => {
    setSuccess(false);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-3">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl relative overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Header band in the site's amber */}
        <div className="bg-[#C2913B] px-5 py-4 relative">
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-2 right-3 text-black/60 hover:text-black text-3xl leading-none focus:outline-none"
          >
            &times;
          </button>
          <h2 className="teko text-3xl tracking-wider text-black leading-none">BOOK THIS TRIP</h2>
          {packageName && (
            <p className="text-sm text-orange-950 font-semibold mt-1 capitalize">
              {packageName} <span className="font-normal">· {priceLine}</span>
            </p>
          )}
        </div>

        {success ? (
          <div className="p-6 text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-lg font-semibold text-orange-950">Enquiry sent!</h3>
            <p className="text-sm text-gray-500 mt-1">
              Our team will reach out shortly. Prefer to chat now?
            </p>
            <button
              onClick={bookOnWhatsApp}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-md font-medium text-sm transition"
            >
              <FaWhatsapp className="text-lg" /> Continue on WhatsApp
            </button>
            <button onClick={close} className="mt-3 text-sm text-gray-500 hover:text-black underline">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={sendEnquiry} className="p-5 space-y-3">
            <input
              type="text"
              placeholder="Full Name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />

            <div className="flex gap-2">
              <select
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-1/3 border border-gray-300 rounded-md py-2 px-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              >
                <option value="+91">(+91) IN</option>
                <option value="+1">(+1) US</option>
                <option value="+44">(+44) UK</option>
                <option value="+61">(+61) AUS</option>
                <option value="+971">(+971) UAE</option>
              </select>
              <input
                type="tel"
                placeholder="Mobile Number*"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-2/3 border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />

            <div className="flex gap-2">
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-1/2 border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              >
                <option value="">Travellers?</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-1/2 border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              >
                <option value="">Month of travel</option>
                {[
                  "January","February","March","April","May","June",
                  "July","August","September","October","November","December",
                ].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <textarea
              rows="2"
              placeholder="Anything specific? (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />

            <p className="text-xs text-green-600 flex items-center gap-1">
              <span>✔</span> Your details are secure — no spam.
            </p>

            {/* Two actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 teko text-xl tracking-wider rounded-lg border border-[#C2913B] py-2 transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-300 text-gray-600"
                    : "bg-[#C2913B] text-black hover:bg-black hover:text-[#C2913B]"
                }`}
              >
                {isSubmitting ? "SENDING..." : "SEND ENQUIRY"}
              </button>
              <button
                type="button"
                onClick={bookOnWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg py-2.5 text-sm font-medium transition"
              >
                <FaWhatsapp className="text-lg" /> Book on WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookNowForm;
