import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';

const ContentCard = ({ content }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Thumbnail */}
      <div className="relative">
        <img 
          src={content.thumbnail} 
          alt={content.title}
          className="w-full h-48 object-cover"
        />
        {content.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md text-xs">
          {content.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Creator Info */}
        <div className="flex items-center mb-3">
          <img 
            src={content.creator.profileImage} 
            alt={content.creator.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="flex-1">
            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {content.creator.name}
            </p>
            {content.creator.verified && (
              <span className="text-blue-500 text-xs">✓ Verified</span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-2`}>
          {content.title}
        </h3>

        {/* Description */}
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>
          {content.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {content.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className={`px-2 py-1 rounded-full text-xs ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tag}
            </span>
          ))}
          {content.tags.length > 3 && (
            <span className={`px-2 py-1 rounded-full text-xs ${
              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              +{content.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {content.rating}
              </span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {content.enrollments}
              </span>
            </div>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ${content.price}
            </span>
          </div>
          <Link 
            to={`/content/${content._id}`}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
