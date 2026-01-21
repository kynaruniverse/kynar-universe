"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getCategoryTheme } from "../lib/theme";

export default function HomePage() {
  const categories = ["Tools", "Life", "Home"];

  return (
    <main
      id="main-content"
      className="min-h-screen bg-brand-base flex flex-col selection:bg-brand-accent/20 overflow-x-hidden"
    >
      {/* 1. INVITATION: Minimalist & Welcoming */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-3xl w-full text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-text leading-[1.1]">
              A space for digital essentials.
            </h1>
            <p className="text-xl md:text-2xl text-color-muted max-w-xl mx-auto font-body font-light leading-relaxed">
              Carefully curated tools for work, creative living, and continuous growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Link
              href="#rooms"
              className="inline-flex items-center justify-center px-10 py-5 bg-brand-text text-white rounded-btn text-sm font-bold uppercase tracking-[0.2em] hover:bg-brand-accent transition-all duration-base shadow-tactile group"
            >
              Explore the Store
              <ArrowRight
                className="ml-3 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY ROOMS: Full-width Sections */}
      <section id="rooms" className="w-full">
        {categories.map((cat, idx) => {
          const theme = getCategoryTheme(cat);
          return (
            <motion.section
              key={cat}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className={`w-full min-h-screen flex flex-col justify-center px-6 py-24 border-t ${theme.border} ${
                idx % 2 === 0 ? "bg-white" : "bg-brand-surface/30"
              }`}
            >
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <div className="space-y-8 order-2 lg:order-1">
                  <div className="space-y-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-[0.3em] ${theme.text}`}
                    >
                      {theme.sublabel}
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold text-brand-text tracking-tight">
                      {cat === "Tools" && "Productivity & Workflows"}
                      {cat === "Life" && "Design & Creative Tools"}
                      {cat === "Home" && "Learning & Lifestyle"}
                    </h2>
                  </div>

                  <p className="text-lg md:text-xl text-color-muted leading-relaxed max-w-lg">
                    {cat === "Tools" && "Practical resources built to streamline your daily projects. Simple, effective, and professional."}
                    {cat === "Life" && "Assets for the creative mind. Tools that help you design, craft, and build with intention."}
                    {cat === "Home" && "Personal systems for continuous learning. Guides and planners for a balanced digital life."}
                  </p>

                  <Link
                    href={`/marketplace?category=${cat}`}
                    className="inline-flex items-center gap-4 text-brand-text font-bold uppercase tracking-widest text-sm group"
                  >
                    Enter Room
                    <div
                      className={`p-4 rounded-full ${theme.bg} text-white group-hover:translate-x-2 transition-transform duration-base`}
                    >
                      <ArrowRight size={20} />
                    </div>
                  </Link>
                </div>

                {/* Visual Cards */}
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`aspect-[4/5] rounded-card ${theme.lightBg} border ${theme.border} overflow-hidden opacity-40 hover:opacity-100 transition-opacity duration-slow`}
                    />
                  ))}
                </div>
              </div>
            </motion.section>
          );
        })}
      </section>

      {/* 3. DISCOVERY SECTION */}
      <section className="w-full py-32 px-6 bg-brand-text text-white">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Tools you didn't know you needed.
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Our marketplace is not an algorithm. It is a curated collection of digital artifacts, selected for their utility and beauty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {[
              "The Essential Set",
              "Hidden Gems",
              "Masterclass Series",
            ].map((set) => (
              <div
                key={set}
                className="p-8 border border-white/10 rounded-card bg-white/5 hover:bg-white/10 transition-colors text-left space-y-4 group cursor-pointer"
              >
                <h3 className="text-xl font-bold">{set}</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  A curated selection of our most impactful resources, bundled for your journey.
                </p>
                <div className="pt-4 inline-flex items-center text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  View Collection <ArrowRight className="ml-2" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}