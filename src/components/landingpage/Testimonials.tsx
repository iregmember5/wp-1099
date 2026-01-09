import React from "react";
import type { LandingPageData } from "../../types/landing";

interface TestimonialsProps {
  data: LandingPageData;
}

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  photo: string | null;
  order: number;
}

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  const {
    testimonials_head,
    testimonials_introduction,
    testimonials,
  } = data;

  if (
    !testimonials_head &&
    !testimonials_introduction &&
    (!testimonials || testimonials.length === 0)
  ) {
    return null;
  }

  const sampleTestimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "This platform has completely transformed how we handle notary services. The efficiency and accuracy are unmatched!",
      name: "Sarah Johnson",
      title: "Senior Notary",
      company: "Legal Solutions Inc.",
      photo: null,
      order: 1,
    },
    {
      id: 2,
      quote:
        "As a notary professional, I appreciate the attention to detail and compliance features. It saves us hours of work each week.",
      name: "Michael Chen",
      title: "Certified Notary",
      company: "Chen & Associates",
      photo: null,
      order: 2,
    },
    {
      id: 3,
      quote:
        "The user-friendly interface combined with powerful features makes this the best notary solution we've ever used.",
      name: "Emily Rodriguez",
      title: "Notary Consultant",
      company: "QuickNotary Pro",
      photo: null,
      order: 3,
    },
  ];

  const displayTestimonials =
    testimonials && testimonials.length > 0 ? testimonials : sampleTestimonials;

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section
      className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto px-4">
          {testimonials_head && (
            <div className="mb-6">
              <div className="inline-block px-4 py-2 rounded-full text-xs font-bold mb-5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-200/50 shadow-sm">
                TESTIMONIALS
              </div>
              <h2
                id="testimonials-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-slate-900"
              >
                {testimonials_head}
              </h2>
            </div>
          )}

          {testimonials_introduction && (
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 font-medium">
              {testimonials_introduction}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative p-6 sm:p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-white border-2 border-slate-200 hover:border-blue-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-serif opacity-20 group-hover:opacity-30 transition-opacity" aria-hidden="true">
                "
              </div>

              <div className="relative z-10">
                <blockquote className="text-base sm:text-lg leading-relaxed mb-6 text-slate-700 font-medium">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t-2 border-slate-100">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600"
                    aria-hidden="true"
                  >
                    {getInitials(testimonial.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm sm:text-base text-slate-900 truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 truncate">
                      {testimonial.title}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-blue-600 truncate">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!testimonials || testimonials.length === 0) && (
          <div className="text-center mt-16 sm:mt-20 px-4">
            <p className="text-base sm:text-lg mb-6 text-slate-600 font-medium">
              Have experience with our platform? We'd love to hear from you!
            </p>
            <button className="px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl active:scale-95 gradient-theme-primary text-white">
              Share Your Experience
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
