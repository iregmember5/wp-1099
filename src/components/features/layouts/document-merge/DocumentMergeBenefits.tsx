import React from 'react';

export const DocumentMergeBenefits: React.FC<{ benefits: any[]; heading?: string; description?: string }> = ({ benefits, heading, description }) => (
  <section className="py-24 bg-gradient-to-br from-cyan-100 to-blue-100">
    <div className="container mx-auto px-4">
      {heading && <h2 className="text-5xl font-bold text-center mb-4 text-cyan-900">{heading}</h2>}
      {description && <p className="text-xl text-center text-gray-700 mb-16 max-w-4xl mx-auto">{description}</p>}
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {benefits.map((b: any, i: number) => (
          <div key={i} className="w-64 bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">{b.title}</h3>
            <p className="text-gray-600 text-sm">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
