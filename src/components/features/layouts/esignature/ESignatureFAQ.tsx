import React, { useState } from 'react';

export const ESignatureFAQ: React.FC<{ faqs: any[]; heading?: string; description?: string }> = ({ faqs, heading, description }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 bg-blue-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {heading && <h2 className="text-5xl font-bold text-center mb-4 text-blue-900">{heading}</h2>}
        {description && <p className="text-xl text-center text-gray-700 mb-16">{description}</p>}
        <div className="space-y-4">
          {faqs.map((faq: any, i: number) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center hover:bg-blue-50 transition-colors">
                <span className="text-xl font-bold text-gray-900">{faq.question}</span>
                <span className="text-3xl text-blue-600">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <div className="p-6 pt-0 text-gray-700" dangerouslySetInnerHTML={{ __html: faq.answer }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
