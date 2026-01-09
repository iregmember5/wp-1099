import React from 'react';
import type { FeaturesPageData } from '../../../../types/features-page';
import { getFullImageUrl } from '../../utils/imageUtils';

export const DocumentMergeHeader: React.FC<{ data: FeaturesPageData }> = ({ data }) => (
  <section className="py-32 bg-gradient-to-br from-cyan-50 to-blue-100">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block px-6 py-2 bg-cyan-500 text-white rounded-full text-sm font-bold mb-6">DOCUMENT AUTOMATION</div>
        <h1 className="text-6xl font-bold mb-6 text-cyan-900">{data.header_title}</h1>
        <p className="text-2xl mb-4 text-gray-700">{data.header_subtitle}</p>
        {data.header_description && <p className="text-lg mb-10 text-gray-600">{data.header_description}</p>}
        {data.header_cta_text && <a href={data.header_cta_url || '#'} className="inline-block px-10 py-4 bg-cyan-600 text-white rounded-xl text-xl font-bold hover:bg-cyan-700 transition-colors shadow-xl">{data.header_cta_text}</a>}
      </div>
      {data.header_image && <div className="mt-16 max-w-5xl mx-auto"><img src={getFullImageUrl(data.header_image.url)} alt={data.header_image.title} className="w-full rounded-2xl shadow-2xl border-4 border-cyan-300" /></div>}
    </div>
  </section>
);
