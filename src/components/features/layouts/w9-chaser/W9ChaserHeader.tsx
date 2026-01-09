import React from 'react';
import type { FeaturesPageData } from '../../../../types/features-page';
import { getFullImageUrl } from '../../utils/imageUtils';

export const W9ChaserHeader: React.FC<{ data: FeaturesPageData }> = ({ data }) => (
  <section className="py-32 bg-gradient-to-r from-gray-900 via-green-900 to-emerald-900 text-white">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="border-l-8 border-green-400 pl-8 mb-12">
          <h1 className="text-6xl font-bold mb-6">{data.header_title}</h1>
          <p className="text-2xl text-green-100">{data.header_subtitle}</p>
        </div>
        {data.header_description && <p className="text-xl mb-10 text-gray-300 max-w-3xl">{data.header_description}</p>}
        {data.header_cta_text && (
          <div>
            <a href={data.header_cta_url || '#'} className="inline-block px-10 py-4 bg-green-500 text-white rounded-lg text-xl font-bold hover:bg-green-400 transition-colors">{data.header_cta_text}</a>
            {data.header_line_after_button && <p className="mt-4 text-sm text-gray-400">{data.header_line_after_button}</p>}
          </div>
        )}
      </div>
      {data.header_image && <div className="mt-16 max-w-5xl mx-auto"><img src={getFullImageUrl(data.header_image.url)} alt={data.header_image.title} className="w-full rounded-2xl shadow-2xl border-4 border-green-500" /></div>}
    </div>
  </section>
);
