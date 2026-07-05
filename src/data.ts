import { GymWebsiteData } from './types';

export const initialGymData: GymWebsiteData = {
  details: {
    name: "National Gym",
    hindiName: "नेशनल जिम",
    rating: 4.5,
    reviewCount: 15,
    address: "Main Road, Near Bank of Baroda, Opposite Old Airtel Tower, Bhurkunda, Jharkhand 829106",
    phone: "+91 87097 92657",
    hours: "Monday - Saturday: 5:00 AM - 9:00 AM & 4:00 PM - 9:00 PM | Sunday: Closed",
    mapsPlusCode: "J9X7+3G, Bhurkunda, Jharkhand",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.793614051052!2d85.3484251!3d23.6386419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e3c9ec1be38b%3A0xe5a3637be6c0fc98!2sNational%20Gym!5e0!3m2!1sen!2sin!4v1720163450000!5m2!1sen!2sin",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com"
  },
  about: {
    title: "Bhurkunda's Premier Fitness Destination",
    headline: "Unleash Your Inner Beast & Achieve Absolute Greatness",
    mission: "At National Gym, our mission is to build a healthier, stronger, and more resilient community in Bhurkunda. We combine top-tier heavy-duty machinery, qualified guidance, and a powerhouse atmosphere to ensure you hit your peak form.",
    description1: "Established to provide world-class strength and cardiovascular conditioning resources locally, National Gym (नेशनल जिम) has earned its reputation as the most trustworthy gym in the region. We pride ourselves on creating an inclusive yet high-energy environment for everyone from absolute beginners to professional competitive lifters.",
    description2: "Whether your goal is rapid fat loss, hyper-trophy and muscle building, functional strength, or general cardiovascular health, our extensive collection of free weights, strength machines, and supportive expert trainers are always here to help you cross your finish line.",
    stats: [
      { label: "Satisfied Members", value: "500+" },
      { label: "Heavy Machinery", value: "35+" },
      { label: "Years of Trust", value: "6+" },
      { label: "Success Stories", value: "150+" }
    ]
  },
  services: [
    {
      id: "strength-training",
      title: "Strength & Weight Training",
      description: "Build massive raw power and definition. Access heavy dumbbells up to 40kg+, solid squat racks, plate-loaded machines, and olympic barbells.",
      icon: "Dumbbell",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "weight-loss",
      title: "Weight Loss & Conditioning",
      description: "Calorie-shredding workout protocols specifically designed to boost your metabolic rate, trim excess fat, and sculpt a lean physique.",
      icon: "Flame",
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "muscle-building",
      title: "Muscle Building (Hypertrophy)",
      description: "Focused training techniques using precise drop-sets, supersets, and target isolations to accelerate muscle fibers growth safely.",
      icon: "TrendingUp",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "cardio-fitness",
      title: "Cardio & Endurance",
      description: "Top-tier manual and automatic treadmills, stationary cycles, and elliptical trainers to optimize your lung capacity and heart health.",
      icon: "Zap",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "functional-training",
      title: "Functional & Core Fitness",
      description: "Improve balance, core integrity, stability, and everyday mobility using suspension trainers, medicine balls, and resistance bands.",
      icon: "ShieldAlert",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "personal-training",
      title: "1-on-1 Personal Coaching",
      description: "Receive fully customized diet plans, progressive training spreadsheets, and daily accountability checks with our expert trainers.",
      icon: "UserCheck",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600"
    }
  ],
  plans: [
    {
      id: "basic",
      name: "Basic Plan",
      price: "₹600",
      billingPeriod: "Month",
      features: [
        "Full gym access during morning or evening slots",
        "Access to all strength and free weights machinery",
        "General guidance from on-floor trainer",
        "Changing rooms & drinking water access",
        "Free secure parking space"
      ],
      isPopular: false
    },
    {
      id: "standard",
      name: "Standard Package",
      price: "₹1,500",
      billingPeriod: "3 Months",
      features: [
        "Save ₹300! Full access with flexible hours",
        "Unlimited cardio & strength equipment access",
        "Personalized body fat & BMI assessment check",
        "General nutrition guide and meal breakdown",
        "Lockers and changing rooms included"
      ],
      isPopular: true
    },
    {
      id: "premium",
      name: "Premium Coach Plan",
      price: "₹5,000",
      billingPeriod: "6 Months",
      features: [
        "Save ₹1,000! Complete priority access",
        "1-on-1 personal training consultation (4 sessions)",
        "Fully tailored macro-nutrient diet spreadsheet",
        "Monthly performance tracking and optimization",
        "Access to advanced core and functional setups",
        "Complimentary Gym T-Shirt & shaker bottle"
      ],
      isPopular: false
    }
  ],
  trainers: [
    {
      id: "trainer-1",
      name: "Coach Vikash Kumar",
      role: "Head Strength Coach & Nutritionist",
      specialties: ["Powerlifting", "Hypertrophy", "Custom Meal Planning"],
      certifications: ["K11 Certified Fitness Trainer", "Advanced Sports Nutritionist"],
      experience: "7+ Years",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "trainer-2",
      name: "Coach Rahul Mahato",
      role: "Senior Conditioning Coach",
      specialties: ["Fat Shredding", "High-Intensity Interval Training", "Endurance"],
      certifications: ["Gold's Gym Fitness Certification", "First Aid & CPR Certified"],
      experience: "5+ Years",
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=400"
    }
  ],
  facilities: [
    {
      id: "fac-1",
      title: "Advanced Heavy Duty Equipment",
      description: "High-quality biomechanically aligned strength systems, multi-gym stations, and plate-loaded leg presses.",
      icon: "Dumbbell"
    },
    {
      id: "fac-2",
      title: "Vast Free-Weights Area",
      description: "Equipped with multiple pairs of heavy dumbbells, solid iron kettlebells, plate racks, and adjustable benches.",
      icon: "Layers"
    },
    {
      id: "fac-3",
      title: "Cardio Zone",
      description: "Multiple high-speed treadmills, elliptical machines, and heavy magnetic spin-bikes to push your conditioning.",
      icon: "Activity"
    },
    {
      id: "fac-4",
      title: "Safe Lockers & Changing Rooms",
      description: "Private lockable storage compartments to safeguard your personal items and clean changing zones.",
      icon: "Lock"
    },
    {
      id: "fac-5",
      title: "Purified Water & Hygiene",
      description: "Equipped with chilled, highly filtered, clean RO drinking water and sanitized, hygienic facilities.",
      icon: "Droplets"
    },
    {
      id: "fac-6",
      title: "Ample Secure Parking",
      description: "Sufficient outdoor concrete parking area dedicated exclusively for members' two-wheelers and cars.",
      icon: "Car"
    }
  ],
  gallery: [
    {
      id: "gal-1",
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600",
      category: "equipment",
      title: "Heavy Bench Press Setup"
    },
    {
      id: "gal-2",
      url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
      category: "workout",
      title: "Deadlift Platform Training"
    },
    {
      id: "gal-3",
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600",
      category: "general",
      title: "National Gym Interior Overview"
    },
    {
      id: "gal-4",
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600",
      category: "cardio",
      title: "Treadmill Cardio Row"
    },
    {
      id: "gal-5",
      url: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=600",
      category: "equipment",
      title: "Dumbbell Rack and Bench Array"
    },
    {
      id: "gal-6",
      url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600",
      category: "workout",
      title: "HIIT Medicine Ball Swings"
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Amit Sharma",
      rating: 5,
      comment: "Best gym in Bhurkunda! The environment is outstanding and highly motivating. Coach Vikash is extremely knowledgeable, always correcting postures, and helps keep track of daily diet plans closely. Worth every single rupee!",
      role: "Member for 1 Year",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      date: "2026-06-15"
    },
    {
      id: "test-2",
      name: "Pooja Kumari",
      rating: 5,
      comment: "Highly secure and extremely respectful atmosphere for women. The machines are clean and well-maintained. The cardio zone is spacious. I have lost 8 kg in just 4 months of general conditioning here!",
      role: "Member for 6 Months",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      date: "2026-05-20"
    },
    {
      id: "test-3",
      name: "Rajesh Mahto",
      rating: 4,
      comment: "Proper iron-pumping vibe. Dumbbells go up to heavy weights which is hard to find in this area. Near the Bank of Baroda so very easy to access. Parking area is also clean and safe.",
      role: "Member for 2 Years",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      date: "2026-04-10"
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "What are the timings of National Gym?",
      answer: "We are open Monday to Saturday. Morning Session is from 5:00 AM to 9:00 AM, and Evening Session is from 4:00 PM to 9:00 PM. We remain closed on Sundays to allow muscle recovery and equipment sanitization.",
      category: "general"
    },
    {
      id: "faq-2",
      question: "Do you provide dietary support and diet plans?",
      answer: "Yes! All memberships include basic nutritional counseling. Under our Premium packages, we provide fully detailed macro-nutrient spreadsheets, cheat-meal rules, and tailored local food guides.",
      category: "membership"
    },
    {
      id: "faq-3",
      question: "Is there a female trainer available?",
      answer: "While we do not currently have a full-time female coach, our gym has a highly respectful, strictly monitored, and safe environment for female fitness enthusiasts with plenty of active female members.",
      category: "trainers"
    },
    {
      id: "faq-4",
      question: "Can I take a free trial before joining?",
      answer: "Absolutely! We invite fitness enthusiasts to experience a 1-day free trial on us. Drop by near the Bank of Baroda branch during our active hours, and we'll show you around.",
      category: "general"
    },
    {
      id: "faq-5",
      question: "Are there changing rooms and locker services?",
      answer: "Yes, we have clean changing rooms and secure personal lockers where you can safely place your bags, wallets, and keys while you focus on training.",
      category: "facilities"
    }
  ],
  blogs: [
    {
      id: "blog-1",
      title: "5 Essential Foods for High-Quality Muscle Building in India",
      summary: "Struggling to meet your protein targets with regular Indian meals? Learn how to structure simple, high-protein vegetarian and non-vegetarian food sources easily.",
      content: "Building high-quality muscle does not require expensive imported supplements. In fact, some of the most powerful bodybuilding foods are readily available in your local Bhurkunda market.\n\n1. Paneer (Cottage Cheese):\nA powerhouse of slow-digesting casein protein, perfect to eat before bedtime.\n\n2. Soya Chunks:\nExtremely cost-effective, containing over 50g of protein per 100g. Just boil them, squeeze out the water, and sauté with spices.\n\n3. Whole Eggs:\nRich in high-biological-value protein and healthy fats essential for maintaining testosterone levels.\n\n4. Kala Chana (Black Chickpeas):\nExcellent source of clean carbs and plant-based protein. Boil or consume as a morning salad with lemon.\n\n5. Double-toned Milk & Curd:\nRich in calcium for muscle contractions and quality whey/casein blocks.\n\nCombine these with progressive lifting at National Gym for guaranteed growth!",
      date: "2026-06-28",
      readTime: "4 mins read",
      author: "Coach Vikash Kumar",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
      category: "Nutrition"
    },
    {
      id: "blog-2",
      title: "The Ultimate Strength Guide: Deadlift Form and Safety Rules",
      summary: "Executing deadlifts incorrectly can damage your lower back. Avoid common mistakes and lock in perfect posture using our professional head coach breakdown.",
      content: "The Deadlift is the king of all compound movements, recruiting your hamstrings, glutes, lats, and erectors. To lift heavy weight safely, lock in these strict mechanical parameters:\n\n- Bar Mid-Foot: The bar should start exactly over your mid-foot, about 1 inch from your shins.\n- Straight Back: Never round your spine. Pull your chest tall and pinch your armpits backward to load your lats.\n- Push with Legs: Think of the pull as pushing the floor away with your feet, rather than lifting with your back.\n- Keep Bar Close: The barbell must travel in a perfect vertical path, rubbing against your shins and thighs.\n\nAsk Rahul or Vikash at the gym floor to review your form before you attempt a heavy single!",
      date: "2026-06-12",
      readTime: "5 mins read",
      author: "Coach Rahul Mahato",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
      category: "Training"
    },
    {
      id: "blog-3",
      title: "How to Keep Your Motivation Fire Blazing in Summer Months",
      summary: "Summer temperatures in Jharkhand can soar, making heavy workouts exhausting. Here is how to keep training with energy and staying completely hydrated.",
      content: "With temperatures rising in Bhurkunda, training can feel double as tough. Here are top strategies used by our peak performers:\n\n- Shift to Early Mornings: Join our 5:00 AM slot. The air is fresh, temperatures are cool, and it sets a powerhouse mood for the day.\n- Drink Mineralized Water: Simple water isn't enough. Add a pinch of black salt and lemon to your shaker to maintain sodium-potassium balance.\n- Prioritize Recovery: Sleep 7.5 to 8 hours to allow your nervous system to fully recuperate from heavy lifting sessions.\n\nStay consistent, heat is just an excuse!",
      date: "2026-05-30",
      readTime: "3 mins read",
      author: "National Gym Team",
      image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=600",
      category: "Lifestyle"
    }
  ],
  submissions: [],
  seo: {
    metaTitle: "National Gym Bhurkunda - Premier Strength & Conditioning Center",
    metaDescription: "Step into National Gym (नेशनल जिम), Bhurkunda, Jharkhand. Equipped with elite strength machinery, dumbbells up to 40kg, certified trainers, custom diets, and clean changing lockers. Start your trial today!",
    keywords: "gym in bhurkunda, fitness center bhurkunda, national gym bhurkunda, best gym jharkhand, weight loss bhurkunda, strength training bank of baroda, powerlifting bhurkunda, bodybuilding",
    ogImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200"
  }
};
