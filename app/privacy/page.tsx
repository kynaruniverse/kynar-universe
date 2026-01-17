"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Lock, Fingerprint, Database, UserCheck } from "lucide-react";

export default function PrivacyPage() {
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
          <div className="w-12 h-12 bg-tools-accent/10 rounded-2xl flex items-center justify-center mb-8 text-tools-accent">
            <Fingerprint size={24} />
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-sans text-primary-text mb-4 tracking-tighter uppercase leading-none">
            Privacy Policy
          </h1>
          <p className="text-[10px] font-black text-primary-text/30 uppercase tracking-[0.4em] mb-16">
            UK GDPR Compliant // Jan 2026
          </p>

          <div className="prose prose-lg text-primary-text/70 font-serif italic space-y-12 leading-relaxed">
            
            <section className="space-y-4">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-widest not-italic flex items-center gap-3">
                <span className="text-tools-accent/40 text-xs">01</span> Who We Are
              </h2>
              <p>Kynar Universe is an independent digital marketplace operated by a single creator based in the United Kingdom. For inquiries regarding your data, contact <strong className="text-primary-text not-italic">support@kynaruniverse.co.uk</strong>.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-widest not-italic flex items-center gap-3">
                <span className="text-tools-accent/40 text-xs">02</span> Data We Collect
              </h2>
              <p>We only collect data necessary to operate the platform and deliver digital products. This includes Identity Data (Email), Transaction Data (Manifest purchases), and Technical Data (IP/Browser information).</p>
              <div className="bg-white/30 p-4 rounded-2xl border border-white/40 not-prose flex items-center gap-3 text-xs font-bold text-primary-text/60 uppercase tracking-wider">
                <Lock size={14} className="text-tools-accent" /> We do not collect or store payment card details.
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-widest not-italic flex items-center gap-3">
                <span className="text-tools-accent/40 text-xs">03</span> How We Use Your Data
              </h2>
              <p>Your data is used solely to manage your Universe Presence, deliver assets securely, and provide Signal Notifications. We do not sell your data or use it for unrelated marketing.</p>
            </section>

            <section className="space-y-4 p-8 bg-tools-accent/5 rounded-[32px] border border-tools-accent/10 not-prose">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-widest flex items-center gap-3 mb-4">
                <Database className="text-tools-accent w-5 h-5" /> 05. Storage & Security
              </h2>
              <p className="text-primary-text/70 font-serif italic leading-relaxed">
                Data is stored securely using Supabase (PostgreSQL) with encryption at rest. Payments are handled by secure third-party providers such as Stripe. We take all reasonable measures to protect your personal data from loss or unauthorized access.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black font-sans text-primary-text uppercase tracking-widest not-italic flex items-center gap-3">
                <span className="text-tools-accent/40 text-xs">08</span> Your Rights
              </h2>
              <p>Under UK GDPR, you have the right to access, correct, or request deletion of your data (the &ldquo;Right to be Forgotten&rdquo;). To exercise these rights, please contact our support origin.</p>
            </section>

            <section className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between gap-6 not-prose">
              <div className="flex items-center gap-3">
                <UserCheck size={18} className="text-tools-accent opacity-50" />
                <div>
                  <h3 className="text-[10px] font-black text-primary-text/30 uppercase tracking-[0.3em] mb-1">Regulation</h3>
                  <p className="text-sm font-bold text-primary-text">Data Protection Act 2018</p>
                </div>
              </div>
              <div className="md:text-right">
                <h3 className="text-[10px] font-black text-primary-text/30 uppercase tracking-[0.3em] mb-1">Jurisdiction</h3>
                <p className="text-sm font-bold text-primary-text">United Kingdom (GDPR)</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
