import React, { useState } from "react";
import type { FeaturesPageData } from "../../../../types/features-page";
import { getFullImageUrl } from "../../utils/imageUtils";

export const BulkWhatsAppHeader: React.FC<{ data: FeaturesPageData }> = ({
  data,
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#075E54] to-[#128C7E] flex flex-col">
      {/* WhatsApp-style header */}
      <header className="bg-[#075E54] py-4 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-[#075E54]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <h1 className="text-white text-xl font-semibold">WhatsApp Business</h1>
        </div>
        <div className="flex space-x-4">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center pb-24">
        <div className="mb-8">
          <div className="bg-white rounded-full p-4 inline-block mb-6">
            <svg className="w-16 h-16 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {data.header_title || "Bulk WhatsApp Messaging"}
          </h1>
          
          <p className="text-xl text-[#D9FDD3] mb-4 max-w-2xl mx-auto">
            {data.header_subtitle || "Send personalized messages to thousands of customers instantly"}
          </p>
          
          {data.header_description && (
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              {data.header_description}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          {data.header_cta_text && (
            <a
              href={data.header_cta_url || "#"}
              className="px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-lg hover:bg-[#128C7E] transition-colors shadow-lg"
            >
              {data.header_cta_text}
            </a>
          )}
          
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="px-8 py-4 bg-white/20 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/30"
          >
            See Demo
          </button>
        </div>

        {/* Chat demo window */}
        {isChatOpen && (
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#075E54] py-3 px-4 flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">Business Account</h3>
                <p className="text-white/80 text-xs">Online • Ready to help</p>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white ml-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 bg-[#ECE5DD] min-h-[300px] flex flex-col justify-end">
              <div className="mb-3 max-w-[80%]">
                <div className="bg-white rounded-l-2xl rounded-tr-2xl rounded-br-2xl p-3 shadow">
                  <p className="text-gray-800">Hi there! 👋 Thanks for visiting our bulk messaging platform. How can I help you today?</p>
                  <p className="text-right text-xs text-gray-500 mt-1">10:00 AM</p>
                </div>
              </div>
              
              <div className="mb-3 max-w-[80%] ml-auto">
                <div className="bg-[#DCF8C6] rounded-r-2xl rounded-tl-2xl rounded-bl-2xl p-3 shadow">
                  <p className="text-gray-800">I'd like to learn more about sending bulk WhatsApp messages.</p>
                  <p className="text-right text-xs text-gray-500 mt-1">10:02 AM</p>
                </div>
              </div>
              
              <div className="mb-3 max-w-[80%]">
                <div className="bg-white rounded-l-2xl rounded-tr-2xl rounded-br-2xl p-3 shadow">
                  <p className="text-gray-800">Sure thing! Our platform allows businesses to send personalized messages to thousands of customers with just a few clicks. We offer templates, scheduling, and analytics!</p>
                  <p className="text-right text-xs text-gray-500 mt-1">10:03 AM</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-white border-t border-gray-200 flex items-center">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-gray-700 focus:outline-none"
              />
              <button className="ml-2 bg-[#075E54] rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {data.header_image && !isChatOpen && (
          <div className="mt-8 max-w-4xl w-full">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-2xl border border-white/20">
              <img 
                src={getFullImageUrl(data.header_image.url)} 
                alt={data.header_image.title} 
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
          </div>
        )}
      </main>

      {/* WhatsApp-style navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around py-3">
        <button className="flex flex-col items-center text-[#075E54]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
          </svg>
          <span className="text-xs mt-1">Updates</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <span className="text-xs mt-1">Communities</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z"/>
          </svg>
          <span className="text-xs mt-1">Chats</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <div className="w-6 h-6 rounded-full bg-gray-400"></div>
          <span className="text-xs mt-1">Settings</span>
        </button>
      </nav>
    </div>
  );
};