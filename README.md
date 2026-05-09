# Creator Hub - MERN Stack Application

A responsive mini web application where creators can showcase content and users can browse, search, and discover amazing educational resources.

## 🚀 Features

### ✅ Core Features
- **Creator Profile Section**: Display creator information, bio, profile images, social links, and banner/hero sections
- **Content Listing**: Minimum 3+ content cards with title, description, price, thumbnail, and "View Details" buttons
- **Detail View**: Modal-based content details with full descriptions, tags, preview sections, and CTA buttons
- **Search Functionality**: Real-time search across content titles, descriptions, and tags
- **Filter & Sort**: Filter by category, price range, and sort by price, rating, popularity, and date
- **Dark/Light Mode**: Toggle between dark and light themes with system preference detection
- **Dynamic Rendering**: Fully responsive design with mobile-first approach

### 🎨 UI/UX Features
- Modern, clean interface with Tailwind CSS v3
- Gradient accents and smooth transitions
- Verified creator badges
- Featured content highlighting
- Rating and enrollment statistics
- Responsive grid layouts
- Loading states and error handling

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **bcryptjs** - Password hashing (for future auth)
- **jsonwebtoken** - JWT tokens (for future auth)

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS v3** - Utility-first CSS framework
- **Axios** - HTTP client
- **Context API** - State management for theme

## 📁 Project Structure

```
Creator Hub/
├── backend/
│   ├── models/
│   │   ├── Creator.js
│   │   └── Content.js
│   ├── routes/
│   │   ├── creators.js
│   │   └── content.js
│   ├── seed.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── ContentCard.js
│   │   │   └── Modal.js
│   │   ├── context/
│   │   │   └── ThemeContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Content.js
│   │   │   └── Creators.js
│   │   ├── App.js
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd "Creator Hub"
```

### 2. Frontend Setup (Frontend-Only Application)

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start Frontend Development Server
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📊 API Endpoints

### Creators
- `GET /api/creators` - Get all creators
- `GET /api/creators/:id` - Get creator by ID
- `POST /api/creators` - Create new creator
- `PUT /api/creators/:id` - Update creator
- `DELETE /api/creators/:id` - Delete creator

### Content
- `GET /api/content` - Get all content (supports search, filter, sort)
- `GET /api/content/:id` - Get content by ID
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content
- `GET /api/content/creator/:creatorId` - Get content by creator
- `GET /api/content/categories/list` - Get all categories

### Query Parameters for Content API
- `search` - Search term
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sortBy` - Sort field (createdAt, price, rating, enrollments, title)
- `sortOrder` - Sort order (asc, desc)
- `creator` - Filter by creator ID
- `featured` - Filter featured content (true/false)

## 🎯 Usage Guide

### Navigation
- **Home** (`/`) - Landing page with featured creators and content
- **Content** (`/content`) - Browse all content with search and filters
- **Creators** (`/creators`) - View all creator profiles

### Features Usage

#### Search & Filter
1. Use the search bar to find content by title, description, or tags
2. Expand filters to filter by category and price range
3. Use sort dropdowns to order results by different criteria

#### Dark/Light Mode
- Click the theme toggle button in the header
- Theme preference is saved to localStorage
- System preference is automatically detected on first visit

#### Content Details
- Click "View Details" on any content card to see full information
- Modal displays preview images, full descriptions, tags, and statistics
- Click "Enroll Now" for enrollment (placeholder functionality)

#### Creator Profiles
- View creator information, social links, and bio
- Click "View Profile" for detailed creator information
- Click "View Content" to see all content from that creator

## 🎨 Design Features

### Responsive Design
- Mobile-first approach with breakpoints for tablets and desktops
- Flexible grid layouts that adapt to screen size
- Touch-friendly interface elements

### Visual Elements
- Gradient backgrounds and buttons
- Smooth hover transitions and micro-interactions
- Verified badges and featured indicators
- Star ratings and enrollment counters

### Accessibility
- Semantic HTML5 structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast ratios for readability

## 🔧 Development Notes

### Database Schema

#### Creator Model
```javascript
{
  name: String,
  bio: String,
  profileImage: String,
  bannerImage: String,
  socialLinks: {
    website: String,
    twitter: String,
    instagram: String,
    youtube: String,
    linkedin: String
  },
  email: String,
  verified: Boolean
}
```

#### Content Model
```javascript
{
  title: String,
  description: String,
  fullDescription: String,
  price: Number,
  thumbnail: String,
  preview: String,
  category: String,
  tags: [String],
  creator: ObjectId,
  featured: Boolean,
  rating: Number,
  enrollments: Number
}
```

### Component Architecture
- **Header**: Navigation and theme toggle
- **Footer**: Links and social media
- **ContentCard**: Reusable content display card
- **Modal**: Overlay for content details
- **ThemeContext**: Global theme state management

### State Management
- React Context API for theme management
- Local component state for UI interactions
- URL parameters for routing and filtering

## 🚀 Deployment

### Backend Deployment (Heroku Example)
```bash
# Install Heroku CLI
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting provider
3. Set environment variables for API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 Future Enhancements

- User authentication and authorization
- Payment integration for content purchases
- Content upload and management for creators
- User reviews and ratings system
- Wishlist and bookmark functionality
- Notification system
- Content recommendations
- Creator analytics dashboard
- Multi-language support

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Tailwind CSS for the amazing utility-first CSS framework
- Unsplash for the beautiful placeholder images
- React and the amazing open-source community

---

**Built with ❤️ by creators, for creators**
