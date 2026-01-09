import React, { useState } from 'react';

export const DocumentMergeFAQ: React.FC<{ faqs: any[]; heading?: string; description?: string }> = ({ faqs, heading, description }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {heading && <h2 className="text-5xl font-bold text-center mb-4 text-cyan-900">{heading}</h2>}
        {description && <p className="text-xl text-center text-gray-700 mb-16">{description}</p>}
        <div className="space-y-3">
          {faqs.map((faq: any, i: number) => (
            <div key={i} className="bg-white rounded-xl border-2 border-cyan-200 overflow-hidden hover:border-cyan-400 transition-colors">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-5 text-left flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                <span className="text-2xl text-cyan-600">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <div className="px-5 pb-5 text-gray-700" dangerouslySetInnerHTML={{ __html: faq.answer }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
