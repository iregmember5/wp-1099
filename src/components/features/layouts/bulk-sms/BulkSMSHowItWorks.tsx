import React from 'react';
import { getFullImageUrl } from '../../utils/imageUtils';

export const BulkSMSHowItWorks: React.FC<{ steps: any[]; heading?: string; description?: string }> = ({ steps, heading, description }) => (
  <section className="py-24 bg-gradient-to-r from-purple-100 via-pink-100 to-red-100">
    <div className="container mx-auto px-4">
      {heading && <h2 className="text-5xl font-bold text-center mb-4 text-purple-900">{heading}</h2>}
      {description && <p className="text-xl text-center text-gray-800 mb-16 max-w-3xl mx-auto">{description}</p>}
      <div className="flex flex-wrap justify-center gap-8">
        {steps.map((step: any, i: number) => {
          const content = step.content?.[0] || {};
          return (
            <div key={i} className="w-full md:w-80 bg-white rounded-2xl p-6 shadow-xl border-l-4 border-purple-500 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold">{step.step_number}</span>
                <h3 className="text-xl font-bold text-gray-900">{content.title}</h3>
              </div>
              {step.image && <img src={getFullImageUrl(step.image.url)} alt={content.title} className="w-full h-40 object-cover rounded-lg mb-4" />}
              <p className="text-gray-600">{content.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
