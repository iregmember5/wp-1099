import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

interface AffiliateData {
  id: string;
  name: string;
  image: string;
  bio: string;
  location: string;
  profession: string;
  joinedDate: string;
}

export default function AffiliateDashboard() {
  const [affiliates, setAffiliates] = useState<AffiliateData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        // Replace with: const response = await fetch('https://mypowerly.com/api/affiliates');
        const mockData: AffiliateData[] = [
          {
            id: '1',
            name: 'Sarah Johnson',
            image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&size=200&background=6366f1&color=fff',
            bio: 'MyPowerly has transformed how I manage my notary business. The platform is intuitive and powerful, helping me serve my clients better every day.',
            location: 'Los Angeles, CA',
            profession: 'Certified Notary Public',
            joinedDate: '2024-01-15'
          },
          {
            id: '2',
            name: 'Michael Chen',
            image: 'https://ui-avatars.com/api/?name=Michael+Chen&size=200&background=8b5cf6&color=fff',
            bio: 'As a mobile notary, MyPowerly gives me the tools I need to stay organized and professional. Highly recommend to any notary looking to grow their business.',
            location: 'San Francisco, CA',
            profession: 'Mobile Notary Specialist',
            joinedDate: '2024-02-20'
          },
          {
            id: '3',
            name: 'Emily Rodriguez',
            image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&size=200&background=ec4899&color=fff',
            bio: 'The best investment I made for my notary practice. MyPowerly streamlined my workflow and helped me attract more clients through their professional platform.',
            location: 'Miami, FL',
            profession: 'Notary & Legal Services',
            joinedDate: '2024-03-10'
          },
          {
            id: '4',
            name: 'David Thompson',
            image: 'https://ui-avatars.com/api/?name=David+Thompson&size=200&background=10b981&color=fff',
            bio: 'MyPowerly is a game-changer! The platform helped me establish my online presence and manage appointments seamlessly. My business has grown 3x since joining.',
            location: 'Austin, TX',
            profession: 'Senior Notary Public',
            joinedDate: '2023-11-05'
          },
          {
            id: '5',
            name: 'Jessica Martinez',
            image: 'https://ui-avatars.com/api/?name=Jessica+Martinez&size=200&background=f59e0b&color=fff',
            bio: 'Professional, reliable, and easy to use. MyPowerly provides everything a modern notary needs to succeed in today\'s digital world.',
            location: 'Phoenix, AZ',
            profession: 'Notary & Document Services',
            joinedDate: '2024-01-28'
          },
          {
            id: '6',
            name: 'Robert Williams',
            image: 'https://ui-avatars.com/api/?name=Robert+Williams&size=200&background=3b82f6&color=fff',
            bio: 'I\'ve tried other platforms, but MyPowerly stands out with its comprehensive features and excellent support. It\'s the complete solution for notaries.',
            location: 'Seattle, WA',
            profession: 'Certified Signing Agent',
            joinedDate: '2023-12-12'
          }
        ];
        
        setTimeout(() => {
          setAffiliates(mockData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching affiliates:', error);
        setLoading(false);
      }
    };

    fetchAffiliates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Our Affiliate Partners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the successful notaries who trust MyPowerly to power their business
          </p>
        </div>

        {/* Affiliates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {affiliates.map((affiliate) => (
            <div
              key={affiliate.id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20 hover:scale-105 transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 text-indigo-200" size={40} />
              
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-75"></div>
                  <img
                    src={affiliate.image}
                    alt={affiliate.name}
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{affiliate.name}</h3>
                <p className="text-indigo-600 font-semibold mb-1">{affiliate.profession}</p>
                <p className="text-sm text-gray-500">{affiliate.location}</p>
              </div>

              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{affiliate.bio}"
              </p>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Partner since {new Date(affiliate.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Join Our Affiliate Program</h2>
          <p className="text-xl mb-8 opacity-90">
            Become a MyPowerly affiliate and help notaries grow their business while earning rewards
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg">
            Become an Affiliate
          </button>
        </div>
      </div>
    </div>
  );
}
