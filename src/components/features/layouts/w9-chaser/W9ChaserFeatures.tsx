import React from 'react';
import { getFullImageUrl } from '../../utils/imageUtils';

export const W9ChaserFeatures: React.FC<{ features: any[]; heading?: string; description?: string }> = ({ features, heading, description }) => (
  <section className="py-24 bg-gray-900 text-white">
    <div className="container mx-auto px-4">
      {heading && <h2 className="text-5xl font-bold text-center mb-4">{heading}</h2>}
      {description && <p className="text-xl text-center text-gray-300 mb-16 max-w-4xl mx-auto">{description}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f: any, i: number) => (
            <div key={i} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="h-32">
                    {f.image ? (
                        <img src={getFullImageUrl(f.image.url)} alt={f.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <p className="text-gray-500 text-sm">No Image</p>
                        </div>
                    )}
                </div>
                <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-base font-bold mb-2 text-green-400 flex-grow">{f.title}</h3>
                    <p className="text-gray-300 text-xs">{f.description}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  </section>
);
