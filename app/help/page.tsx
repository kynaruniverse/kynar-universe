import Link from 'next/link';
import { Mail, MessageCircle, FileQuestion } from 'lucide-react';

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-home-surface pb-24">
      
      {/* HERO */}
      <section className="px-4 py-20 text-center border-b border-black/5">
        <h1 className="text-4xl font-bold font-sans text-primary-text mb-4">
          How can we help?
        </h1>
        <p className="text-xl font-serif text-primary-text/70 italic max-w-2xl mx-auto">
          Support, answers, and contact info. We are here to help you get settled.
        </p>
      </section>

      {/* SUPPORT GRID */}
      <section className="max-w-4xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CARD 1: FAQ */}
        <div className="bg-white p-8 rounded-card border border-gray-100 shadow-sm">
          <FileQuestion className="w-8 h-8 text-home-accent mb-4" />
          <h2 className="text-xl font-bold font-sans text-primary-text mb-2">Common Questions</h2>
          <ul className="space-y-3 text-primary-text/80 mt-4">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Downloads:</strong> Links are sent immediately via email.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Refunds:</strong> Digital items are non-refundable, but we will always help fix issues.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span><strong>Formats:</strong> We support PDF, Notion, and Excel.</span>
            </li>
          </ul>
        </div>

        {/* CARD 2: CONTACT */}
        <div className="bg-white p-8 rounded-card border border-gray-100 shadow-sm">
          <Mail className="w-8 h-8 text-home-accent mb-4" />
          <h2 className="text-xl font-bold font-sans text-primary-text mb-2">Contact Support</h2>
          <p className="text-primary-text/80 mb-6 leading-relaxed">
            Need help with an order or have a question before buying? We reply within 24 hours.
          </p>
          <a 
            href="mailto:support@kynaruniverse.co.uk" 
            className="inline-flex items-center font-bold text-home-accent hover:opacity-80 border-b-2 border-home-accent/20 hover:border-home-accent transition-all"
          >
            support@kynaruniverse.co.uk
          </a>
        </div>

      </section>

      {/* FOOTER NOTE */}
      <div className="text-center text-primary-text/50 text-sm">
        <p>Operating Hours: Mon-Fri, 9am - 5pm GMT</p>
      </div>

    </main>
  );
}
