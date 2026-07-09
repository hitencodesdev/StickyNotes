"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { GithubIcon, YoutubeIcon, LinkedinIcon, InstagramIcon, PinterestIcon } from "@/components/BrandIcons";
import { socialLinks } from "@/config/socialLinks";

export default function Footer() {
  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "Notes", id: "notes" },
    { label: "Gallery", id: "gallery" },
    { label: "Videos", id: "videos" },
    { label: "Resources", id: "resources" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const getSocialIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "github":
        return <GithubIcon className="h-4.5 w-4.5" />;
      case "youtube":
        return <YoutubeIcon className="h-4.5 w-4.5" />;
      case "linkedin":
        return <LinkedinIcon className="h-4.5 w-4.5" />;
      case "instagram":
        return <InstagramIcon className="h-4.5 w-4.5" />;
      case "pin":
        return <PinterestIcon className="h-4.5 w-4.5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900 py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow shadow-blue-500/20 text-white">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent font-extrabold">
              Exam Ready Notes
            </span>
          </a>
          <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
            Consolidating quality study notes, coding resources, templates, and revision materials for computer science students and engineers.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-bold text-white text-xs uppercase tracking-widest">
            Quick Directory
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {quickLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-sm text-slate-500 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social & Contact Column */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-bold text-white text-xs uppercase tracking-widest">
            Social Networks
          </h4>
          <div className="flex gap-2">
            {Object.entries(socialLinks).map(([key, link]) => (
              <a
                key={key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-850 transition-colors"
                title={link.name}
              >
                {getSocialIconComponent(link.icon)}
              </a>
            ))}
          </div>
          <p className="text-xs text-slate-600 pt-2 font-mono">
            Designed with React, Next.js, Tailwind v4, & Framer Motion.
          </p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
        <span>
          © {new Date().getFullYear()} Exam Ready Notes. All rights reserved.
        </span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
