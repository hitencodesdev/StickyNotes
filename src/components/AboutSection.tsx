"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, CheckCircle2, Bookmark } from "lucide-react";

export default function AboutSection() {
  const learningGoals = [
    "Provide clear, high-quality, and downloadable handwritten PDF notes.",
    "Compile industry-standard coding and practice sheets to ace technical screenings.",
    "Organize system architecture infographics and flowcharts to aid visual learners.",
    "Offer curations of YouTube tutorials and cheat sheets in one distraction-free page.",
  ];

  return (
    <section id="about" className="relative py-24 bg-slate-50 dark:bg-slate-900/50">
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
            OUR PURPOSE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            About Exam Ready Notes
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
            Exam Ready Notes is an educational web repository designed to streamline study revisions, gather interview preparation write-ups, and consolidate programming practice links in one single place.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Intro & Goals */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Empowering Your Learning Journey
              </h3>
              <p className="text-slate-650 dark:text-slate-300 leading-relaxed">
                Revising for computer science exams or standard software developer interviews can be overwhelming. Scattered files, bookmarks, and links distract from active learning. We construct clean notes and categorize important practice URLs to save your precious hours.
              </p>
            </div>

            {/* Learning Goals List */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Key Learning Goals
              </h4>
              <ul className="space-y-3.5">
                {learningGoals.map((goal, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-350 text-sm sm:text-base leading-snug">
                      {goal}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Mission & Vision Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {/* Mission Card */}
            <motion.div
              whileHover={{ scale: 1.02, translateY: -2 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 shadow-md hover:shadow-lg transition-all backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-md shadow-blue-500/20">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Mission</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                To simplify preparation for collegiate exams and software engineering interviews by providing structured, accessible, and high-quality study materials completely free of cost.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              whileHover={{ scale: 1.02, translateY: -2 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 shadow-md hover:shadow-lg transition-all backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500 text-white shadow-md shadow-purple-500/20">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Vision</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                To evolve into a collaborative, community-driven study network where engineers and students worldwide share notes, discuss complex concepts, and build their success together.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
