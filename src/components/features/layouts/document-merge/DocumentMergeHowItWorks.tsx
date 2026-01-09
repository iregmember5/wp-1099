import React from 'react';
import { getFullImageUrl } from '../../utils/imageUtils';

export const DocumentMergeHowItWorks: React.FC<{ steps: any[]; heading?: string; description?: string }> = ({ steps, heading, description }) => (
  <section className="py-24 bg-gray-50">
    <div className="container mx-auto px-4">
      {heading && <h2 className="text-5xl font-bold text-center mb-4 text-gray-900">{heading}</h2>}
      {description && <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">{description}</p>}
      <div className="grid lg:grid-cols-5 gap-4">
        {steps.map((step: any, i: number) => {
          const content = step.content?.[0] || {};
          return (
            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">{step.step_number}</div>
              {step.image && <img src={getFullImageUrl(step.image.url)} alt={content.title} className="w-full h-32 object-cover rounded-lg mb-4" />}
              <h3 className="text-lg font-bold mb-2 text-gray-900">{content.title}</h3>
              <p className="text-sm text-gray-600">{content.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
