"use client";

import { useState } from "react";

const fontOptions = [
  { name: "Default Sans", className: "font-sans" },
  { name: "Serif (Georgia)", className: "font-serif" },
  { name: "Mono (Courier)", className: "font-mono" },
  { name: "System UI", className: "font-[family-name:system-ui]" },
  { name: "Charter", className: "font-[family-name:Charter,Georgia,serif]" },
  { name: "Merriweather", className: "font-[family-name:Merriweather,Georgia,serif]" },
];

export default function FontDemo() {
  const [selectedFont, setSelectedFont] = useState(0);

  const sampleText = `For many years I have ended team meetings with "Go, Be, Great" or "Go. Be. STRONG". It was my attempt to end a gathering on an upbeat note.`;

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8">Font Options for Quote Box</h1>
      
      <div className="mb-8">
        <p className="mb-4">Select a font to preview:</p>
        <div className="flex gap-2 flex-wrap">
          {fontOptions.map((font, index) => (
            <button
              key={index}
              onClick={() => setSelectedFont(index)}
              className={`px-4 py-2 border-2 ${
                selectedFont === index ? 'border-black bg-gray-100' : 'border-gray-300'
              }`}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {fontOptions.map((font, index) => (
          <div key={index} className="border-2 border-gray-200 p-6">
            <h3 className="font-bold mb-2">{font.name}</h3>
            <div className={`bg-gray-50 p-6 rounded-lg border border-gray-200 ${font.className}`}>
              <p className="text-gray-700 text-sm leading-relaxed">
                {sampleText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}