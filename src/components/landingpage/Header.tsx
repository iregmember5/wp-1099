import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { LandingPageData } from "../../types/landing";
import EasyIcon from "./IconRenderer";
import WebForm from "./WebForm";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, x: 100 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

interface HeaderProps {
  data: LandingPageData;
  onShowLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const {
    header_title,
    header_subtitle,
    header_description,
    header_cta_primary,
    header_cta_secondary,
    header_section_image,
  } = data;

  const ref = useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [showWebForm, setShowWebForm] = useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const backendBaseUrl = "https://esign-admin.signmary.com";

  const rightImageUrl = header_section_image?.url?.startsWith("http")
    ? header_section_image.url
    : header_section_image?.url
    ? `${backendBaseUrl}${header_section_image.url}`
    : null;

  return (
    <header
      ref={ref}
      className="relative pt-20 md:pt-24 lg:pt-20 flex items-center justify-center overflow-hidden pb-12 md:pb-20 min-h-[80vh] md:min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
    >
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">
        <motion.div
          variants={containerVariants}
          initial={isMobile ? "visible" : "hidden"}
          animate={isMobile ? "visible" : isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Text Content - Left Side */}
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Top Badge - Notary Professional */}
              {header_subtitle && (
                <motion.div
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-full text-sm font-semibold text-blue-700 shadow-sm"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs sm:text-sm">{header_subtitle}</span>
                </motion.div>
              )}

              <div className="space-y-5">
                {/* Main Title - Professional & Bold */}
                {header_title && (
                  <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
                    variants={itemVariants}
                  >
                    {header_title}
                  </motion.h1>
                )}

                {/* Description - Clear & Professional */}
                {header_description && (
                  <motion.p
                    className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto md:mx-0 font-medium"
                    variants={itemVariants}
                  >
                    {header_description}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* CTAs - Professional Notary Style */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
            >
              {header_cta_primary && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setShowWebForm(true)}
                    className="group flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 gradient-theme-primary relative overflow-hidden"
                  >
                    <span className="relative z-10">
                      {header_cta_primary}
                    </span>
                    <EasyIcon
                      icon="FiArrowRight"
                      size={20}
                      color="#FFFFFF"
                      className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>
                </motion.div>
              )}

              {header_cta_secondary && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setShowWebForm(true)}
                    className="group flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white border-2 border-slate-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <EasyIcon
                      icon="FiPlay"
                      size={20}
                      color="currentColor"
                      className="mr-2 group-hover:scale-110 transition-transform"
                    />
                    <span>{header_cta_secondary}</span>
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Trust Indicators - Notary Professional */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 pt-4"
            >
              <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <EasyIcon icon="FiCheck" size={12} color="#10b981" />
                </div>
                <span>Secure & Compliant</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <EasyIcon icon="FiShield" size={12} color="#3b82f6" />
                </div>
                <span>Trusted by Notaries</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                  <EasyIcon icon="FiZap" size={12} color="#8b5cf6" />
                </div>
                <span>Easy Setup</span>
              </div>
            </motion.div>
          </div>

