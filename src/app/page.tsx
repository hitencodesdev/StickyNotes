"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ParticlesBackground from "@/components/ParticlesBackground";
import NotesSection from "@/components/NotesSection";
import GallerySection from "@/components/GallerySection";
import VideosSection from "@/components/VideosSection";
import ResourcesSection from "@/components/ResourcesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SplashLoader from "@/components/SplashLoader";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <SplashLoader onComplete={() => setLoading(false)} />
      ) : (
        <div className="relative flex flex-col min-h-screen">
          {/* Animated Interactive Background Canvas */}
          <ParticlesBackground />

          {/* Sticky frosted Navbar */}
          <Navbar />

          {/* Layout Main Stream */}
          <main className="flex-1 w-full relative z-10">
            {/* Hero Section */}
            <Hero />

            {/* Notes Section with dynamic PDF add form */}
            <NotesSection />

            {/* Gallery with Lightbox and Base64 upload support */}
            <GallerySection />

            {/* Videos player and YouTube Embedder */}
            <VideosSection />

            {/* Resources link aggregator */}
            <ResourcesSection />

            {/* About content (Vision, Mission, Learning goals) */}
            <AboutSection />

            {/* Contact Form, email, social links, and SVG Map */}
            <ContactSection />
          </main>

          {/* Footer content */}
          <Footer />

          {/* Back to top button triggers above 400px scroll */}
          <BackToTop />
        </div>
      )}
    </>
  );
}
