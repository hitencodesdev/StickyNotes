"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Bookmark, GraduationCap, ArrowRight } from "lucide-react";
import { YoutubeIcon, PinterestIcon } from "@/components/BrandIcons";
import { socialLinks } from "@/config/socialLinks";

export default function Hero() {
  const handleViewNotes = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("notes");
    if (element) {
      const yOffset = -80; // Offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[150px] pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/40 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-6 backdrop-blur-sm"
          >
            <GraduationCap className="h-3.5 w-3.5" />
            <span>EXCELLENCE IN LEARNING</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
          >
            Exam Ready{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
              Notes
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mb-10 leading-relaxed font-medium"
          >
            One place for quality notes, coding resources, interview preparation, and learning content.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            {/* View Notes */}
            <button
              onClick={handleViewNotes}
              className="flex items-center justify-center gap-2 h-13 w-full sm:w-auto px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Notes</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            {/* YouTube Link */}
            <a
              href={socialLinks.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-13 w-full sm:w-auto px-6 rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <YoutubeIcon className="h-5 w-5 text-red-650 fill-red-600" />
              <span>Watch on YouTube</span>
            </a>

            {/* Pinterest Link */}
            <a
              href={socialLinks.pinterest.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-13 w-full sm:w-auto px-6 rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <PinterestIcon className="h-5 w-5 text-red-500 fill-red-500" />
              <span>Visit Pinterest</span>
            </a>
          </motion.div>
        </div>

        {/* Right column: Glassmorphic Cards Showcase */}
        <div className="lg:col-span-5 relative flex items-center justify-center mt-10 lg:mt-0">
          <div className="relative w-[320px] sm:w-[380px] h-[380px]">
            {/* Card 1: Notes Quick View (Floats top right) */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-2 right-2 w-64 p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-xl border border-white/20 dark:border-slate-800/50 z-20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Computer Networks</h3>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase">PDF Guides</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Detailed notes covering OSI layers, TCP/UDP protocols, routing, and network security.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                <span>Updated 2 days ago</span>
                <span className="text-blue-500 dark:text-blue-400 font-semibold cursor-pointer">Download PDF</span>
              </div>
            </motion.div>

            {/* Card 2: Interview Checklist (Floats bottom left) */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute bottom-2 left-2 w-64 p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-xl border border-white/20 dark:border-slate-800/50 z-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">React 19 Hooks</h3>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold uppercase">Web Dev</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                Comprehensive sheets on standard and new hooks like `useActionState` and `useOptimistic`.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                <span>12 tags included</span>
                <span className="text-purple-500 dark:text-purple-400 font-semibold cursor-pointer">Read Notes</span>
              </div>
            </motion.div>

            {/* Decorative background glows behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-[80px] opacity-20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
