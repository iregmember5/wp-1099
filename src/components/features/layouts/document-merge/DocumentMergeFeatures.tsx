import React from 'react';

export const DocumentMergeFeatures: React.FC<{ features: any[]; heading?: string; description?: string }> = ({ features, heading, description }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      {heading && <h2 className="text-5xl font-bold text-center mb-4 text-cyan-900">{heading}</h2>}
      {description && <p className="text-xl text-center text-gray-600 mb-16 max-w-4xl mx-auto">{description}</p>}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((f: any, i: number) => (
          <div key={i} className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200 hover:border-cyan-400 transition-all">
            <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-xl mb-4">📄</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{f.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
