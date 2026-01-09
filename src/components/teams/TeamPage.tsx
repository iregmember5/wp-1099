import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
}

// Dummy team members data
const dummyTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'With over 15 years of experience in digital transformation, Sarah leads our vision to revolutionize the notary industry through innovative technology solutions.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    skills: ['Leadership', 'Strategy', 'Innovation']
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Michael brings 12 years of software engineering expertise, architecting scalable solutions that power our platform and ensure security for all transactions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    skills: ['Architecture', 'Security', 'Cloud']
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    bio: 'Emily crafts beautiful, intuitive experiences that make complex notary processes simple and delightful for our users worldwide.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    skills: ['UX Design', 'UI Design', 'Branding']
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Head of Operations',
    bio: 'David ensures seamless operations and exceptional customer service, managing our growing team and optimizing processes for efficiency.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    skills: ['Operations', 'Management', 'Process']
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'Lead Developer',
    bio: 'Lisa leads our development team, building robust features and maintaining code quality that powers millions of notarizations.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    skills: ['Full Stack', 'React', 'Node.js']
  }
];

export default function TeamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMember = () => {
    setCurrentIndex((prev) => (prev + 1) % dummyTeamMembers.length);
  };

  const prevMember = () => {
    setCurrentIndex((prev) => (prev - 1 + dummyTeamMembers.length) % dummyTeamMembers.length);
  };

  const currentMember = dummyTeamMembers[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate professionals dedicated to transforming the notary experience
          </p>
        </div>

        {/* Open Book Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Book Container */}
          <div className="relative perspective-1000">
            <div className="book-container bg-gradient-to-br from-amber-100 to-amber-50 rounded-3xl shadow-2xl p-8 md:p-12">
              {/* Book Spine Shadow */}
              <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-amber-800/20 via-amber-900/30 to-amber-800/20 shadow-inner z-10" />
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative">
                {/* Left Page - Details */}
                <div className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden book-page">
                  {/* Page Lines */}
                  <div className="absolute inset-0 opacity-5">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="h-8 border-b border-gray-300" />
                    ))}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-6">
                      <h2 className="text-4xl font-bold text-gray-800 mb-2">
                        {currentMember.name}
                      </h2>
                      <p className="text-xl text-blue-600 font-semibold">
                        {currentMember.role}
                      </p>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {currentMember.bio}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {currentMember.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Page Number */}
                    <div className="absolute bottom-4 left-8 text-gray-400 text-sm">
                      {currentIndex * 2 + 1}
                    </div>
                  </div>
                </div>

                {/* Right Page - Image */}
                <div className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden book-page">
                  <div className="relative h-full flex items-center justify-center">
                    <div className="relative w-full max-w-sm">
                      <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        <img
                          src={currentMember.image}
                          alt={currentMember.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Decorative Frame */}
                      <div className="absolute -inset-4 border-4 border-amber-200 rounded-3xl -z-10" />
                    </div>

                    {/* Page Number */}
                    <div className="absolute bottom-4 right-8 text-gray-400 text-sm">
                      {currentIndex * 2 + 2}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button
              onClick={prevMember}
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-blue-600 hover:bg-blue-50"
              aria-label="Previous member"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-3">
              {dummyTeamMembers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? 'w-12 h-3 bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to member ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextMember}
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-blue-600 hover:bg-blue-50"
              aria-label="Next member"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            { label: 'Team Members', value: '50+' },
            { label: 'Countries', value: '12' },
            { label: 'Years Experience', value: '15+' },
            { label: 'Happy Clients', value: '10K+' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .book-container {
          transform-style: preserve-3d;
          animation: bookFloat 6s ease-in-out infinite;
        }

        .book-page {
          transform-style: preserve-3d;
          transition: transform 0.6s ease;
        }

        @keyframes bookFloat {
          0%, 100% {
            transform: translateY(0px) rotateX(2deg);
          }
          50% {
            transform: translateY(-10px) rotateX(2deg);
          }
        }
      `}</style>
    </div>
  );
}
