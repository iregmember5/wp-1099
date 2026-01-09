import React from "react";
import type { FeaturesPageData } from "../../../../types/features-page";
import { getFullImageUrl } from "../../utils/imageUtils";

export const BulkSMSHeader: React.FC<{ data: FeaturesPageData }> = ({
  data,
}) => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
    {/* SMS message bubbles pattern */}
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="sms-pattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
            <rect x="20" y="30" width="60" height="40" rx="8" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
            <circle cx="35" cy="50" r="2" fill="white" opacity="0.3"/>
            <circle cx="50" cy="50" r="2" fill="white" opacity="0.3"/>
            <circle cx="65" cy="50" r="2" fill="white" opacity="0.3"/>
            <path d="M20,70 L30,80 L30,70" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sms-pattern)"/>
      </svg>
    </div>

    {/* Floating SMS icons */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-10 w-24 h-24 animate-pulse">
        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="2">
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      </div>
      <div className="absolute top-40 right-20 w-20 h-20 animate-pulse delay-700">
        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="2">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      </div>
      <div className="absolute bottom-32 left-40 w-20 h-20 animate-pulse delay-1000">
        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(20, 184, 166, 0.2)" strokeWidth="2">
          <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
        </svg>
      </div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 animate-pulse delay-500">
        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="2">
          <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
      </div>
    </div>

    <div className="container mx-auto px-6 lg:px-8 relative z-10 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <svg className="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
            </svg>
            <span className="text-sm font-medium text-white">Bulk SMS Campaign Solution</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-center">
          <span className="block text-white mb-2">{data.header_title}</span>
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl text-center mb-6 text-green-100 font-light leading-relaxed max-w-4xl mx-auto">
          {data.header_subtitle}
        </p>

        {data.header_description && (
          <p className="text-lg md:text-xl text-center mb-12 text-green-200/80 max-w-3xl mx-auto leading-relaxed">
            {data.header_description}
          </p>
        )}

        {data.header_cta_text && (
          <div className="flex justify-center mb-16">
            <a
              href={data.header_cta_url || "#"}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-green-900 rounded-2xl text-lg font-bold overflow-hidden shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">{data.header_cta_text}</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
          </div>
        )}

        {data.header_image && (
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-3xl blur-2xl transform translate-y-8"></div>
            <div className="relative bg-white/5 backdrop-blur-sm p-3 rounded-3xl border border-white/10">
              <img src={getFullImageUrl(data.header_image.url)} alt={data.header_image.title} className="w-full rounded-2xl shadow-2xl ring-1 ring-white/20" />
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0">
      <svg className="w-full h-24" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,64 C360,20 720,20 1080,64 C1440,108 1440,108 1440,108 L1440,120 L0,120 Z" fill="white" fillOpacity="1" />
      </svg>
    </div>
  </section>
);
