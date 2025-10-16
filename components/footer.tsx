"use client";

import { useState } from "react";
import { ArrowUp, Facebook, Instagram, Twitter } from "lucide-react";
// import { useShowToast } from "@/lib/toastutils";
// import {
//   Toast,
// } from "@/components/ui/toast";

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const showToast = useShowToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setEmailError("");
    setMessageError("");
    setSuccessMessage("");

    let valid = true;
    if (!validateEmail(email.trim())) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (message.trim().length === 0) {
      setMessageError("Please enter a message.");
      valid = false;
    }

    if (!valid) return;

    const apiUrl = "https://sheetdb.io/api/v1/47f046qdlv850?sheet=Sheet2";
    const formData = { Email: email.trim(), Message: message.trim() };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([formData]),
      });

      const data = await response.json(); // Parse response JSON

      if (data.created === 1) {
        setSuccessMessage(
          "Thank you for reaching out! Our team will get back to you shortly."
        );
        setEmail("");
        setMessage("");
      } else {
        setSuccessMessage("An error occurred while sending the message.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSuccessMessage("An error occurred while sending the message.");
    }
  };

  return (
    <footer id="contact" className="bg-[#010B1C] text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-6 md:px-8 md:border-b border-gray-800">
          <div className="w-full text-center">
            <h2 className="md:text-3xl md:mx-0 mx-1 text-2xl font-bold">
              Carbon <span className="text-[#0091FF]">&</span> Whale
            </h2>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-2 border-2 border-[#98CAE4]"
          >
            <ArrowUp className="h-4 w-4 text-[#98CAE4]" />
          </button>
        </div>

        <div className="grid md:grid-cols-[250px_1fr] md:divide-x md:divide-gray-800">
          <nav className="space-y-4 md:p-8">
            <a href="/" className="block text-[#98CAE4]">
              Home
            </a>
            <a href="/about-us" className="block text-[#98CAE4]">
              About us
            </a>
            <a href="/carbon-design" className="block text-[#98CAE4]">
              Carbon Designs
            </a>
            <a href="/carbon-ads" className="block text-[#98CAE4]">
              Carbon ADS
            </a>
            <a href="/contact-us" className="block text-[#98CAE4]">
              Contact Us
            </a>
            <a href="/contact-us" className="block text-[#98CAE4]">
              Privacy Policy
            </a>
          </nav>

          <div className="md:p-8">
            <div className="md:grid md:grid-cols-2 gap-8">
              <div className="mb-8 md:p-8 flex flex-col justify-end items-start">
                <p className="text-gray-400 mb-6">
                  Innerspace, 69/1854 - A1, SRM Road, Near Nirmala Shishu
                  Bhavan, Kaloor, Kochi, Kerala - 682018
                </p>
                <div className="flex gap-6">
                  <a href="#" className="text-[#98CAE4]">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-[#98CAE4]">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-[#98CAE4]">
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-2xl mb-6">Contact Us</h3>
                <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full text-black bg-white p-3 text-lg focus:outline-none bg-transparent border-l-2 border-b-2 border-[#0091FF] rounded-bl-2xl"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    rows={4}
                    className="w-full text-black bg-white p-3 text-lg focus:outline-none bg-transparent border-l-2 border-b-2 border-[#0091FF] rounded-bl-2xl"
                  />
                  {messageError && (
                    <p className="text-red-500 text-sm">{messageError}</p>
                  )}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="w-2/4 bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA]  text-white px-8 py-3 rounded-lg transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                  {successMessage && (
                    <p className="text-green-500 text-sm text-end">
                      {successMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="md:border-t border-gray-800 px-8 py-4">
          <p className="text-gray-400">2025 . All rights reserved.</p>
        </div>
      </div>
      {/* <Toast /> */}
    </footer>
  );
}
