import { useState, useEffect } from "react";
import { fetchAboutPage } from "../types/landing";
import type { AboutPageData } from "../types/about";
import { useTheme } from "../contexts/ThemeContext";
import { Mail, Phone, Linkedin, Twitter } from "lucide-react";

export default function AboutPage({ slug }: { slug?: string }) {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const { setTheme } = useTheme();

  useEffect(() => {
    fetchAboutPage(slug)
      .then((pageData) => {
        setData(pageData);
        if (pageData.color_theme) {
          setTheme(pageData.color_theme);
        }
      })
      .catch((error) => console.error("Failed to load about page:", error))
      .finally(() => setLoading(false));
  }, [setTheme, slug]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-xl text-gray-600">
        About page not found
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {data.header_config && (
        <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
          {/* Render header */}
        </div>
      )}

      {/* Hero Section with Image */}
      <section className="relative py-12 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-white space-y-4 md:space-y-6 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
                {data.title}
              </h1>
              {data.intro && (
                <div className="space-y-4">
                  {data.intro.split("\n\n").map((para, idx) => {
                    const text = para.trim();
                    if (!text) return null;
                    const isQuestion = /^why\s/i.test(text);

                    if (isQuestion) {
                      return (
                        <div
                          key={idx}
                          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-l-4 border-amber-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-3xl font-bold text-amber-300">
                              Q
                            </div>
                            <p className="text-xl font-semibold text-white leading-relaxed">
                              {text}
                              {text.endsWith("?") ? "" : "?"}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <p
                        key={idx}
                        className="text-lg sm:text-xl md:text-2xl leading-relaxed text-amber-100 font-light"
                      >
                        {text}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
            {data.featured_image && (
              <div className="flex-1 w-full max-w-md">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-800 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <img
                    src={
                      data.featured_image.url.startsWith("http")
                        ? data.featured_image.url
                        : `https://esign-admin.signmary.com${data.featured_image.url}`
                    }
                    alt={data.featured_image.title}
                    className="relative w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Body Content */}
      {data.body && (
        <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="space-y-6">
              {data.body
                .split("</p>")
                .filter((p) => p.trim())
                .map((paragraph, idx) => {
                  const text = paragraph.replace(/<[^>]+>/g, "").trim();
                  if (!text) return null;

                  // Check if starts with Why
                  const isQuestion = /^why\s/i.test(text);
                  // Check if it's a heading (contains — or is short)
                  const isHeading =
                    /—/.test(text) || (text.length < 80 && idx === 0);

                  if (isQuestion) {
                    return (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-l-4 border-blue-600 shadow-lg"
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-4xl font-bold text-blue-600">
                            Q
                          </div>
                          <div className="flex-1">
                            <p className="text-2xl font-semibold text-slate-900 leading-relaxed">
                              {text}
                              {text.endsWith("?") ? "" : "?"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (isHeading) {
                    return (
                      <div key={idx} className="text-center py-4">
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                          {text}
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <p className="text-lg text-slate-700 leading-relaxed">
                        {text}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* Mission Statement */}
      {data.mission_statement && (
        <section className="py-16 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-12 border border-white/20 shadow-2xl">
                <p className="text-xl leading-relaxed text-amber-50 whitespace-pre-line">
                  {data.mission_statement}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      {data.values && data.values.length > 0 && (
        <section className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-16 bg-gradient-to-r from-amber-800 to-slate-800 bg-clip-text text-transparent">
              Our Values
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {data.values.map((item, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-700 to-slate-700 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative bg-white p-8 rounded-2xl border border-amber-100 hover:shadow-2xl transition duration-500 h-full">
                    {item.value.icon && (
                      <div className="text-5xl mb-6">{item.value.icon}</div>
                    )}
                    {item.value.title && (
                      <h3 className="text-2xl font-bold mb-4 text-slate-900">
                        {item.value.title}
                      </h3>
                    )}
                    {item.value.description && (
                      <p className="text-slate-600 leading-relaxed">
                        {item.value.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Members */}
      {data.team_members && data.team_members.length > 0 && (
        <section className="py-12 md:py-24 bg-amber-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-16 bg-gradient-to-r from-amber-800 to-slate-800 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {data.team_members.map((member) => (
                <div key={member.id} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-700 to-slate-700 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transform group-hover:-translate-y-2 transition duration-500">
                    {member.photo && (
                      <div className="relative overflow-hidden h-80">
                        <img
                          src={member.photo.url}
                          alt={member.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-2 text-slate-900">
                        {member.name}
                      </h3>
                      <p className="text-amber-700 font-semibold mb-4">
                        {member.position}
                      </p>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {member.bio}
                      </p>
                      <div className="flex gap-4">
                        {member.linkedin_url && (
                          <a
                            href={member.linkedin_url}
                            className="p-2 bg-amber-100 rounded-full hover:bg-slate-700 hover:text-white transition duration-300"
                          >
                            <Linkedin size={20} />
                          </a>
                        )}
                        {member.twitter_url && (
                          <a
                            href={member.twitter_url}
                            className="p-2 bg-amber-100 rounded-full hover:bg-slate-700 hover:text-white transition duration-300"
                          >
                            <Twitter size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* History Milestones */}
      {data.history_milestones && data.history_milestones.length > 0 && (
        <section className="py-12 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-16 bg-gradient-to-r from-amber-800 to-slate-800 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 relative">
              <div className="hidden md:block absolute left-20 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-700 to-slate-700"></div>
              {data.history_milestones.map((item, idx) => (
                <div key={idx} className="flex gap-8 items-start relative">
                  {item.value.year && (
                    <div className="relative z-10">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-slate-700 min-w-[100px]">
                        {item.value.year}
                      </div>
                      <div className="absolute -right-4 top-3 w-8 h-8 bg-gradient-to-r from-amber-700 to-slate-700 rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                  )}
                  <div className="flex-1 bg-gradient-to-br from-amber-50 to-slate-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-1">
                    {item.value.event && (
                      <h3 className="text-2xl font-bold mb-3 text-slate-900">
                        {item.value.event}
                      </h3>
                    )}
                    {item.value.description && (
                      <p className="text-slate-600 leading-relaxed">
                        {item.value.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-12 md:py-24 bg-amber-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-16 bg-gradient-to-r from-amber-800 to-slate-800 bg-clip-text text-transparent">
              Gallery
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {data.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-500"
                >
                  <img
                    src={item.value.url}
                    alt={item.value.title}
                    className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {(data.contact_blurb || data.contact_email || data.contact_phone) && (
        <section className="py-12 md:py-24 bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-amber-300 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-300 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-white drop-shadow-lg">
              Get In Touch
            </h2>
            {data.contact_blurb && (
              <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto text-amber-50 leading-relaxed">
                {data.contact_blurb}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center">
              {data.contact_email && (
                <a
                  href={`mailto:${data.contact_email}`}
                  className="group flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full text-white text-lg hover:bg-white hover:text-amber-900 transition duration-300 shadow-lg"
                >
                  <Mail
                    className="group-hover:scale-110 transition duration-300"
                    size={24}
                  />
                  {data.contact_email}
                </a>
              )}
              {data.contact_phone && (
                <a
                  href={`tel:${data.contact_phone}`}
                  className="group flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full text-white text-lg hover:bg-white hover:text-amber-900 transition duration-300 shadow-lg"
                >
                  <Phone
                    className="group-hover:scale-110 transition duration-300"
                    size={24}
                  />
                  {data.contact_phone}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      {data.footer_config && (
        <div className="bg-gray-900 text-white">{/* Render footer */}</div>
      )}

      {/* Widgets */}
      {data.contact_widget?.is_active && (
        <div
          dangerouslySetInnerHTML={{ __html: data.contact_widget.embed_code }}
        />
      )}
      {data.helpdesk_widget?.is_active && (
        <div
          dangerouslySetInnerHTML={{ __html: data.helpdesk_widget.embed_code }}
        />
      )}
      {data.w9form_widget?.is_active && (
        <div
          dangerouslySetInnerHTML={{ __html: data.w9form_widget.embed_code }}
        />
      )}

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes tilt {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        .animate-tilt {
          animation: tilt 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
