import React from "react";
import type { FeaturesPageData } from "../../../../types/features-page";
import { getFullImageUrl } from "../../utils/imageUtils";

export const ESignatureHeader: React.FC<{ data: FeaturesPageData }> = ({
  data,
}) => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
    {/* Geometric background pattern */}
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="geometric"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.2"
            />
            <path
              d="M0,0 L50,50 M50,0 L0,50"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.15"
            />
            <polygon points="75,25 85,40 65,40" fill="white" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometric)" />
      </svg>
    </div>

    {/* Animated geometric shapes */}
    <div className="absolute inset-0">
      <div className="absolute top-20 left-10 w-32 h-32 border-4 border-blue-400/20 rotate-45 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-40 h-40 rounded-full border-4 border-purple-400/20 animate-pulse delay-700"></div>
      <div
        className="absolute bottom-32 left-40 w-36 h-36"
        style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
      >
        <div className="w-full h-full border-4 border-indigo-400/20 animate-pulse delay-1000"></div>
      </div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 border-4 border-blue-300/20 rounded-lg rotate-12 animate-pulse delay-500"></div>
    </div>

    <div className="container mx-auto px-6 lg:px-8 relative z-10 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <svg
              className="w-4 h-4 text-blue-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-white">
              Digital Signature Solution
            </span>
          </div>
        </div>

        {/* Main heading with gradient text */}
        <h1 className="text-3xl md:text-7xl lg:text-5xl font-bold mb-8 text-center">
          <span className="block text-white mb-2">{data.header_title}</span>
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl text-center mb-6 text-blue-100 font-light leading-relaxed max-w-4xl mx-auto">
          {data.header_subtitle}
        </p>

        {data.header_description && (
          <p className="text-lg md:text-xl text-center mb-12 text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
            {data.header_description}
          </p>
        )}

        {/* CTA Button with enhanced styling */}
        {data.header_cta_text && (
          <div className="flex justify-center mb-16">
            <a
              href={data.header_cta_url || "#"}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-900 rounded-2xl text-lg font-bold overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">{data.header_cta_text}</span>
              <svg
                className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
          </div>
        )}

        {/* Hero image with elegant presentation */}
        {data.header_image && (
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl blur-2xl transform translate-y-8"></div>
            <div className="relative bg-white/5 backdrop-blur-sm p-3 rounded-3xl border border-white/10">
              <img
                src={getFullImageUrl(data.header_image.url)}
                alt={data.header_image.title}
                className="w-full rounded-2xl shadow-2xl ring-1 ring-white/20"
              />
            </div>
            {/* Floating signature icon */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Bottom wave decoration */}
    <div className="absolute bottom-0 left-0 right-0">
      <svg
        className="w-full h-24"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,64 C360,20 720,20 1080,64 C1440,108 1440,108 1440,108 L1440,120 L0,120 Z"
          fill="white"
          fillOpacity="1"
        />
      </svg>
    </div>
  </section>
);
