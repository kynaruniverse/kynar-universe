"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Lock, Fingerprint, Database, UserCheck, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-base pb-32 transition-colors duration-1000">
      <div className="max-w-4xl mx-auto px-6 pt-24">
        
        {/* Navigation back to origin */}
        <Link href="/" className="group inline-flex items-center text-[10px] font-bold text-brand-text/30 hover:text-brand-text transition-all mb-12 uppercase tracking-[0.4em]">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Gallery
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="brand-card p-10 md:p-20 relative overflow-hidden"
        >
          {/* Subtle Branding Watermark */}
          <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none text-brand-text">
            <ShieldCheck size={200} />
          </div>

          <div className="w-14 h-14 bg-brand-surface/10 rounded-inner flex items-center justify-center mb-10 text-brand-accent shadow-sm border border-brand-surface/20">
            <Fingerprint size={28} strokeWidth={1.5} />
          </div>

          <h1 className="text-5xl md:text-[100px] font-semibold font-sans text-brand-text mb-10 tracking-tight leading-[0.9]">
            Privacy <br/> Protocol
          </h1>
          
          <div className="flex items-center gap-6 mb-20">
            <p className="text-[10px] font-bold text-brand-text/30 uppercase tracking-[0.5em]">
              UK GDPR STANDARDS
            </p>
            <div className="h-[1px] w-12 bg-brand-text/5" />
            <p className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.5em]">
              EST. 2026
            </p>
          </div>

          <div className="space-y-20">
            
            <section className="space-y-6">
              <h2 className="text-[11px] font-bold font-sans text-brand-text/30 uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-brand-base flex items-center justify-center text-[10px] text-brand-text/40">01</span> 
                Identity & Governance
              </h2>
              <p className="text-lg font-medium text-brand-text/60 leading-relaxed max-w-2xl">
                Kynar Muse is a digital ecosystem based in the United Kingdom. We operate with a curator&apos;s mindset toward data. For any inquiries regarding your presence in our registry, contact <span className="text-brand-text font-semibold">kynarmuse@gmail.com</span>.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-[11px] font-bold font-sans text-brand-text/30 uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-brand-base flex items-center justify-center text-[10px] text-brand-text/40">02</span> 
                Registry Integrity
              </h2>
              <p className="text-lg font-medium text-brand-text/60 leading-relaxed max-w-2xl">
                We only synchronize data essential for your Private Library: Email (Identity), Transaction History (Acquisition), and Technical Metadata to ensure secure delivery.
              </p>
              
              <div className="surface-mocha p-6 rounded-inner flex items-center gap-4 text-[10px] font-bold text-brand-text/50 uppercase tracking-widest">
                <Lock size={16} className="text-brand-accent" /> 
                Financial data is processed via encrypted third-party gateways. We never store card details.
              </div>
            </section>

            <section className="p-10 md:p-16 bg-brand-text rounded-[40px] shadow-tactile">
              <h2 className="text-[11px] font-bold font-sans text-white/40 uppercase tracking-[0.3em] flex items-center gap-4 mb-8">
                <Database className="text-brand-accent w-5 h-5" strokeWidth={1.5} /> 03. Infrastructure
              </h2>
              <p className="text-white/70 font-medium text-xl leading-relaxed">
                All Registry data is encrypted at rest using industry-standard PostgreSQL protocols. We treat your digital footprint with the same reverence as our own curated assets.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-[11px] font-bold font-sans text-brand-text/30 uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-brand-base flex items-center justify-center text-[10px] text-brand-text/40">04</span> 
                Autonomy
              </h2>
              <p className="text-lg font-medium text-brand-text/60 leading-relaxed max-w-2xl">
                Under the Data Protection Act 2018, you maintain full sovereignty. You may request access, rectification, or the absolute removal of your presence from our registry at any time.
              </p>
            </section>

            <section className="pt-16 border-t border-brand-text/5 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-brand-base rounded-inner shadow-sm">
                  <UserCheck size={20} className="text-brand-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[9px] font-bold text-brand-text/20 uppercase tracking-[0.4em] mb-1">Regulation</h3>
                  <p className="text-[11px] font-bold text-brand-text uppercase tracking-widest">UK GDPR STANDARDS</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-[9px] font-bold text-brand-text/20 uppercase tracking-[0.4em] mb-1">Legal Origin</h3>
                <p className="text-[11px] font-bold text-brand-text uppercase tracking-widest">United Kingdom Jurisdiction</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
