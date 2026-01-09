import React, { useState } from "react";

export const BulkWhatsAppFAQ: React.FC<{
  faqs: any[];
  heading?: string;
  description?: string;
}> = ({ faqs, heading, description }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          {heading && (
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-900 to-emerald-900 bg-clip-text text-transparent">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq: any, i: number) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full bg-green-100 transition-all duration-300"></div>
                  <svg
                    className={`w-4 h-4 text-green-600 relative z-10 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-800 font-medium">Still have questions? Contact our WhatsApp support team</span>
          </div>
        </div>
      </div>
    </section>
  );
};