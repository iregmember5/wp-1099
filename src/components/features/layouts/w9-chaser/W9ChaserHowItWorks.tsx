import React from 'react';
import { getFullImageUrl } from '../../utils/imageUtils';

export const W9ChaserHowItWorks: React.FC<{ steps: any[]; heading?: string; description?: string }> = ({ steps, heading, description }) => (
  <section className="py-24 bg-gray-900 text-white">
    <div className="container mx-auto px-4">
      {heading && <h2 className="text-5xl font-bold text-center mb-4">{heading}</h2>}
      {description && <p className="text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">{description}</p>}
      <div className="space-y-16">
        {steps.map((step: any, i: number) => {
          const content = step.content?.[0] || {};
          const isEven = i % 2 === 0;
          return (
            <div key={i} className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
              <div className="lg:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold">{step.step_number}</div>
                  <h3 className="text-3xl font-bold">{content.title}</h3>
                </div>
                <p className="text-xl text-gray-300 leading-relaxed">{content.description}</p>
              </div>
              {step.image && <div className="lg:w-1/2"><img src={getFullImageUrl(step.image.url)} alt={content.title} className="w-64 h-64 mx-auto rounded-2xl shadow-2xl object-cover" /></div>}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
