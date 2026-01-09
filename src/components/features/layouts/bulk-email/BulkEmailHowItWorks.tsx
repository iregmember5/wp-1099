import React from 'react';
import { getFullImageUrl } from '../../utils/imageUtils';

export const BulkEmailHowItWorks: React.FC<{ steps: any[]; heading?: string; description?: string }> = ({ steps, heading, description }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      {heading && <h2 className="text-5xl font-bold text-center mb-4 text-gray-900">{heading}</h2>}
      {description && <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">{description}</p>}
      <div className="relative max-w-4xl mx-auto">
        {steps.map((step: any, i: number) => {
          const content = step.content?.[0] || {};
          return (
            <div key={i} className="flex items-start gap-6 mb-12 last:mb-0">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">{step.step_number}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{content.title}</h3>
                <p className="text-lg text-gray-600 mb-4">{content.description}</p>
                {step.image && <img src={getFullImageUrl(step.image.url)} alt={content.title} className="w-full rounded-xl shadow-lg" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
