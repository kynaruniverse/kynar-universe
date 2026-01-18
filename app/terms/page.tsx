"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, Globe, FileText, Zap, Info } from "lucide-react";

export default function TermsPage() {
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
          {/* PHASE 4: Temporary Legal Disclosure */}
          <div className="mb-12 flex items-start gap-4 p-6 bg-brand-surface/10 rounded-inner border border-brand-surface/20">
            <Info size={18} className="text-brand-accent shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-brand-text/60 leading-relaxed">
              <strong>Registry Preview Notice:</strong> No products are currently for sale. This site and all listed assets are in preview mode. Formal acquisition protocols are currently inactive.
            </p>
          </div>

          {/* Subtle Branding Watermark */}
          <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none text-brand-text">
            <Scale size={200} />
          </div>

          <div className="w-14 h-14 bg-brand-surface/10 rounded-inner flex items-center justify-center mb-10 text-brand-accent shadow-sm">
            <FileText size={28} strokeWidth={1.5} />
          </div>

          <h1 className="text-5xl md:text-[100px] font-semibold font-sans text-brand-text mb-10 tracking-tight leading-[0.9]">
            Service <br/> Covenant
          </h1>
          
          <div className="flex items-center gap-6 mb-20">
            <p className="text-[10px] font-bold text-brand-text/30 uppercase tracking-[0.4em]">
              UK CONSUMER STANDARDS
            </p>
            <div className="h-[1px] w-12 bg-brand-text/5" />
            <p className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em]">
              JAN 2026
            </p>
          </div>

          <div className="space-y-20">
            
            <section className="space-y-6">
              <h2 className="text-[11px] font-bold font-sans text-brand-text/30 uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-brand-base flex items-center justify-center text-[10px] text-brand-text/40">01</span> 
                The Engine
              </h2>
              <p className="text-lg font-medium text-brand-text/60 leading-relaxed max-w-2xl">
                Kynar Muse is a digital establishment based in the United Kingdom. We curate high-fidelity assets designed for professional and creative synchronisation within a refined digital environment. During this preview phase, assets are displayed for registry evaluation purposes only.
              </p>
            </section>

            <section className="space-y-8 p-10 md:p-16 bg-brand-text rounded-[40px] shadow-tactile text-white/70">
              <h2 className="text-[11px] font-bold font-sans text-brand-accent uppercase tracking-[0.3em] flex items-center gap-4 mb-8">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.5} /> 02. Acquisition Policy
              </h2>
              <p className="font-medium text-xl leading-relaxed">
                Under the <span className="text-white font-semibold">Consumer Contracts Regulations 2013</span>, digital assets are exempt from the 14-day cancellation right once retrieval begins. By finalising a future acquisition, you waive this right in exchange for immediate access. <em>Note: All acquisition functions are currently disabled.</em>
              </p>
              <div className="mt-10 flex items-center gap-3 text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em]">
                <Zap size={14} /> UK Statutory laws apply to asset integrity.
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-[11px] font-bold font-sans text-brand-text/30 uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-brand-base flex items-center justify-center text-[10px] text-brand-text/40">03</span> 
                Licensing Protocol
              </h2>
              <p className="text-lg font-medium text-brand-text/60 leading-relaxed max-w-2xl">
                Registry presence grants a non-exclusive, personal licence for evaluation. Redistribution, replication, or commercial resale of intellectual property is strictly prohibited to maintain the integrity of the Muse Engine.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-[11px] font-bold font-sans text-brand-text/30 uppercase tracking-[0.3em] flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-brand-base flex items-center justify-center text-[10px] text-brand-text/40">04</span> 
                Liability Standards
              </h2>
              <p className="text-lg font-medium text-brand-text/60 leading-relaxed max-w-2xl">
                Assets are provided &ldquo;as is.&rdquo; To the maximum extent permitted by the laws of England and Wales, Kynar Muse is not liable for incidental disruptions following asset integration.
              </p>
            </section>

            <section className="pt-16 border-t border-brand-text/5 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-brand-base rounded-inner shadow-sm">
                  <Globe size={20} className="text-brand-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[9px] font-bold text-brand-text/20 uppercase tracking-[0.4em] mb-1">Jurisdiction</h3>
                  <p className="text-[11px] font-bold text-brand-text uppercase tracking-widest">ENGLAND & WALES</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-[9px] font-bold text-brand-text/20 uppercase tracking-[0.4em] mb-1">Statutory Body</h3>
                <p className="text-[11px] font-bold text-brand-text uppercase tracking-widest">Consumer Rights Act 2015</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
