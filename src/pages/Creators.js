import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import Modal from '../components/Modal';
import { allCreators as creators } from '../data/sampleData';

const Creators = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [displayCreators, setDisplayCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter creators using useMemo for performance
  const filteredCreators = useMemo(() => {
    console.log('Creators.js - Filtering creators with term:', searchTerm);
    if (!searchTerm) return creators;
    
    return creators.filter(creator =>
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);
  
  useEffect(() => {
    console.log('Creators.js - Setting filtered creators:', filteredCreators.length);
    setDisplayCreators(filteredCreators);
    setLoading(false);
  }, [filteredCreators]);
  
  useEffect(() => {
    console.log('Creators.js - Initializing with all creators:', creators.length);
    // Initialize with all creators
    setDisplayCreators(creators);
    setLoading(false);
  }, []);
  
  // Handle creator detail view when ID is in URL
  useEffect(() => {
    console.log('Creators.js - URL parameter id:', id);
    if (id) {
      const creator = creators.find(c => c._id === id);
      if (creator) {
        console.log('Creators.js - Creator found:', creator);
        setSelectedCreator(creator);
        setIsModalOpen(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCreatorClick = (creator) => {
    setSelectedCreator(creator);
    setIsModalOpen(true);
    navigate(`/creators/${creator._id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCreator(null);
    navigate('/creators');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Meet Our Creators
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Connect with talented creators and discover their amazing content
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <svg 
                className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Found {displayCreators.length} creators
          </p>
        </div>

        {/* Creators Grid */}
        {displayCreators.length === 0 ? (
          <div className={`text-center py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No creators found
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCreators.map((creator) => (
              <div
                key={creator._id}
                className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                {/* Banner */}
                <div className="h-32 relative">
                  <img 
                    src={creator.bannerImage} 
                    alt={`${creator.name} banner`}
                    className="w-full h-full object-cover"
                  />
                  {creator.verified && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                      Verified
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="p-6 -mt-12 relative">
                  <div className="flex items-center mb-4">
                    <img 
                      src={creator.profileImage} 
                      alt={creator.name}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {creator.name}
                      </h3>
                      <a 
                        href={`mailto:${creator.email}`}
                        className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-purple-500`}
                      >
                        {creator.email}
                      </a>
                    </div>
                  </div>

                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3`}>
                    {creator.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex space-x-3 mb-4">
                    {creator.socialLinks.website && (
                      <a 
                        href={creator.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                        title="Website"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {creator.socialLinks.twitter && (
                      <a 
                        href={`https://twitter.com/${creator.socialLinks.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                        title="Twitter"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    )}
                    {creator.socialLinks.instagram && (
                      <a 
                        href={`https://instagram.com/${creator.socialLinks.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                        title="Instagram"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {creator.socialLinks.youtube && (
                      <a 
                        href={`https://youtube.com/${creator.socialLinks.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                        title="YouTube"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.854 11.854 0 0010 2c4.47 0 8.268 3.12 9.543 7a10.025 10.025 0 01-9.543 7c-4.47 0-8.268-3.12-9.543-7a11.78 11.78 0 011.166-4.001zm18.668 0A11.854 11.854 0 0010 2c-4.47 0-8.268 3.12-9.543 7a10.025 10.025 0 009.543 7c4.47 0 8.268-3.12 9.543-7a11.78 11.78 0 00-1.166-4.001zM10 7a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {creator.socialLinks.linkedin && (
                      <a 
                        href={`https://linkedin.com/in/${creator.socialLinks.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                        title="LinkedIn"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.33-.582 1.33-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleCreatorClick(creator)}
                      className="flex-1 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                    >
                      View Profile
                    </button>
                    <Link 
                      to={`/content?creator=${creator._id}`}
                      className="flex-1 text-center border border-purple-500 text-purple-500 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center justify-center"
                    >
                      View Content
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Creator Detail Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={selectedCreator?.name}
      >
        {selectedCreator && (
          <div className="space-y-6">
            {/* Banner Image */}
            <div className="relative">
              <img 
                src={selectedCreator.bannerImage} 
                alt={`${selectedCreator.name} banner`}
                className="w-full h-48 object-cover rounded-lg"
              />
              {selectedCreator.verified && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                  Verified Creator
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex items-center space-x-4">
              <img 
                src={selectedCreator.profileImage} 
                alt={selectedCreator.name}
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h3 className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedCreator.name}
                </h3>
                <a 
                  href={`mailto:${selectedCreator.email}`}
                  className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-purple-500`}
                >
                  {selectedCreator.email}
                </a>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h4 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                About
              </h4>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                {selectedCreator.bio}
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className={`font-semibold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Connect
              </h4>
              <div className="flex flex-wrap gap-3">
                {selectedCreator.socialLinks.website && (
                  <a 
                    href={selectedCreator.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors flex items-center space-x-2`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Website</span>
                  </a>
                )}
                {selectedCreator.socialLinks.twitter && (
                  <a 
                    href={`https://twitter.com/${selectedCreator.socialLinks.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors flex items-center space-x-2`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Twitter</span>
                  </a>
                )}
                {selectedCreator.socialLinks.linkedin && (
                  <a 
                    href={`https://linkedin.com/in/${selectedCreator.socialLinks.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors flex items-center space-x-2`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.33-.582 1.33-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link 
                to={`/content?creator=${selectedCreator._id}`}
                onClick={closeModal}
                className="block w-full text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                View Creator's Content
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Creators;
