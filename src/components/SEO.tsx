import { useEffect } from 'react';
import type { LandingPageData } from '../types/landing';

interface SEOProps {
  data: LandingPageData;
}

export const SEO: React.FC<SEOProps> = ({ data }) => {
  useEffect(() => {
    const siteUrl = 'https://1099-partner.com';
    const title = data.meta_title || data.title || '1099 Partner - W-9 & 1099 eFiling Solutions';
    const description = data.meta_description || data.header_description || '1099 Partner helps you streamline compliance, stay organized, automate repetitive tasks, and manage your W-9, 1099 eFiling (all forms included), and 1099-DA workflows efficiently.';
    const image = data.og_image?.url ? `https://esign-admin.signmary.com${data.og_image.url}` : `${siteUrl}/partner.png`;
    const keywords = '1099 partner, 1099-NEC, 1099-MISC, 1099-INT, 1099-DIV, 1099-K, 1099-R, 1099-B, 1099-S, 1099-G, 1099-C, 1099-A, 1099-OID, 1099-SA, 1099-Q, 1099-LTC, 1099-CAP, 1099-DA, 1099-PATR, w9 form, w-9 form, form w9, form w-9, w9 chaser, w9 hunter, w9 collection, 1099 efiling, 1099 e-filing, 1099 filing, efile 1099, e-file 1099, 1099 forms, 1099 tax forms, IRS 1099, IRS w9, tax compliance, tax forms, vendor forms, contractor forms, independent contractor 1099, freelancer 1099, 1099 software, w9 software, tax automation, accounting software, bookkeeping software, tax preparation, CPA software, accountant tools, payroll 1099, digital asset 1099, crypto 1099, 1099-DA digital assets, TIN matching, tax reporting, IRS filing, tax season, year end tax, w9 request, w9 tracking, 1099 deadline, tax compliance automation';

    // Title
    document.title = title;

    // Meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: '1099 Partner' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'theme-color', content: data.color_theme?.primary_color || '#0E9F6E' },
      
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: siteUrl },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: '1099 Partner' },
      { property: 'og:locale', content: 'en_US' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: siteUrl },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // Additional SEO
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? 'name' : 'property';
      const value = name || property;
      let meta = document.querySelector(`meta[${attr}="${value}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, value!);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = siteUrl;

    // Structured Data - Organization
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '1099 Partner',
      url: siteUrl,
      logo: `${siteUrl}/partner.png`,
      description: description,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: data.footer_config?.contact_info?.phone || '',
        contactType: 'Customer Service',
        email: data.footer_config?.contact_info?.email || 'support@1099-partner.com',
        areaServed: 'US',
        availableLanguage: 'English'
      },
      sameAs: [
        data.footer_config?.social_links?.facebook,
        data.footer_config?.social_links?.twitter,
        data.footer_config?.social_links?.linkedin,
      ].filter(Boolean),
      address: {
        '@type': 'PostalAddress',
        streetAddress: '8837 Eastern Ave',
        addressLocality: 'Kansas City',
        addressRegion: 'MO',
        postalCode: '64138',
        addressCountry: 'US'
      }
    };

    // Structured Data - WebSite
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: '1099 Partner',
      url: siteUrl,
      description: description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/?s={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };

    // Structured Data - Service
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Tax Compliance Software',
      provider: {
        '@type': 'Organization',
        name: '1099 Partner'
      },
      areaServed: {
        '@type': 'Country',
        name: 'United States'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: '1099 & W-9 Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'W9 Chaser - DIY',
              description: 'Self-service W-9 collection and 1099 eFiling'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'W9 Hunter - Done For You',
              description: 'Full-service W-9 and 1099 management'
            }
          }
        ]
      }
    };

    // Structured Data - FAQPage
    const faqSchema = data.faq_section?.faqs?.length ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq_section.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    } : null;

    // Inject schemas
    const schemas = [orgSchema, websiteSchema, serviceSchema, faqSchema].filter(Boolean);
    
    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schemas);

  }, [data]);

  return null;
};
