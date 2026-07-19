import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: 'How to Care for Your 18K Gold Jewelry',
    excerpt: 'Simple daily tips, cleaning routines, and storage recommendations to maintain the sparkling luster of fine yellow gold.',
    date: 'July 14, 2026',
    author: 'Alistair Sterling',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    title: 'Understanding Diamond Cut & Carat Weights',
    excerpt: 'A comprehensive beginner guide to cushion, emerald, and brilliant-round diamond selections in fine jewelry.',
    date: 'June 28, 2026',
    author: 'Victoria Vance',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80'
  }
];

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 font-sans space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <span className="text-xs tracking-[0.3em] font-semibold text-primary-glow uppercase">The Journal</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-luxuryBlack tracking-tight">Atelier Diaries</h1>
        <p className="text-sm text-secondary-text leading-relaxed">
          Explore gemstone histories, care instructions, and styling notes from our in-house consultants.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {blogPosts.map((post) => (
          <div key={post.id} className="group cursor-pointer flex flex-col gap-4">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-surface-container shadow-sm relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex gap-4 text-[10px] text-secondary font-medium tracking-wider uppercase">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> By {post.author}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-luxuryBlack group-hover:text-primary-glow transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-secondary-text leading-relaxed font-sans">{post.excerpt}</p>
              <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:underline pt-2">
                READ JOURNAL ENTRY <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Blogs;
