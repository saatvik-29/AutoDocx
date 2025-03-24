"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdOutlineDescription, MdOutlineEdit, MdOutlineTimer, MdOutlineIntegrationInstructions } from 'react-icons/md';
// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-sm shadow-lg py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8">
        <div className="text-xl font-bold">
          <span className="text-indigo-600">Auto</span>
          <span className={`${scrolled ? 'text-gray-800' : 'text-white'}`}>Docx</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          {['Home', 'Features', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`relative font-medium transition-colors duration-300 ${
                scrolled ? 'text-gray-800 hover:text-indigo-600' : 'text-white/90 hover:text-white'
              } group`}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <a
            href="/login"
            className={`transition-colors duration-300 font-medium ${
              scrolled ? 'text-gray-800 hover:text-indigo-600' : 'text-white/90 hover:text-white'
            }`}
          >
            Login
          </a>
          <a
            href="#signup"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
};

// Hero Section (Automatic Document Generation Focus)
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-white animate-fadeIn">
          <h2 className="text-lg font-medium mb-3 animate-slideUp opacity-0" style={{ animationDelay: '0.2s' }}>
            REAL TIME DOCUMENT GENERATION
          </h2>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-slideUp opacity-0" style={{ animationDelay: '0.4s' }}>
            Generate Your Documents <span className="text-yellow-300">Instantly</span>
          </h1>
          <p className="text-xl mb-8 text-white/80 max-w-lg animate-slideUp opacity-0" style={{ animationDelay: '0.6s' }}>
            Our platform automatically generates professional documents as you work. Watch your content come to life in real time.
          </p>
          <div className="flex flex-wrap gap-4 animate-slideUp opacity-0" style={{ animationDelay: '0.8s' }}>
            <a
              href="/login"
              className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300 hover:bg-gray-100 hover:-translate-y-1 transform active:translate-y-0"
            >
              Start Generating
            </a>
            <a
              href="/docxing"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition duration-300"
            >
              See Live Demo
            </a>
          </div>
        </div>
        <div className="relative flex justify-center lg:justify-end animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="w-full max-w-md aspect-square bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/20 shadow-2xl animate-float">
            <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden">
              {/* ✅ Reference the image directly from the public folder */}
              <img src="/image.png" alt="Document Preview" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
          <div
            className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-300 rounded-lg shadow-lg animate-bounce"
            style={{ animationDuration: '6s' }}
          ></div>
          <div
            className="absolute -top-6 -right-6 w-20 h-20 bg-indigo-300 rounded-full shadow-lg animate-float"
            style={{ animationDuration: '8s' }}
          ></div>
        </div>
      </div>
    </section>
  );
};