          {/* Image Section - Right Side - Multi-Device Mockup */}
          <motion.div
            variants={imageVariants}
            className="relative px-4 sm:px-0"
          >
            <div className="relative z-10 max-w-lg mx-auto lg:max-w-none">
              {rightImageUrl ? (
                <div className="relative">
                  {/* Desktop/Laptop Frame */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Laptop Body */}
                    <div className="relative bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-xl sm:rounded-t-2xl p-2 sm:p-3 shadow-2xl">
                      {/* Screen Bezel */}
                      <div className="bg-slate-900 rounded-md sm:rounded-lg p-1 sm:p-2">
                        {/* Webcam */}
                        <div className="flex justify-center mb-0.5 sm:mb-1">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-700" />
                        </div>
                        {/* Screen */}
                        <div className="relative bg-black rounded overflow-hidden">
                          <img
                            src={rightImageUrl}
                            alt="Notary Platform Dashboard"
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Laptop Base */}
                    <div className="relative h-2 sm:h-3 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-xl sm:rounded-b-2xl shadow-xl">
                      <div className="absolute inset-x-0 top-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                    </div>
                    {/* Laptop Bottom */}
                    <div className="flex justify-center">
                      <div className="w-3/4 h-1 sm:h-1.5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-b-md sm:rounded-b-lg shadow-lg" />
                    </div>
                  </motion.div>

                  {/* Universal TV Stand Base */}
                  <div className="flex justify-center mt-3 sm:mt-6">
                    <div className="relative w-40 sm:w-64">
                      {/* Stand Legs (V-shape) */}
                      <div className="flex justify-center items-end gap-12 sm:gap-20">
                        {/* Left Leg */}
                        <div className="w-12 sm:w-20 h-1.5 sm:h-2 bg-gradient-to-r from-slate-900 to-slate-800 rounded-full shadow-lg transform -rotate-12 origin-right" />
                        {/* Right Leg */}
                        <div className="w-12 sm:w-20 h-1.5 sm:h-2 bg-gradient-to-r from-slate-800 to-slate-900 rounded-full shadow-lg transform rotate-12 origin-left" />
                      </div>
                      {/* Center Support */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-16 h-2 sm:h-3 bg-gradient-to-b from-slate-700 to-slate-800 rounded-md sm:rounded-lg shadow-xl">
                        <div className="absolute inset-x-0 top-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-slate-500 to-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Frame - Positioned at bottom right */}
                  <motion.div
                    className="absolute -bottom-12 sm:-bottom-20 -right-4 sm:-right-8 w-24 sm:w-32 md:w-40"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Phone Body */}
                    <div className="relative bg-slate-900 rounded-[1.5rem] sm:rounded-[2rem] p-1.5 sm:p-2 shadow-2xl border-2 sm:border-4 border-slate-800">
                      {/* Notch */}
                      <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-3 sm:h-4 bg-slate-900 rounded-b-xl sm:rounded-b-2xl z-10" />
                      {/* Screen */}
                      <div className="relative bg-white rounded-[1.2rem] sm:rounded-[1.5rem] overflow-hidden aspect-[9/19]">
                        <img
                          src={rightImageUrl}
                          alt="Mobile View"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      {/* Home Indicator */}
                      <div className="absolute bottom-0.5 sm:bottom-1 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-0.5 sm:h-1 bg-slate-700 rounded-full" />
                    </div>
                  </motion.div>

                  {/* Professional Stats Cards */}
                  <motion.div
                    className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-sm border border-slate-200 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-xl z-20"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                      <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md sm:rounded-lg bg-emerald-100 flex items-center justify-center">
                        <EasyIcon
                          icon="FiCheckCircle"
                          size={12}
                          color="#10b981"
                        />
                      </div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                        98%
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-slate-600">
                      Success Rate
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/3 -left-3 sm:-left-6 bg-white/95 backdrop-blur-sm border border-slate-200 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-xl z-20"
                    animate={{ x: [-5, 5, -5] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                      <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md sm:rounded-lg bg-blue-100 flex items-center justify-center">
                        <EasyIcon icon="FiClock" size={12} color="#3b82f6" />
                      </div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                        5min
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-slate-600">
                      Avg Time
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="relative">
                  <div className="relative bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-2xl p-3 shadow-2xl">
                    <div className="bg-slate-900 rounded-lg p-2">
                      <div className="flex justify-center mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                      </div>
                      <div className="w-full h-80 rounded bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <div className="text-center">
                          <EasyIcon
                            icon="FiImage"
                            size={48}
                            color="#94a3b8"
                            className="mx-auto mb-2"
                          />
                          <span className="text-slate-400 font-medium">
                            Platform Preview
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-3 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-2xl shadow-xl" />
                  <div className="flex justify-center">
                    <div className="w-3/4 h-1.5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-b-lg shadow-lg" />
                  </div>
                </div>
              )}
            </div>
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </motion.div>
      </div>

      {data.web_form_section && (
        <WebForm
          isOpen={showWebForm}
          onClose={() => setShowWebForm(false)}
          data={data.web_form_section}
        />
      )}
    </header>
  );
};

export default Header;
