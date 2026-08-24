import React, { useState, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";

const PopupForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [travelers, setTravelers] = useState("");
  const [month, setMonth] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Show the popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    // Reset success state after the close animation would finish, so if the
    // popup is ever reopened programmatically later it starts fresh.
    setTimeout(() => setSubmissionSuccess(false), 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formEndpoint = "https://api.web3forms.com/submit";

    const formData = {
      access_key: "8c1faef5-4354-4e6b-b812-9687c9243ee8",
      subject: "New Trip Planning Request",
      name: name,
      email: email,
      message: `
*Let's Plan Your Next Trip!*
Name: ${name}
Mobile: ${mobile}
Travelers: ${travelers || "Not Specified"}
Month of Travel: ${month || "Not Specified"}
Message: ${message || "No message provided"}
      `.trim(),
      phone: mobile,
    };

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmissionSuccess(true);
        setName("");
        setMobile("");
        setEmail("");
        setTravelers("");
        setMonth("");
        setMessage("");
        // Auto-close a few seconds after success so the visitor sees the
        // confirmation, then the popup goes away on its own.
        setTimeout(() => closePopup(), 3000);
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-2">
          <div className="bg-white w-full max-w-sm p-4 sm:p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-5xl focus:outline-none"
              aria-label="Close Popup"
            >
              &times;
            </button>

            {submissionSuccess ? (
              /* Success state — clearly confirms it worked and lets the visitor close manually too */
              <div className="text-center py-6">
                <div className="text-5xl mb-3">🎉</div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Request sent!
                </h2>
                <p className="text-sm text-gray-500">
                  Thanks — we'll be in touch shortly to plan your trip.
                </p>
                <button
                  onClick={closePopup}
                  className="mt-5 px-6 py-2.5 bg-[#221A10] text-[#E3B95C] rounded-md text-sm font-medium hover:bg-[#C2913B] hover:text-[#221A10] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Form Illustration */}
                <div className="text-center ">
                  <img
                    src={assets.logo} // Replace with actual image path
                    alt="illustration"
                    className="w-16 sm:w-24 mx-auto"
                  />
                </div>

                {/* Title and Subtitle */}
                <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-800">
                  Plan Your Trip
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 text-center">
                  Fill out your details to get started!
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-3 sm:space-y-4">
                  {/* Full Name */}
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 sm:py-2.5 sm:px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    placeholder="Full Name*"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  {/* Mobile Number */}
                  <div className="flex gap-2">
                    <select
                      className="w-1/3 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                      defaultValue="+91"
                    >
                      <option value="+91">(+91) IN</option>
                      <option value="+1">(+1) US</option>
                      <option value="+44">(+44) UK</option>
                      <option value="+61">(+61) AUS</option>
                      <option value="+81">(+81) JP</option>
                      <option value="+971">(+971) UAE</option>
                      {/* Add more codes as needed */}
                    </select>
                    <input
                      type="tel"
                      className="w-2/3 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                      placeholder="Mobile Number*"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 sm:py-2.5 sm:px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    placeholder="Email Address*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  {/* Travelers Count and Month of Travel */}
                  <div className="flex gap-2">
                    <select
                      className="w-1/2 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                    >
                      <option value="">Travelers Count?</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4+">4+</option>
                    </select>
                    <select
                      className="w-1/2 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option value="">Month of Travel</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>

                  {/* Message */}
                  <textarea
                    className="w-full border border-gray-300 rounded-md py-2 px-3 sm:py-2.5 sm:px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                    placeholder="Message (Optional)"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>

                  {/* Assurance */}
                  <div className="text-xs text-gray-500">
                    <p className="flex items-center gap-2 text-green-500">
                      <span>✔</span> Your contact data is secure.
                    </p>
                    <p className="flex items-center gap-2 text-red-500">
                      <span>✖</span> No annoying spam calls.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full ${
                      isSubmitting ? "bg-gray-400" : "bg-blue-500"
                    } text-white py-2 sm:py-2.5 rounded-md font-medium transition text-sm`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Details"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;
