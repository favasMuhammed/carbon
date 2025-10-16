"use client";

import type React from "react";
import { useState } from "react";
import { toast } from "../hooks/use-toasts";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useLowCarbon } from "@/context/low-carbon-context";

export default function ContactForm() {
  const { isLowCarbon } = useLowCarbon();
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    hearAboutUs: "",
    requirement: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    contactNumber: "",
    hearAboutUs: "",
    requirement: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";

    // Trim value to check if it's empty after trimming
    const trimmedValue = value.trim();

    if (trimmedValue === "") {
      error = "This field cannot be empty";
    } else if (name === "contactNumber") {
      // Mobile number validation - minimum 10 digits
      const numberPattern = /^\d{10,}$/;
      if (!numberPattern.test(trimmedValue.replace(/\D/g, ""))) {
        error = "Please enter at least 10 digits";
      }
    } else {
      // Alphanumeric validation for other fields
      const alphaNumericPattern = /^[a-zA-Z0-9\s.,!?-]*$/;
      if (!alphaNumericPattern.test(trimmedValue)) {
        error = "Please use only letters, numbers, and basic punctuation";
      }
    }

    return error;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      name: validateField("name", formData.name),
      contactNumber: validateField("contactNumber", formData.contactNumber),
      hearAboutUs: validateField("hearAboutUs", formData.hearAboutUs),
      requirement: validateField("requirement", formData.requirement),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    // Trim all values before submission
    const trimmedData = {
      name: formData.name.trim(),
      contactNumber: formData.contactNumber.trim(),
      hearAboutUs: formData.hearAboutUs.trim(),
      requirement: formData.requirement.trim(),
    };

    setIsSubmitting(true);

    try {
      const sheetName = "contact-us"; // Change this to your sheet name
      const apiUrl = `https://sheetdb.io/api/v1/47f046qdlv850?sheet=${sheetName}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [trimmedData],
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        });
        // Reset form
        setFormData({
          name: "",
          contactNumber: "",
          hearAboutUs: "",
          requirement: "",
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center px-4 sm:px-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl my-8 md:my-16 lg:my-28 overflow-hidden rounded-3xl shadow-lg">
        {/* Left side - Solar panel image */}
        <div className="w-full md:w-1/2 relative">
          {!isLowCarbon ? (
            <img
              src="/images/contact-us-banner.png"
              alt="Solar panels"
              className="w-full h-64 md:h-full object-cover bg-blue-800"
            />
          ) : (
            <div className="w-[90%] max-w-[444px] h-[433px] bg-[#98CAE4]/50 md:bg-[#98CAE4]/50 mx-auto flex items-center justify-center text-center text-lg font-semibold text-gray-800 p-4">
              Thanks for making a greener choice! By skipping unnecessary
              images, you&apos;re reducing digital carbon emissions. Every small
              step counts for our planet. 🌍
            </div>
          )}
        </div>

        {/* Right side - Form */}
        <div className="md:ml-[-50px] w-full md:w-1/2 bg-white p-6 md:p-8 flex flex-col z-50 rounded-[10px]">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="space-y-6 flex-1">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Name"
                  required
                  className={`w-full mt-5 p-3 md:text-lg focus:outline-none bg-transparent border-l-[3px] border-b-[3px] ${
                    errors.name ? "border-red-500" : "border-[#5AAAD4]"
                  } rounded-bl-2xl`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Contact Number Field */}
              <div className="relative">
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Contact number"
                  required
                  className={`w-full mt-5 p-3 md:text-lg focus:outline-none bg-transparent border-l-[3px] border-b-[3px] ${
                    errors.contactNumber ? "border-red-500" : "border-[#5AAAD4]"
                  } rounded-bl-2xl`}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              {/* How did you hear about us Field */}
              <div className="relative">
                <input
                  type="text"
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="How did you hear about us?"
                  className={`w-full mt-5 p-3 md:text-lg focus:outline-none bg-transparent border-l-[3px] border-b-[3px] ${
                    errors.hearAboutUs ? "border-red-500" : "border-[#5AAAD4]"
                  } rounded-bl-2xl`}
                />
                {errors.hearAboutUs && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.hearAboutUs}
                  </p>
                )}
              </div>

              {/* Requirement Field */}
              <div className="relative">
                <input
                  type="text"
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Specify your requirement"
                  className={`w-full mt-5 p-3 md:text-lg focus:outline-none bg-transparent border-l-[3px] border-b-[3px] ${
                    errors.requirement ? "border-red-500" : "border-[#5AAAD4]"
                  } rounded-bl-2xl`}
                />
                {errors.requirement && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.requirement}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-br from-[#5AAAD4] via-[#76B8DB] to-[#AAD4EA] text-white px-6 py-4 rounded-lg transition-colors hover:opacity-90 text-center font-medium w-full md:w-auto"
              >
                {isSubmitting ? "Sending..." : "Get in touch"}
              </button>
            </div>
          </form>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 md:space-x-8 mt-8">
            {/* WhatsApp Icon - Corrected */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm interested knowing more about carbon and whale products`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="WhatsApp"
              className="hover:text-blue-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"></path>
              </svg>
            </a>
            {/* Facebook Icon */}
            <a
              href="https://www.facebook.com/CarbonandWhale/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-800"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* LinkedIn Icon */}
            <a
              href="https://in.linkedin.com/company/carbonandwhale"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-800"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            {/* X (Twitter) Icon - Updated */}
            <a
              href="https://twitter.com/carbonandwhale/status/1529720430222770176"
              aria-label="X (Twitter)"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 50 50"
              >
                <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
              </svg>
            </a>
            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/carbonandwhale/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-blue-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-800"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
