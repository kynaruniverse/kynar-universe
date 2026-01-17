"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, Globe, Download } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-home-base pb-32 transition-colors duration-1000">
      <div className="max-w-4xl mx-auto px-6 pt-20">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-sm font-bold text-primary-text/40 hover:text-primary-text transition-colors mb-12 uppercase tracking-[0.3em]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Return to Origin
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/40 backdrop-blur-3xl p-8 md:p-16 rounded-[48px] border border-white/40 shadow-glass"
        >
          <div className="w-12 h-12 bg-home-accent/10 rounded-2xl flex items-center justify-center mb-8 text-home-accent">
            <Scale size={24} />
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-sans text-primary-text mb-4 tracking-tighter uppercase leading-none">
            Terms of Service
          </h1>
          <p className="text-[10px] font-black text-primary-text/30 uppercase tracking-[0.4em] mb-16">
            Last Updated: January 2026
          </p>

          <div className="prose prose-lg text-primary-text/70 font-serif italic space-y-12 leading-relaxed">
            
            <section className="space-y-4">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-widest not-italic flex items-center gap-3">
                <span className="text-home-accent/40 text-xs">01</span> About Kynar Universe
              </h2>
              <p>Kynar Universe is an independent digital marketplace operated by a single creator based in the United Kingdom. We provide digital-only products designed to support productivity, organisation, and creative or business workflows.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-widest not-italic flex items-center gap-3">
                <span className="text-home-accent/40 text-xs">02</span> Digital Products & Delivery
              </h2>
              <p>All products are digital assets (PDFs, templates, spreadsheets). No physical goods are sold or shipped. Delivery is considered complete once access via secure download or library is granted.</p>
            </section>

            <section className="space-y-4 bg-home-accent/5 p-8 rounded-[32px] border border-home-accent/10 not-prose">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-widest flex items-center gap-3 mb-4">
                <ShieldCheck className="text-home-accent w-5 h-5" /> 03. Refunds & Cancellation
              </h2>
              <p className="text-primary-text/70 font-serif italic leading-relaxed">
                Under the Consumer Contracts Regulations 2013, your 14-day cancellation right does not apply to digital content once delivery has begun. By completing a purchase, you expressly consent to immediate access and acknowledge the loss of this cancellation right. 
              </p>
              <p className="mt-4 text-xs font-bold text-primary-text/40 uppercase tracking-widest">
                Faulty content remains eligible for repair or replacement under UK law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-widest not-italic flex items-center gap-3">
                <span className="text-home-accent/40 text-xs">04</span> Licence for Use
              </h2>
              <p>We grant a limited, non-exclusive, non-transferable licence for personal or internal business use. Reselling, redistributing, or claiming ownership of the intellectual property is strictly prohibited.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-widest not-italic flex items-center gap-3">
                <span className="text-home-accent/40 text-xs">05</span> Acceptable Use
              </h2>
              <p>You agree not to misuse products or attempt to bypass security measures. We reserve the right to terminate access if licence violations are identified.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-widest not-italic flex items-center gap-3">
                <span className="text-home-accent/40 text-xs">06</span> Limitation of Liability
              </h2>
              <p>Products are provided &ldquo;as is.&rdquo; Kynar Universe shall not be liable for incidental or consequential losses, including loss of data or business interruption, to the fullest extent permitted by UK law.</p>
            </section>

            <section className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between gap-6 not-prose">
              <div>
                <h3 className="text-[10px] font-black text-primary-text/30 uppercase tracking-[0.3em] mb-2">Jurisdiction</h3>
                <p className="text-sm font-bold text-primary-text flex items-center gap-2">
                  <Globe size={14} className="text-home-accent" /> England & Wales
                </p>
              </div>
              <div className="md:text-right">
                <h3 className="text-[10px] font-black text-primary-text/30 uppercase tracking-[0.3em] mb-2">Governing Law</h3>
                <p className="text-sm font-bold text-primary-text">Consumer Rights Act 2015</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
