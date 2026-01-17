"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, Globe, FileText, Zap } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-home-base pb-32 transition-colors duration-1000 ease-in-out">
      <div className="max-w-4xl mx-auto px-6 pt-24">
        
        {/* Navigation back to origin */}
        <Link href="/" className="group inline-flex items-center text-[10px] font-black text-primary-text/40 hover:text-primary-text transition-all mb-12 uppercase tracking-[0.4em]">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Origin
        </Link>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="bg-white/40 backdrop-blur-3xl p-10 md:p-20 rounded-[64px] border border-white/60 shadow-glass relative overflow-hidden"
        >
          {/* Subtle Branding Watermark */}
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
            <Scale size={200} />
          </div>

          <div className="w-16 h-16 bg-home-accent/10 rounded-3xl flex items-center justify-center mb-10 text-home-accent border border-home-accent/20">
            <FileText size={32} />
          </div>

          <h1 className="text-5xl md:text-8xl font-black font-sans text-primary-text mb-6 tracking-tighter uppercase leading-[0.85]">
            Service <br/> Protocol
          </h1>
          
          <div className="flex items-center gap-4 mb-20">
            <p className="text-[10px] font-black text-primary-text/30 uppercase tracking-[0.5em]">
              UK Consumer Standard
            </p>
            <div className="h-[1px] w-12 bg-black/5" />
            <p className="text-[10px] font-black text-home-accent uppercase tracking-[0.5em]">
              JAN 2026
            </p>
          </div>

          <div className="prose prose-lg text-primary-text/60 font-serif italic space-y-16 leading-relaxed">
            
            <section className="space-y-6">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-[0.2em] not-italic flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-[10px] text-primary-text/40">01</span> 
                The Marketplace
              </h2>
              <p>Kynar Universe is an independent digital entity based in the United Kingdom. We provide high-fidelity digital assets designed for professional and creative synchronisation.</p>
            </section>

            <section className="space-y-8 p-10 md:p-16 bg-primary-text rounded-[48px] not-prose shadow-2xl">
              <h2 className="text-xl font-black font-sans text-white uppercase tracking-[0.3em] flex items-center gap-4 mb-6">
                <ShieldCheck className="text-home-accent w-6 h-6" /> 02. Cancellation
              </h2>
              <p className="text-white/60 font-serif italic text-lg leading-relaxed">
                Under the <span className="text-white not-italic font-bold">Consumer Contracts Regulations 2013</span>, digital content is exempt from the 14-day cancellation right once the transmission begins. By acquiring an asset, you acknowledge immediate delivery and waive this right.
              </p>
              <div className="mt-8 flex items-center gap-3 text-[9px] font-black text-home-accent uppercase tracking-widest">
                <Zap size={14} /> UK Law applies to faulty digital content.
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-[0.2em] not-italic flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-[10px] text-primary-text/40">03</span> 
                Usage Licence
              </h2>
              <p>Acquisition grants a non-exclusive, non-transferable licence for personal use. Redistribution, replication, or commercial resale of the intellectual property is strictly prohibited within this Universe.</p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-[0.2em] not-italic flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-[10px] text-primary-text/40">04</span> 
                Liability
              </h2>
              <p>Assets are provided &ldquo;as is.&rdquo; To the maximum extent permitted by the laws of England and Wales, Kynar Universe is not liable for incidental data loss or business disruption following asset integration.</p>
            </section>

            <section className="pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-10 not-prose">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/60 rounded-2xl border border-black/5">
                  <Globe size={20} className="text-home-accent" />
                </div>
                <div>
                  <h3 className="text-[9px] font-black text-primary-text/20 uppercase tracking-[0.4em] mb-1">Jurisdiction</h3>
                  <p className="text-sm font-black text-primary-text uppercase tracking-tighter">England & Wales</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <h3 className="text-[9px] font-black text-primary-text/20 uppercase tracking-[0.4em] mb-1">Statutory Body</h3>
                <p className="text-sm font-black text-primary-text uppercase tracking-tighter">Consumer Rights Act 2015</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
