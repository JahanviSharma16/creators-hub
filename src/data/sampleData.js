// Sample data for frontend-only application

export const allCreators = [
  {
    _id: '1',
    name: 'Sarah Johnson',
    bio: 'Full-stack developer and UI/UX enthusiast with 8+ years of experience. Passionate about creating beautiful and functional web applications.',
    profileImage: 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=',
    bannerImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
    socialLinks: {
      website: 'https://sarahjohnson.dev',
      twitter: 'sarahj_dev',
      instagram: 'sarahjohnson.design',
      youtube: 'channel/UC123456789',
      linkedin: 'sarah-johnson-dev'
    },
    email: 'sarah.johnson@example.com',
    verified: true
  },
  {
    _id: '2',
    name: 'Michael Chen',
    bio: 'Mobile app developer specializing in React Native and Flutter. Love teaching others how to build amazing mobile experiences.',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bannerImage: 'https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg?semt=ais_hybrid&w=740&q=80',
    socialLinks: {
      website: 'https://michaelchen.dev',
      twitter: 'michaelchen',
      github: 'michaelchen',
      linkedin: 'michael-chen-mobile'
    },
    email: 'michael.chen@example.com',
    verified: true
  },
  {
    _id: '3',
    name: 'Emily Rodriguez',
    bio: 'Data scientist and machine learning engineer. Helping developers understand AI and build intelligent applications.',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bannerImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=400&fit=crop',
    socialLinks: {
      website: 'https://emilyrodriguez.ai',
      twitter: 'emily_ai',
      github: 'emilyrodriguez',
      linkedin: 'emily-rodriguez-ml'
    },
    email: 'emily.rodriguez@example.com',
    verified: false
  }
];

export const allContent = [
  {
    _id: '1',
    title: 'Complete React.js Masterclass',
    description: 'Learn React.js from scratch to advanced concepts including hooks, context, and performance optimization.',
    fullDescription: 'This comprehensive React.js course covers everything you need to become a React expert. Starting with the basics and gradually moving to advanced topics like Redux, performance optimization, testing, and deployment. You will build real-world projects and learn best practices.',
    price: 89.99,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    preview: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    category: 'course',
    tags: ['react', 'javascript', 'web development', 'frontend'],
    featured: true,
    rating: 4.8,
    enrollments: 1250,
    creator: {
      _id: '1',
      name: 'Sarah Johnson',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true
    }
  },
  {
    _id: '2',
    title: 'UI/UX Design Principles',
    description: 'Master the fundamentals of user interface and user experience design with practical examples.',
    fullDescription: 'Learn the core principles of UI/UX design including color theory, typography, layout design, user research, and prototyping. This course includes hands-on projects and real-world case studies.',
    price: 69.99,
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVbZwiUkIBPDwkeYImg6Uv4g7zvfDY9C5d7g&s',
    preview: 'https://images.unsplash.com/photo-1559028006-44a26fbd16c2?w=800&h=450&fit=crop',
    category: 'course',
    tags: ['design', 'ui', 'ux', 'figma'],
    featured: true,
    rating: 4.6,
    enrollments: 890,
    creator: {
      _id: '1',
      name: 'Sarah Johnson',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true
    }
  },
  {
    _id: '3',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps for iOS and Android using React Native.',
    fullDescription: 'Learn how to create stunning mobile applications using React Native. This course covers navigation, state management, animations, native modules, and app deployment to both App Store and Google Play.',
    price: 79.99,
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7c0UqQMDhdYT-Uw8doSL5ZLmh1I3fNb_9PQ&s',
    preview: 'https://images.unsplash.com/photo-1512941937669-b90c1d583c0c?w=800&h=450&fit=crop',
    category: 'course',
    tags: ['react native', 'mobile', 'ios', 'android'],
    featured: false,
    rating: 4.7,
    enrollments: 670,
    creator: {
      _id: '2',
      name: 'Michael Chen',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true
    }
  },
  {
    _id: '4',
    title: 'Python for Data Science',
    description: 'Learn Python programming with a focus on data analysis, visualization, and machine learning.',
    fullDescription: 'This course teaches Python programming specifically for data science applications. You will learn NumPy, Pandas, Matplotlib, Scikit-learn, and how to build machine learning models.',
    price: 99.99,
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
    preview: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop',
    category: 'course',
    tags: ['python', 'data science', 'machine learning', 'pandas'],
    featured: true,
    rating: 4.9,
    enrollments: 2100,
    creator: {
      _id: '3',
      name: 'Emily Rodriguez',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: false
    }
  },
  {
    _id: '5',
    title: 'Modern CSS Techniques',
    description: 'Master advanced CSS including Grid, Flexbox, animations, and modern layout techniques.',
    fullDescription: 'Deep dive into modern CSS features including CSS Grid, Flexbox, custom properties, animations, and responsive design. Learn how to create beautiful, responsive layouts without frameworks.',
    price: 49.99,
    thumbnail: 'https://nasyxnadeem.dev/static/515fa65f00cf9e6f783954bb659a9209/css-cover.svg',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
    category: 'tutorial',
    tags: ['css', 'web design', 'frontend', 'responsive'],
    featured: false,
    rating: 4.5,
    enrollments: 450,
    creator: {
      _id: '2',
      name: 'Michael Chen',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      verified: true
    }
  },
  {
    _id: '6',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
    fullDescription: 'Learn how to create robust backend APIs using Node.js and Express. This course covers authentication, database integration, error handling, testing, and deployment best practices.',
    price: 74.99,
    thumbnail: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220517005132/Why-to-Use-NodeJS-for-Backend-Development.jpg',
    preview: 'https://images.unsplash.com/photo-1558494949-ef010cbcc31c?w=800&h=450&fit=crop',
    category: 'course',
    tags: ['nodejs', 'express', 'mongodb', 'backend'],
    featured: false,
    rating: 4.6,
    enrollments: 780,
    creator: {
      _id: '3',
      name: 'Emily Rodriguez',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      verified: false
    }
  }
];

export const categories = ['course', 'tutorial', 'template', 'ebook', 'workshop', 'other'];