// Features Section (Document Generation Tools)
const FeaturesSection = () => {
  const features = [
    {
      title: "Dynamic Templates",
      description: "Select from a variety of templates that automatically adapt to your content in real time.",
      icon: <MdOutlineDescription className="h-12 w-12 text-indigo-600" />
    },
    {
      title: "Real-time Editing",
      description: "Experience live document editing with instant preview and collaborative features.",
      icon: <MdOutlineEdit className="h-12 w-12 text-indigo-600" />
    },
    {
      title: "Automated Workflows",
      description: "Set up workflows to automate document generation, review, and distribution.",
      icon: <MdOutlineTimer className="h-12 w-12 text-indigo-600" />
    },
    {
      title: "Integration Ready",
      description: "Easily integrate with your favorite tools and services to streamline your workflow.",
      icon: <MdOutlineIntegrationInstructions className="h-12 w-12 text-indigo-600" />
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-lg font-medium text-indigo-600 mb-2">FEATURES</h3>
          <h2 className="text-4xl font-bold text-gray-900">Automatic Document Generation</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform uses smart templates and real-time data to generate professional documents as you work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 transform group"
            >
              <div className="mb-4 group-hover:scale-110 transform transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "DocGen Live has revolutionized our workflow. The real-time document generation saved us hours of manual work!",
      author: "Alex Martinez",
      role: "Project Manager, FinTech"
    },
    {
      quote: "The seamless integration and instant editing features have made our document process much more efficient.",
      author: "Jamie Lee",
      role: "Operations Lead, EduTech"
    },
    {
      quote: "I never thought document creation could be so dynamic. It’s like watching your ideas take shape right before your eyes.",
      author: "Morgan Smith",
      role: "Creative Director, MediaHouse"
    }
  ];
  
  return (
    <section id="testimonials" className="py-24 bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-lg font-medium text-indigo-300 mb-2">TESTIMONIALS</h3>
          <h2 className="text-4xl font-bold">What Our Users Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-indigo-800/50 backdrop-blur-sm p-8 rounded-xl border border-indigo-700 hover:border-indigo-500 transition-all duration-300"
            >
              <svg className="h-10 w-10 text-indigo-400 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z"/>
              </svg>
              <p className="mb-6 text-lg leading-relaxed">{testimonial.quote}</p>
              <div>
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-indigo-300 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: "Basic",
      price: 0,
      period: "Free forever",
      description: "Get started with real-time document generation at no cost.",
      features: ["Dynamic templates", "Live editing", "Community support", "Limited integrations"]
    },
    {
      name: "Pro",
      price: 29,
      period: "per month",
      description: "For professionals needing advanced features and integrations.",
      features: ["Advanced templates", "Priority support", "Multiple integrations", "Team collaboration"],
      highlight: true
    },
    {
      name: "Enterprise",
      price: 99,
      period: "per month",
      description: "For organizations that demand full automation and custom solutions.",
      features: ["Unlimited documents", "Custom workflows", "24/7 support", "Advanced security", "Dedicated account manager"]
    }
  ];
  
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-lg font-medium text-indigo-600 mb-2">PRICING</h3>
          <h2 className="text-4xl font-bold text-gray-800">Choose Your Plan</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible pricing to suit businesses of all sizes. Start generating documents automatically today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 transform ${
                plan.highlight 
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl hover:shadow-2xl text-white border-2 border-indigo-400' 
                  : 'bg-white shadow-lg hover:shadow-xl border border-gray-200'
              }`}
            >
              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-800'}`}>{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-800'}`}>${plan.price}</span>
                  <span className={`ml-1 ${plan.highlight ? 'text-indigo-100' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
                <p className={`mb-6 ${plan.highlight ? 'text-indigo-100' : 'text-gray-700'}`}>{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg 
                        className={`h-5 w-5 mr-2 ${plan.highlight ? 'text-indigo-200' : 'text-indigo-500'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.highlight ? 'text-indigo-100' : 'text-gray-800'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="#signup" 
                  className={`block w-full py-3 text-center rounded-full font-medium transition-all duration-300 ${
                    plan.highlight 
                      ? 'bg-white text-indigo-600 hover:bg-gray-50' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Automate Your Document Process?</h2>
        <p className="text-xl mb-8 text-indigo-100 max-w-3xl mx-auto">
          Join thousands of users who are generating their documents automatically in real time.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#signup" className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300 hover:bg-gray-100">
            Start Now
          </a>
          <a href="#contact" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition duration-300">
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-xl font-bold mb-4">
              <span className="text-indigo-400">DocGen</span>Live
            </div>
            <p className="text-gray-400 mb-4">
              Automatically generating professional documents in real time.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'github'].map((social) => (
                <a key={social} href={`#${social}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {[
            {
              title: "Product",
              links: ["Features", "Integrations", "Pricing", "Updates", "Beta Program"]
            },
            {
              title: "Support",
              links: ["Documentation", "Tutorials", "FAQ", "Community", "Contact Us"]
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Press", "Legal"]
            }
          ].map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} DocGenLive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App (Landing Page)
export default function LandingPage() {
  // Custom CSS animations for smooth transitions
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      
      .animate-fadeIn {
        animation: fadeIn 1s forwards;
      }
      
      .animate-slideUp {
        animation: slideUp 0.8s forwards;
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
