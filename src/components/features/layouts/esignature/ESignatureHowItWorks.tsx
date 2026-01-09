import React from "react";
import { getFullImageUrl } from "../../utils/imageUtils";

export const ESignatureHowItWorks: React.FC<{
  steps: any[];
  heading?: string;
  description?: string;
}> = ({ steps, heading, description }) => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    {/* Sophisticated gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-blue-100/20 to-indigo-100/50"></div>

    {/* Animated flowing lines in background */}
    {/* <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 Q400,50 800,100 T1600,100"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="M0,100 Q400,50 800,100 T1600,100;
                    M0,100 Q400,150 800,100 T1600,100;
                    M0,100 Q400,50 800,100 T1600,100"
          />
        </path>
      </svg>
    </div> */}

    <div className="container mx-auto px-6 lg:px-8 relative z-10">
      {/* Section header */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        {heading && (
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold mb-6 shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 bg-clip-text text-transparent">
              {heading}
            </h2>
          </div>
        )}
        {description && (
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Steps in linear format */}
      <div className="max-w-4xl mx-auto">
        {steps.map((step: any, i: number) => {
          const content = step.content?.[0] || {};
          const isEven = i % 2 === 0;

          return (
            <div
              key={i}
              className={`flex flex-col lg:flex-row items-center gap-8 mb-20 last:mb-0 ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Step content */}
              <div className={`lg:w-1/2 ${isEven ? "lg:pr-8" : "lg:pl-8"}`}>
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur-lg opacity-50"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl">
                      <span className="text-2xl font-bold text-white">
                        {step.step_number}
                      </span>
                    </div>

                    {/* Connector line for non-last items */}
                    {i < steps.length - 1 && (
                      <div
                        className={`hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-blue-300 to-indigo-300`}
                      ></div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                      {content.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Media (video or image) */}
              <div className="lg:w-1/2 w-full">
                {step.video && step.video.video_file_url ? (
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <video
                      src={getFullImageUrl({ url: step.video.video_file_url })}
                      className="w-full h-auto object-cover"
                      controls
                    />
                  </div>
                ) : step.image ? (
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={getFullImageUrl(step.image.url)}
                      alt={content.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 text-center">
        <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl text-white shadow-2xl">
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <p className="text-xl font-semibold">Ready to get started?</p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:scale-105 hover:shadow-xl transition-all">
            Start Signing Now
          </button>
        </div>
      </div>
    </div>
  </section>
);
