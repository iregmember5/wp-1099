import React from 'react';
import { getFullImageUrl } from '../../utils/imageUtils';

export const W9ChaserBenefits: React.FC<{ benefits: any[]; heading?: string; description?: string }> = ({ benefits, heading, description }) => (
  <section className="py-24 bg-gradient-to-br from-green-900 to-emerald-900 text-white">
    <div className="container mx-auto px-4">
      {heading && <h2 className="text-5xl font-bold text-center mb-4">{heading}</h2>}
      {description && <p className="text-xl text-center text-green-100 mb-16 max-w-4xl mx-auto">{description}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {benefits.map((b: any, i: number) => (
          <div key={i} className="text-center">
            {b.image && (
              <img src={getFullImageUrl(b.image.url)} alt={b.title} className="w-48 h-48 rounded-full mx-auto mb-6 object-cover" />
            )}
            <h3 className="text-xl font-bold mb-2 text-green-300">{b.title}</h3>
            {b.description && <p className="text-green-100">{b.description}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
);
