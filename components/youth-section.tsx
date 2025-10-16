"use client";

import { useState, useEffect } from "react";
import { useLowCarbon } from "@/context/low-carbon-context";

export function YouthSection() {
  const { isLowCarbon } = useLowCarbon();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [contact, setContact] = useState("");
  const [googleScriptUrl, setGoogleScriptUrl] = useState("");
  const [message, setMessage] = useState(""); // New state for feedback message
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  ); // Message color

  const [nameError, setNameError] = useState("");
  const [organizationError, setOrganizationError] = useState("");
  const [contactError, setContactError] = useState("");

  const texts = ["Shape the Youth!", "Upcycle Workshop"];
  const [currentText, setCurrentText] = useState(texts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev === texts[0] ? texts[1] : texts[0]));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setGoogleScriptUrl(process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || "");
  }, []);

  const validateName = (name: string) => /^[a-zA-Z\s]+$/.test(name);
  const validateContact = (contact: string) => /^\d{10}$/.test(contact);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let valid = true;

    if (!validateName(name.trim())) {
      setNameError("Name should only contain letters and spaces.");
      valid = false;
    } else {
      setNameError("");
    }

    if (!validateContact(contact.trim())) {
      setContactError("Contact should be a 10-digit number.");
      valid = false;
    } else {
      setContactError("");
    }

    if (organization.trim().length === 0) {
      setOrganizationError("Please enter an organization name.");
      valid = false;
    } else {
      setOrganizationError("");
    }

    if (!valid) return;

    if (!googleScriptUrl) {
      setMessage("Google Script URL not available. Please try again later.");
      setMessageType("error");
      return;
    }

    const formData = {
      Name: name.trim(),
      Organization: organization.trim(),
      Contact: contact.trim(),
      SheetName: "Sheet1",
    };

    try {
      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.created === 1) {
        setMessage(
          "Thank you for reaching out! Our team will get back to you shortly."
        );
        setMessageType("success");
        setName("");
        setOrganization("");
        setContact("");
      } else {
        setMessage(
          result.error || "An error occurred while sending the message."
        );
        setMessageType("error");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("An error occurred while sending the message.");
      setMessageType("error");
    }
  };

  return (
    <section id="blog" className="md:py-20 py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className="relative w-full md:w-1/2 md:h-[600px]">
            <div
              className={`absolute top-0 left-0 w-full text-center md:p-6 p-2 ${
                isLowCarbon ? "text-black" : "text-white"
              }`}
            >
              <h2 className="text-2xl text-center md:text-4xl md:mb-4 md:mt-6 mt-2 font-bold transition-all duration-500 ease-in-out">
                {currentText}
              </h2>
              <p className="md:text-[17px] text-[13px] max-w-[80%] mx-auto leading-relaxed">
                Book your slot now and empower the next generation of
                Sustainability Champions.
              </p>
            </div>
            {!isLowCarbon ? (
              <img
                src="/images/youth-new.png"
                alt="Students"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-[90%] max-w-[444px] h-[473px] bg-[#98CAE4]/50 md:bg-[#98CAE4]/50 mx-auto flex items-center justify-center text-center text-lg font-semibold text-gray-800 p-4">
                <span className="mt-4">
                  🌱 Thanks for making a greener choice! By skipping unnecessary
                  images, you&apos;re reducing digital carbon emissions. Every
                  small step counts for our planet. 🌍
                </span>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full p-3 md:text-lg focus:outline-none bg-transparent border-l-[3px] border-b-[3px] border-[#5AAAD4] rounded-bl-2xl"
                  required
                />
                {nameError && (
                  <p className="text-red-500 text-sm">{nameError}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Organization Name"
                  className="w-full p-3 md:text-lg focus:outline-none bg-transparent border-l-[3px] border-b-[3px] border-[#5AAAD4] rounded-bl-2xl"
                  required
                />
                {organizationError && (
                  <p className="text-red-500 text-sm">{organizationError}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Contact (10 digits)"
                  className="w-full p-3 text-lg focus:outline-none bg-transparent border-l-[3px] border-b-[3px] border-[#5AAAD4] rounded-bl-2xl"
                  required
                  pattern="\d{10}"
                />
                {contactError && (
                  <p className="text-red-500 text-sm">{contactError}</p>
                )}
              </div>

              <div className="flex justify-center mt-4 py-4">
                <button
                  type="submit"
                  className="w-2/4 pt-4 bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA] text-white px-8 py-3 rounded-lg transition-colors"
                >
                  Book Now
                </button>
              </div>

              {/* Message display */}
              {message && (
                <p
                  className={`mt-3 text-center ${
                    messageType === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
