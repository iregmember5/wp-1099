import React from "react";
import type { ImageData } from "../../../../types/features-page";
import { getFullImageUrl } from "../../utils/imageUtils";

interface BulkEmailCTAProps {
  heading: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundImage?: ImageData;
}

export const BulkEmailCTA: React.FC<BulkEmailCTAProps> = ({
  heading,
  description,
  buttonText,
  buttonUrl,
  backgroundImage,
}) => {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: backgroundImage
          ? `url(${getFullImageUrl(backgroundImage.url)})`
          : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fadeInUp">
            {heading}
          </h2>
          {description && (
            <p className="text-xl text-white/90 mb-10 animate-fadeInUp animation-delay-200">
              {description}
            </p>
          )}
          <a
            href={buttonUrl || "#"}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-pink-500 font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 animate-fadeInUp animation-delay-400"
            {...(!buttonUrl && { onClick: (e) => e.preventDefault() })}
          >
            {buttonText || "Get Started Now"}
          </a>
        </div>
      </div>
    </section>
  );
};
