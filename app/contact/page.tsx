"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email sending functionality
    console.log("Form submitted:", formData);
    alert("Contact form will be connected to email service soon!");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">CONTACT.</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              NAME
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-bold mb-2">
              SUBJECT
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold mb-2">
              MESSAGE
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-6 font-bold hover:bg-gray-800 transition-colors"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
}