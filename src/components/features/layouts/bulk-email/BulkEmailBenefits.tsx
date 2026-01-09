import React from "react";

export const BulkEmailBenefits: React.FC<{
  benefits: any[];
  heading?: string;
  description?: string;
}> = ({ benefits, heading, description }) => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-900 to-pink-900"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
      </div>
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="email-bg-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M10,30 L50,50 L90,30 L90,70 L10,70 Z" stroke="white" strokeWidth="1" fill="none" />
            <path d="M10,30 L50,50 L90,30" stroke="white" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#email-bg-pattern)" />
      </svg>
    </div>

    <div className="container mx-auto px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center mb-20">
        {heading && (
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8 border border-white/20 shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">{heading}</h2>
          </div>
        )}
        {description && (
          <p className="text-lg md:text-xl text-orange-100 leading-relaxed whitespace-pre-line">{description}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {benefits.map((b: any, i: number) => (
          <div key={i} className="group relative" style={{ animationDelay: `${i * 75}ms` }}>
            <div className="relative h-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-orange-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-red-400/0 to-pink-400/0 group-hover:from-orange-400/20 group-hover:via-red-400/20 group-hover:to-pink-400/20 rounded-3xl transition-all duration-300"></div>

              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                      {i === 1 && <><circle cx="12" cy="12" r="4" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94"/></>}
                      {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
                      {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                      {i > 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 text-white group-hover:text-orange-100 transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-orange-100/90 leading-relaxed text-sm lg:text-base group-hover:text-white transition-colors">
                    {b.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 w-full">
                  <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xl transform group-hover:scale-105 transition-all duration-300 z-20">
              {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0">
      <svg className="w-full h-24 text-white" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,64 C360,20 720,20 1080,64 C1440,108 1440,108 1440,108 L1440,120 L0,120 Z" fill="currentColor" fillOpacity="1" />
      </svg>
    </div>
  </section>
);
