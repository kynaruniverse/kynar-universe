"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Lock, Fingerprint, Database, UserCheck, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-home-base pb-32 transition-colors duration-1000 ease-in-out">
      <div className="max-w-4xl mx-auto px-6 pt-24">
        
        {/* Navigation back to origin */}
        <Link href="/" className="group inline-flex items-center text-[10px] font-black text-primary-text/40 hover:text-primary-text transition-all mb-12 uppercase tracking-[0.4em]">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="bg-white/40 backdrop-blur-3xl p-10 md:p-20 rounded-[64px] border border-white/60 shadow-glass relative overflow-hidden"
        >
          {/* Subtle Branding Watermark */}
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
            <ShieldCheck size={200} />
          </div>

          <div className="w-16 h-16 bg-tools-accent/10 rounded-3xl flex items-center justify-center mb-10 text-tools-accent border border-tools-accent/20">
            <Fingerprint size={32} />
          </div>

          <h1 className="text-5xl md:text-8xl font-black font-sans text-primary-text mb-6 tracking-tighter uppercase leading-[0.85]">
            Privacy <br/> Policy
          </h1>
          
          <div className="flex items-center gap-4 mb-20">
            <p className="text-[10px] font-black text-primary-text/30 uppercase tracking-[0.5em]">
              UK GDPR Compliant
            </p>
            <div className="h-[1px] w-12 bg-black/5" />
            <p className="text-[10px] font-black text-tools-accent uppercase tracking-[0.5em]">
              // 2026
            </p>
          </div>

          <div className="prose prose-lg text-primary-text/60 font-serif italic space-y-16 leading-relaxed">
            
            <section className="space-y-6">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-[0.2em] not-italic flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-[10px] text-primary-text/40">01</span> 
                About Us
              </h2>
              <p>Kynar Universe is a digital ecosystem based in the United Kingdom. We operate with radical transparency. For all data-related signals, contact <strong className="text-primary-text not-italic">Kynaruniverse@gmail.com</strong>.</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-[0.2em] not-italic flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-[10px] text-primary-text/40">02</span> 
                Information We Gather
              </h2>
              <p>We only capture data essential for your Account: Email (Identity), Transaction History (Order), and Technical Metadata. This ensures secure Delivery of your digital assets.</p>
              
              <div className="bg-white/40 p-6 rounded-[32px] border border-white/60 not-prose flex items-center gap-4 text-[10px] font-black text-primary-text/40 uppercase tracking-widest shadow-sm">
                <Lock size={16} className="text-tools-accent" /> 
                Financial data is processed via encrypted third-party gateways. We never store card details.
              </div>
            </section>

            <section className="space-y-8 p-10 md:p-16 bg-primary-text rounded-[48px] not-prose shadow-2xl">
              <h2 className="text-xl font-black font-sans text-white uppercase tracking-[0.3em] flex items-center gap-4 mb-6">
                <Database className="text-tools-accent w-6 h-6" /> 03. Safety
              </h2>
              <p className="text-white/60 font-serif italic text-lg leading-relaxed">
                All Account data is encrypted at rest using industry-standard PostgreSQL protocols via Supabase. We treat your digital footprint with the same reverence as our own.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-[0.2em] not-italic flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-[10px] text-primary-text/40">04</span> 
                User Choice
              </h2>
              <p>Under the Data Protection Act 2018, you maintain full autonomy. You may request access, rectification, or the absolute deletion of your record (&ldquo;Right to be Forgotten&rdquo;) at any time.</p>
            </section>

            <section className="pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10 not-prose">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/60 rounded-2xl border border-black/5">
                  <UserCheck size={20} className="text-tools-accent" />
                </div>
                <div>
                  <h3 className="text-[9px] font-black text-primary-text/20 uppercase tracking-[0.4em] mb-1">Regulation</h3>
                  <p className="text-sm font-black text-primary-text uppercase tracking-tighter">DPA 2018 / UK GDPR</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-[9px] font-black text-primary-text/20 uppercase tracking-[0.4em] mb-1">Legal Origin</h3>
                <p className="text-sm font-black text-primary-text uppercase tracking-tighter">United Kingdom Jurisdiction</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
