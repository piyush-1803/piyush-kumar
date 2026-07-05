export interface GymDetails {
  name: string;
  hindiName: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  hours: string;
  mapsPlusCode: string;
  mapsEmbedUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}

export interface AboutSection {
  title: string;
  headline: string;
  mission: string;
  description1: string;
  description2: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface GymService {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  image: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  features: string[];
  isPopular: boolean;
  colorTheme?: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  certifications: string[];
  experience: string;
  image: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface GalleryItem {
  id: string;
  url: string;
  category: string; // 'equipment' | 'cardio' | 'workout' | 'general'
  title: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  role: string;
  image: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  category: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'resolved';
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
}

export interface GymWebsiteData {
  details: GymDetails;
  about: AboutSection;
  services: GymService[];
  plans: MembershipPlan[];
  trainers: Trainer[];
  facilities: Facility[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  blogs: BlogPost[];
  submissions: ContactSubmission[];
  seo: SEOSettings;
}
