import React, { useEffect, useRef } from "react";
import type { Theme } from "../../../types/features-page";

interface PricingSectionProps {
  heading?: string;
  description?: string;
  widgetCode?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaUrl?: string;
  theme: Theme;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  heading,
  description,
  widgetCode,
  showCta,
  ctaText,
  ctaUrl,
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetCode && widgetRef.current) {
      widgetRef.current.innerHTML = '';
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = widgetCode;
      
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach((script) => {
        const newScript = document.createElement('script');
        if (script.src) {
          newScript.src = script.src;
          newScript.async = true;
        } else {
          newScript.textContent = script.textContent;
        }
        document.head.appendChild(newScript);
      });
      
      const nonScriptContent = tempDiv.querySelectorAll(':not(script)');
      nonScriptContent.forEach((el) => {
        widgetRef.current?.appendChild(el.cloneNode(true));
      });
    }
  }, [widgetCode]);

  if (!heading && !widgetCode && !showCta) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-theme-neutral/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          {heading && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-theme-text mb-3 sm:mb-4">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-base sm:text-lg md:text-xl text-theme-neutral max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {widgetCode ? (
          <div ref={widgetRef} className="max-w-6xl mx-auto" />
        ) : (
          <div className="text-center">
            <p className="text-sm sm:text-base text-theme-neutral mb-6 sm:mb-8">
              Pricing information coming soon...
            </p>
            {showCta && ctaText && (
              <a
                href={ctaUrl || "#"}
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors font-semibold text-sm sm:text-base"
              >
                {ctaText}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};