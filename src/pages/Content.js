import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ContentCard from '../components/ContentCard';
import Modal from '../components/Modal';
import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { allContent as content, categories } from '../data/sampleData';

const Content = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { id } = useParams();
  const [displayContent, setDisplayContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort content using useMemo for performance
  const filteredContent = useMemo(() => {
    console.log('Content.js - Filtering content with:', { searchTerm, selectedCategory, minPrice, maxPrice, sortBy, sortOrder });
    let filtered = [...content];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // Apply price filters
    if (minPrice) {
      filtered = filtered.filter(item => item.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(item => item.price <= parseFloat(maxPrice));
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'enrollments':
          aValue = a.enrollments;
          bValue = b.enrollments;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        default:
          aValue = a._id;
          bValue = b._id;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  }, [content, searchTerm, selectedCategory, minPrice, maxPrice, sortBy, sortOrder]);
  
  useEffect(() => {
    console.log('Content.js - Setting display content:', filteredContent.length, 'items');
    setDisplayContent(filteredContent);
    setLoading(false);
  }, [filteredContent]);
  
  // Categories are now imported directly from sampleData
  
  // Handle content detail view when ID is in URL
  useEffect(() => {
    console.log('Content.js - URL parameter id:', id);
    if (id) {
      const contentItem = content.find(item => item._id === id);
      console.log('Content.js - Found content item:', contentItem);
      if (contentItem) {
        setSelectedContent(contentItem);
        setIsModalOpen(true);
      }
    }
  }, [id, content]);

  const handleContentClick = (contentItem) => {
    setSelectedContent(contentItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContent(null);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('createdAt');
    setSortOrder('desc');
  };

  const handleEnroll = (contentId) => {
    // In a real app, this would handle enrollment/payment
    alert('Enrollment functionality would be implemented here!');
    closeModal();
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
            Browse Content
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover amazing courses, tutorials, and resources from talented creators
          </p>
        </div>

        {/* Search and Filters */}
        <div className={`rounded-lg p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
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

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              } transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filters</span>
            </button>

            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              >
                <option value="createdAt">Latest</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="enrollments">Popularity</option>
                <option value="title">Title</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className={`border-t pt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Min Price
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                </div>
              </div>

              {/* Reset Filters */}
              <div className="mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Found {displayContent.length} items
          </p>
        </div>

        {/* Content Grid */}
        {displayContent.length === 0 ? (
          <div className={`text-center py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}>
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No content found
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayContent.map((contentItem) => (
              <div key={contentItem._id} onClick={() => handleContentClick(contentItem)}>
                <ContentCard content={contentItem} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Detail Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={selectedContent?.title}
      >
        {selectedContent && (
          <div className="space-y-6">
            {/* Preview Image */}
            <div className="relative">
              <img 
                src={selectedContent.preview} 
                alt={selectedContent.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              {selectedContent.featured && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                  Featured
                </div>
              )}
            </div>

            {/* Creator Info */}
            <div className="flex items-center space-x-4">
              <img 
                src={selectedContent.creator.profileImage} 
                alt={selectedContent.creator.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedContent.creator.name}
                </h4>
                {selectedContent.creator.verified && (
                  <span className="text-blue-500 text-sm">✓ Verified Creator</span>
                )}
              </div>
            </div>

            {/* Full Description */}
            <div>
              <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                About this content
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                {selectedContent.fullDescription}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedContent.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-purple-500">{selectedContent.rating}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rating</div>
              </div>
              <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-blue-500">{selectedContent.enrollments}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Students</div>
              </div>
              <div className={`text-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="text-2xl font-bold text-green-500">{selectedContent.category}</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Category</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-between">
              <div>
                <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${selectedContent.price}
                </span>
              </div>
              <button
                onClick={() => handleEnroll(selectedContent._id)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                Enroll Now
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Content;
