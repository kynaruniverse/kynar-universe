"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  HelpCircle, 
  MessageSquare, 
  FileText, 
  ExternalLink, 
  ChevronRight,
  Search,
  LifeBuoy,
  Globe
} from 'lucide-react';

/**
 * HelpPage: The Support & Education Hub
 * Aligned with Brand Strategy 1.1: "Support should be as calm as the products."
 */
export default function HelpPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    { q: "How do I access my downloads?", a: "Once purchased, all items appear instantly in your 'Library' tab. You must be signed in with the email used at checkout to verify your identity." },
    { q: "Do you offer refunds?", a: "Due to the nature of digital assets, we generally don't offer refunds once a file is downloaded. However, if there's a technical issue or the file is corrupt, we'll replace or fix it immediately." },
    { q: "Which apps are supported?", a: "Our planners work perfectly with GoodNotes, Notability, and any PDF annotation app. Notion templates require a free or pro Notion account." },
    { q: "Where is my VAT receipt?", a: "Lemon Squeezy emails a receipt automatically. You can also find it by tapping 'View Receipt' in your Library next to the corresponding asset." }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 px-6 py-12 pb-40 pt-24 md:pt-32">
      <header className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-kyn-slate-900 dark:bg-white rounded-lg text-white dark:text-kyn-slate-900 shadow-sm">
            <LifeBuoy size={16} />
          </div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400">Support World</h2>
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-kyn-slate-900 dark:text-white mb-2 leading-none">
          How can we <br />
          <span className="text-kyn-green-600">help?</span>
        </h1>
        <p className="text-sm font-medium italic text-kyn-slate-500 dark:text-kyn-slate-400">
          "Finding order shouldn't be difficult. Explore our resources below."
        </p>
      </header>

      <main className="max-w-2xl mx-auto">
        {/* Search Bar (Visual Guide 11.2) */}
        <div className="relative mb-12 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-kyn-slate-300 group-focus-within:text-kyn-green-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search the archive..."
            className="w-full bg-white dark:bg-kyn-slate-800 p-6 pl-14 rounded-kyn border border-kyn-slate-100 dark:border-kyn-slate-700 outline-none focus:ring-4 focus:ring-kyn-green-500/5 shadow-kyn-lift transition-all font-medium text-sm dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Actions Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="kyn-card p-8 bg-kyn-green-50/50 dark:bg-kyn-green-900/10 border-kyn-green-100 dark:border-kyn-green-900/20">
            <div className="w-10 h-10 bg-white dark:bg-kyn-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <FileText className="text-kyn-green-600" size={20} />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-kyn-slate-900 dark:text-white">User Guides</h3>
            <p className="text-xs text-kyn-slate-500 dark:text-kyn-slate-400 font-medium italic mb-4">Detailed setup steps for all digital assets.</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-kyn-green-600 flex items-center gap-2 hover:translate-x-1 transition-transform">
              Explore Docs <ChevronRight size={14} />
            </button>
          </div>

          <div className="kyn-card p-8 bg-kyn-slate-900 text-white dark:bg-white dark:text-kyn-slate-900 border-none shadow-2xl">
            <div className="w-10 h-10 bg-kyn-slate-800 dark:bg-kyn-slate-100 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="text-kyn-green-400 dark:text-kyn-green-600" size={20} />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Human Support</h3>
            <p className="text-xs opacity-70 font-medium italic mb-4">Direct access to our UK-based team.</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-kyn-green-400 dark:text-kyn-green-600 flex items-center gap-2 hover:translate-x-1 transition-transform">
              Send Message <ChevronRight size={14} />
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-6 px-2">
            <HelpCircle size={16} className="text-kyn-slate-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400">Common Enquiries</h2>
          </div>
          
          <div className="grid gap-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <details key={index} className="group kyn-card bg-white dark:bg-kyn-slate-800 border-kyn-slate-50 dark:border-kyn-slate-700 overflow-hidden">
                  <summary className="list-none p-6 flex justify-between items-center cursor-pointer font-black text-[11px] uppercase tracking-wider text-kyn-slate-900 dark:text-white">
                    {faq.q}
                    <ChevronRight size={18} className="text-kyn-slate-300 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-sm text-kyn-slate-500 dark:text-kyn-slate-400 leading-relaxed font-medium italic border-t border-kyn-slate-50 dark:border-kyn-slate-700 pt-6">
                    "{faq.a}"
                  </div>
                </details>
              ))
            ) : (
              <div className="p-12 text-center border-2 border-dashed border-kyn-slate-100 dark:border-kyn-slate-800 rounded-kyn">
                <p className="text-[10px] font-black uppercase tracking-widest text-kyn-slate-400">No matching archives found.</p>
              </div>
            )}
          </div>
        </section>

        {/* Status Footer */}
        <footer className="mt-20 p-8 rounded-kyn bg-white dark:bg-kyn-slate-800 border border-kyn-slate-100 dark:border-kyn-slate-700 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-kyn-green-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-kyn-slate-400">Systems Operational</span>
          </div>
          <p className="text-[10px] font-bold text-kyn-slate-400 mb-6 uppercase tracking-widest">
            Identity: <span className="text-kyn-slate-900 dark:text-white">{user?.email || 'Guest Explorer'}</span>
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-kyn-slate-100 dark:border-kyn-slate-700 text-[10px] font-black uppercase tracking-widest text-kyn-slate-600 dark:text-kyn-slate-300 hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-700 transition-colors">
            <Globe size={14} />
            Technical Status <ExternalLink size={12} />
          </button>
        </footer>
      </main>
    </div>
  );
}
